<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Intervention\Image\ImageManager;
use App\Models\Ticket;
use App\Models\PhysicalTicket;
use App\Models\Promoter;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cookie;
use App\Mail\TicketMail;
use App\Mail\PromoterAlertMail;

class TicketController extends Controller
{
    public function index()
    {
        $now = time();

        $finalDate = strtotime('29-11-2025 23:59');
        $remainingTime = $finalDate - $now;

        return view('buy-ticket', ['remainingTime' => $remainingTime]);
    }

    public function processPayment(Request $request)
    {
        $ticket_type = $request->input('ticketType');
        $code = $request->input('code');

        $promoter = null;
        if ($code !== null) {
            $promoter = Promoter::where('code', $code)->first();

            // If promoter not found
            if (!$promoter) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid promo code.'
                ]);
            }
        }

        // PRICING
        if ($ticket_type == 'standard') {
            $price = 20000;
        } else {
            $price = 70000;
        }

        // Apply 10% discount if code exists
        if ($promoter) {
            if ($code == 'osam') {
                $price = $price * 0.97;
            } else {
                $price = $price * 1;
            }
        }

        // Mobile money providers
        $MOBILE_PROVIDER = [
            "AIRTEL" => [
                "id" => "20be6c20-adeb-4b5b-a7ba-0769820df4fb",
                "country" => "MWI",
                "currency" => "MWK",
            ],
            "TNM" => [
                "id" => "27494cb5-ba9e-437f-a114-4e7a7686bcca",
                "country" => "MWI",
                "currency" => "MWK",
            ],
        ];

        $providerKey = strtoupper($request->input('paymentMethod'));
        if (!isset($MOBILE_PROVIDER[$providerKey])) {
            return response()->json([
                'error' => 'Invalid provider',
            ], 400);
        }
        $provider = $MOBILE_PROVIDER[$providerKey];

        // // Generate unique IDs
        $depositId = $this->getUnique();
        $preAuthorisationCode = strtoupper(uniqid());

        $depositPayload = [
            "mobile_money_operator_ref_id" => $provider['id'],
            "mobile" => $request->input('mobile'),
            "amount" => $price,
            "charge_id" => $depositId,
            "email" => $request->input('email')
        ];

        $apiUrl = 'https://api.paychangu.com/mobile-money/payments/initialize';
        $token = env('PAYMENT_TOKEN');

        $jsonData = json_encode($depositPayload);
        $curl = curl_init($apiUrl);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, [
            'Authorization: ' . $token,
            'accept: application/json',
            'content-type: application/json',
        ]);

        $response = curl_exec($curl);
        if (curl_errno($curl)) {
            $error = 'cURL error: ' . curl_error($curl);
        } else {
            $error = null;
        }
        curl_close($curl);

        $responseArr = json_decode($response, true);

        return response()->json([
            'error' => $error,
            'response' => $responseArr,
        ]);
    }

    // Helper for RFC-4122 compliant UUID
    private function getUnique()
    {
        $data = PHP_MAJOR_VERSION < 7 ? openssl_random_pseudo_bytes(16) : random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);    // Set version to 0100
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);    // Set bits 6-7 to 10
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    public function verifyPayment(Request $request)
    {
        $apiUrl = 'https://api.paychangu.com/mobile-money/payments/' . $request->input('charge_id') . '/verify';
        $token = env('PAYMENT_TOKEN');

        $curl = curl_init($apiUrl);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, [
            'Authorization: ' . $token,
            'accept: application/json',
        ]);

        $response = curl_exec($curl);
        if (curl_errno($curl)) {
            $error = 'cURL error: ' . curl_error($curl);
        } else {
            $error = null;
        }
        curl_close($curl);

        $responseArr = json_decode($response, true);

        $nominee = null; // Initialize $nominee to avoid undefined variable error

        if ($responseArr['data']['status'] == 'success') {
            if ($request->input('code') != null) {
                $promoter = Promoter::where('code', $request->input('code'))->first();
                $promoterRevenue = $request->input('ticketType') == 'standard' ? 2000 : 7000;
                $promoter->amount += $promoterRevenue;
                $promoter->save();

                Mail::to($promoter->email)->send(new PromoterAlertMail($promoter->name, $promoter->amount, $request->input('ticketType')));
            }


            // Call generateTicket and capture the result
            $ticketData = $this->generateTicket($request);

            // Set a cookie with the ticket link
            Cookie::queue('image', $ticketData['ticket_link'], 1440); // Cookie expires in 1 day

            return response()->json([
                'response' => $responseArr,
                'ticket' => $ticketData,
                'refresh' => true // Indicate that the page should be refreshed
            ]);
        }

        return response()->json([
            'response' => $responseArr
        ]);
    }

    public function generateTicket(Request $request)
    {
        $name = $request->input('name');
        $mobile = $request->input('mobile');
        $ticket_type = $request->input('ticketType');

        $uniqueId = uniqid();

        // Generate QR code with Endroid
        $qr = QrCode::create($uniqueId)->setSize(400);
        $writer = new PngWriter();
        $qrResult = $writer->write($qr);
        $qrPath = public_path('qrcodes/qr_' . $uniqueId . '.png');

        if (!file_exists(public_path('qrcodes'))) {
            mkdir(public_path('qrcodes'), 0755, true);
        }

        $qrResult->saveToFile($qrPath);

        // Create ticket image
        if ($ticket_type == 'vip') {
            $image = ImageManager::gd()->read(public_path('frontend/assets/img/vip-ticket.png'));
        } else {
            $image = ImageManager::gd()->read(public_path('frontend/assets/img/standard-ticket.png'));
        }

        // Insert QR code onto ticket (x=50, y=50 as example)
        $image->place(
            $qrPath,
            'center', // position
            0,       // x offset
            -75,       // y offset
            100       // opacity (0-100)
        );

        // Add name and mobile number text
        $image->text($name, 295, 1027, function ($font) {
            $font->file(public_path('frontend/fonts/Gothic.ttf'));
            $font->size(35);
            $font->color('#fff');
            $font->align('left');
            $font->valign('center');
        });

        $image->text($uniqueId, 295, 1073, function ($font) {
            $font->file(public_path('frontend/fonts/Gothic.ttf'));
            $font->size(35);
            $font->color('#fff');
            $font->align('lefft');
            $font->valign('center');
        });

        $image->text($mobile, 295, 1123, function ($font) {
            $font->file(public_path('frontend/fonts/Gothic.ttf'));
            $font->size(35);
            $font->color('#fff');
            $font->align('left');
            $font->valign('center');
        });

        // Save the final ticket
        if (!file_exists(public_path('frontend/tickets'))) {
            mkdir(public_path('frontend/tickets'), 0755, true);
        }

        if ($ticket_type == 'vip') {
            $image->save(public_path('frontend/tickets/vip_ticket_' . $uniqueId . '.png'));
        } else {
            $image->save(public_path('frontend/tickets/standard_ticket_' . $uniqueId . '.png'));
        }

        // Save ticket info to database
        $ticket = new Ticket();
        $ticket->name = $name;
        $ticket->mobile = $mobile;
        $ticket->ticket_type = $ticket_type;
        $ticket->unique_id = $uniqueId;
        $ticket->image = ($ticket_type == 'vip') ? 'vip_ticket_' . $uniqueId . '.png' : 'standard_ticket_' . $uniqueId . '.png';
        $ticket->approve = 0; // Default to not approved
        $ticket->save();

        $ticket_name = ($ticket_type == 'vip') ? 'vip_ticket_' . $uniqueId . '.png' : 'standard_ticket_' . $uniqueId . '.png';
        $ticketLink = url('frontend/tickets/' . $ticket_name);

        // Optionally, delete the QR code file after embedding it into the ticket
        if (file_exists($qrPath)) {
            unlink($qrPath);
        }

        if ($request->input('email') != "") {
            Mail::to($request->input('email'))->send(new TicketMail($name, $ticketLink));
        }

        return [
            'name' => $name,
            'mobile' => $mobile,
            'ticket_type' => $ticket_type,
            'unique_id' => $uniqueId,
            'ticket_link' => $ticketLink
        ];
    }

    public function generateTicketAdmin(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:100',
            'mobile' => 'required|string|max:20',
            'ticket_type' => 'required'
        ]);
        $name = $validate['name'];
        $mobile = $validate['mobile'];
        $ticket_type = $validate['ticket_type'];

        $uniqueId = uniqid();

        // Generate QR code with Endroid
        $qr = QrCode::create($uniqueId)->setSize(400);
        $writer = new PngWriter();
        $qrResult = $writer->write($qr);
        $qrPath = public_path('frontend/qrcodes/qr_' . $uniqueId . '.png');

        if (!file_exists(public_path('frontend/qrcodes'))) {
            mkdir(public_path('frontend/qrcodes'), 0755, true);
        }

        $qrResult->saveToFile($qrPath);

        // Create ticket image
        if ($ticket_type == 'vip') {
            $image = ImageManager::gd()->read(public_path('frontend/assets/img/vip-ticket.png'));
        } else if($ticket_type == 'standard'){
            $image = ImageManager::gd()->read(public_path('frontend/assets/img/standard-ticket.png'));
        } else if($ticket_type == 'standard-complimentary'){
            $image = ImageManager::gd()->read(public_path('frontend/assets/img/standard-complimentary-ticket.png'));
        } else {
            $image = ImageManager::gd()->read(public_path('frontend/assets/img/vip-complimentary-ticket.png'));
        }

        // Insert QR code onto ticket (x=50, y=50 as example)
        $image->place(
            $qrPath,
            'center', // position
            0,       // x offset
            -75,       // y offset
            100       // opacity (0-100)
        );

        // Add name and mobile number text
        $image->text($name, 295, 1027, function ($font) {
            $font->file(public_path('frontend/fonts/Gothic.ttf'));
            $font->size(35);
            $font->color('#fff');
            $font->align('left');
            $font->valign('center');
        });

        $image->text($uniqueId, 295, 1073, function ($font) {
            $font->file(public_path('frontend/fonts/Gothic.ttf'));
            $font->size(35);
            $font->color('#fff');
            $font->align('lefft');
            $font->valign('center');
        });

        $image->text($mobile, 295, 1123, function ($font) {
            $font->file(public_path('frontend/fonts/Gothic.ttf'));
            $font->size(35);
            $font->color('#fff');
            $font->align('left');
            $font->valign('center');
        });

        // Save the final ticket
        if (!file_exists(public_path('frontend/tickets'))) {
            mkdir(public_path('frontend/tickets'), 0755, true);
        }

        if ($ticket_type == 'vip') {
            $image->save(public_path('frontend/tickets/vip_ticket_' . $uniqueId . '.png'));
        } else if($ticket_type =='standard'){
            $image->save(public_path('frontend/tickets/standard_ticket_' . $uniqueId . '.png'));
        } else if($ticket_type =='standard-complimentary'){
            $image->save(public_path('frontend/tickets/standard_complimentary_ticket_' . $uniqueId . '.png'));
        } else{
            $image->save(public_path('frontend/tickets/vip_complimentary_ticket_' . $uniqueId . '.png'));
        }

        // Save ticket info to database
        $ticket = new Ticket();
        $ticket->name = $name;
        $ticket->mobile = $mobile;
        $ticket->ticket_type = $ticket_type;
        $ticket->unique_id = $uniqueId;
        
        if ($ticket_type == 'vip') {
             $ticket->image='vip_ticket_' . $uniqueId . '.png';
        } else if($ticket_type =='standard'){
             $ticket->image='standard_ticket_' . $uniqueId . '.png';
        } else if($ticket_type =='standard-complimentary'){
             $ticket->image='standard_complimentary_ticket_' . $uniqueId . '.png';
        } else{
             $ticket->image='vip_complimentary_ticket_' . $uniqueId . '.png';
        }

        $ticket->approve = 0; // Default to not approved
        $query = $ticket->save();

        if ($query) {
            // Optionally, delete the QR code file after embedding it into the ticket
            if (file_exists($qrPath)) {
                unlink($qrPath);
            }

            return redirect()->route('admin.show.generate-ticket')->with('success', 'Ticket was successfully generated');
        }
    }

    public function tickets()
    {
        $tickets = Ticket::latest('id')->get();
        return view('admin.tickets', ['tickets' => $tickets]);
    }

    public function rootsTickets()
    {
        $tickets = Ticket::latest('id')->get();
        $standardTickets = count(Ticket::where('ticket_type', 'standard')->get());
        $vipTickets = count(Ticket::where('ticket_type', 'vip')->get());
        return view('admin.roots', ['tickets' => $tickets, 'standardTickets' => $standardTickets, 'vipTickets' => $vipTickets]);
    }

    public function approvedTickets()
    {
        $onlineTickets = Ticket::where('approve', 1)->latest('id')->get();
        $physicalTickets = PhysicalTicket::where('approve', 1)->latest('id')->get();
        $tickets = $onlineTickets->merge($physicalTickets)->sortByDesc('updated_at');
        return view('admin.approved-tickets', ['tickets' => $tickets]);
    }

    public function dashboard()
    {
        return view('admin.ticket-dashboard');
    }

    public function getTicketData()
    {
        $standardOnlineTickets = count(Ticket::where('ticket_type', 'standard')->get());
        $vipOnlineTickets = count(Ticket::where('ticket_type', 'vip')->get());
        $standardOnlineApproved = count(Ticket::where('ticket_type', 'standard')->where('approve', 1)->get());
        $vipOnlineApproved = count(Ticket::where('ticket_type', 'vip')->where('approve', 1)->get());
        $standardPhysicalTickets = count(PhysicalTicket::where('ticket_type', 'standard')->get());
        $vipPhysicalTickets = count(PhysicalTicket::where('ticket_type', 'vip')->get());
        $standardPhysicalApproved = count(PhysicalTicket::where('ticket_type', 'standard')->where('approve', 1)->get());
        $vipPhysicalApproved = count(PhysicalTicket::where('ticket_type', 'vip')->where('approve', 1)->get());
        $standardComplimentary = count(PhysicalTicket::where('ticket_type', 'standard-complimentary')->get());
        $vipComplimentary = count(PhysicalTicket::where('ticket_type', 'vip-complimentary')->get());
        $standardCompApproved = count(PhysicalTicket::where('ticket_type', 'standard-complimentary')->where('approve', 1)->get());
        $vipCompApproved = count(PhysicalTicket::where('ticket_type', 'vip-complimentary')->where('approve', 1)->get());

        return response()->json([
            'standardOnlineTickets' => $standardOnlineTickets,
            'vipOnlineTickets' => $vipOnlineTickets,
            'standardOnlineApproved' => $standardOnlineApproved,
            'vipOnlineApproved' => $vipOnlineApproved,
            'standardPhysicalTickets' => $standardPhysicalTickets,
            'vipPhysicalTickets' => $vipPhysicalTickets,
            'standardPhysicalApproved' => $standardPhysicalApproved,
            'vipPhysicalApproved' => $vipPhysicalApproved,
            'standardComplimentary' => $standardComplimentary,
            'vipComplimentary' => $vipComplimentary,
            'standardCompApproved' => $standardCompApproved,
            'vipCompApproved' => $vipCompApproved
        ]);
    }

    public function showScanTicket()
    {
        return view('admin.scan-tickets');
    }

    public function checkQrCode($ticketId, $ticketType)
    {
        if ($ticketType == 'physical') {
            $ticket = PhysicalTicket::where('unique_id', $ticketId)->first();
        } else {
            $ticket = Ticket::where('unique_id', $ticketId)->first();
        }

        if (!$ticket) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid Ticket. Please try again.'
            ]);
        }

        if ($ticket->approve == 1) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ticket has already been used.'
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Ticket is valid',
            'data' => $ticket,
            'category' => $ticketType
        ]);
    }

    public function promoters() {}

    public function approveTicket(Request $request)
    {
        if ($request->input('category') === 'physical') {
            $ticket = PhysicalTicket::where('unique_id', $request->input('ticket_id'))->first();
        } else {
            $ticket = Ticket::where('unique_id', $request->input('ticket_id'))->first();
        }

        if (!$ticket) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ticket not found.'
            ]);
        }

        $ticket->approve = 1;
        $ticket->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Ticket approved successfully.'
        ]);
    }

    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);
        $imagePath = public_path('frontend/tickets/' . $ticket->image);
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }
        $ticket->delete();
        return redirect()->route('admin.tickets')->with('success', 'Ticket deleted successfully.');
    }
}
