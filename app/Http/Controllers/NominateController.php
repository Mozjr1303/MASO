<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\NominateMobiles;
use App\Models\Nominee;

class NominateController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        $now = time();

        $finalDate = strtotime('25-10-2025 23:59');
        $remainingTime = $finalDate - $now;

        if ($remainingTime <= 0) {
            $remainingTime = 0;
            return redirect('/home');
        } else {
            return view('nominate', ['categories' => $categories, 'remainingTime' => $remainingTime]);
        }
    }

    public function nominees()
    {
        $categories = Category::orderBy('id', 'ASC')->get();
        return view('admin.nominations', ['categories' => $categories]);
    }

    public function fetchNominees(Request $request)
    {
        $categoryId = $request->input('category');

        // Fetch nominees for the selected category, join with categories table, and count votes
        $nominees = Nominee::where('category_id', $categoryId)
            ->join('categories', 'nominees.category_id', '=', 'categories.id')
            ->select('nominees.*', 'categories.category')
            ->orderBy('count', 'desc')
            ->get();

        // Return the data as JSON
        return response()->json($nominees);
    }

    public function autoComplete($categoryId)
    {
        // Fetch all names from the nominate table where category = $field
        $names = Nominee::where('category_id', $categoryId)
            ->orderBy('id', 'desc')
            ->pluck('name')   // get only the "name" column
            ->toArray();

        // Convert to string with quotes like in your PHP function
        $array_cont = '"' . implode('","', $names) . '"';

        return $array_cont;
    }


    public function category($id, $title)
    {
        $category = Category::find($id);

        $now = time();

        $finalDate = strtotime('25-10-2025 23:59');
        $remainingTime = $finalDate - $now;

        $cate = $this->autoComplete($id);
        if ($remainingTime <= 0) {
            $remainingTime = 0;
            return redirect('/home');
        } else {
            return view('nominate-category', [
                'category' => $category,
                'remainingTime' => $remainingTime,
                'cate' => $cate
            ]);
        }
    }

    public function verifyMobile($id, $mobile)
    {
        $check = NominateMobiles::where('mobile', $mobile)->where($id, 1)->exists();
        if ($check) {
            return response()->json([
                'status' => 'error',
                'message' => "Sorry, you have already nominated in this category.",
                'result' => $check
            ]);
        } else {
            return response()->json([
                'status' => 'success',
                'message' => "Mobile number $mobile verified for category ID $id.",
                'result' => $check
            ]);
        }
    }

    public function processDeposit(Request $request)
    {
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

        $providerKey = strtoupper($request->input('payment_method'));
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
            "mobile" => $request->input('payment_number'),
            "amount" => $request->input('price'),
            "charge_id" => $depositId,
            "email" => ""
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

    public function checkStatus($categoryId, $mobile, $name, $chargeId)
    {
        $name = urldecode($name);
        $apiUrl = 'https://api.paychangu.com/mobile-money/payments/' . $chargeId . '/verify';
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

        if ($responseArr['data']['status'] == 'success') {
            //check if name is available in Nominee table for that category
            //if not add it with count 0
            //if yes increment count by 1
            $nominee = Nominee::firstOrCreate(
                ['name' => $name, 'category_id' => $categoryId],
                ['count' => 0]
            );
            $nominee->increment('count');


            //update nominate_mobiles table to set that category to 1 for that mobile
            $nominateMobile = NominateMobiles::firstOrNew(['mobile' => $mobile]);

            // Only update if the category is not already set to 1
            if ($nominateMobile->$categoryId != 1) {
                $nominateMobile->$categoryId = 1;
                $nominateMobile->save();
            }
        }

        return response()->json([
            'error' => $error,
            'response' => $responseArr
        ]);
    }
}
