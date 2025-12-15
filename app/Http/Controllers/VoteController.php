<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vote;
use App\Models\Category;
use App\Models\VoteMobile;
use App\Models\VoterIdentifier;
use App\Models\NomineeTransaction;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;


class VoteController extends Controller
{
    public function index()
    {
        $categories = Category::orderBy('id', 'ASC')->get();

        $now = time();

        $finalDate = strtotime('29-11-2025 23:59');
        $remainingTime = $finalDate - $now;

        if ($remainingTime <= 0) {
            $remainingTime = 0;
            return redirect('/home');
        } else {
            return view('vote', ['categories' => $categories, 'remainingTime' => $remainingTime]);
        }
    }

    public function category($id, $title)
    {
        $category = Category::find($id);
        $nominees = Vote::where('category_id', $id)
            ->orderBy('name', 'ASC')
            ->get();
        $now = time();

        $finalDate = strtotime('29-11-2025 23:59');
        $remainingTime = $finalDate - $now;

        if ($remainingTime <= 0) {
            $remainingTime = 0;
            return redirect('/home');
        } else {
            return view('vote-category', [
                'nominees' => $nominees,
                'category' => $category,
                'remainingTime' => $remainingTime,
            ]);
        }
    }

    public function getVoteData()
    {
        $categories = Category::all();

        $data = $categories->map(function ($category) {
            return [
                'directory'=>url('frontend/assets/nominees/'.$category->hiphen),
                'category' => $category->category,
                'totalVotes' =>Vote::where('category_id', $category->id)->sum('votes'),
                'nominees' => Vote::where('category_id', $category->id)
                    ->select('id', 'name', 'image', 'votes')
                    ->orderBy('votes', 'DESC')
                    ->get()
            ];
        });

        return response()->json($data);
    }

    public function verifyMobile($id, $mobile)
    {
        $category_id = Vote::find($id)->category_id;
        $check = VoteMobile::where('mobile', $mobile)->where($category_id, 1)->exists();
        if ($check) {
            return response()->json([
                'status' => 'error',
                'message' => "Sorry, you have already voted in this category.",
                'result' => $check
            ]);
        } else {
            return response()->json([
                'status' => 'success',
                'message' => "Mobile number $mobile verified for category ID $category_id.",
                'result' => $check
            ]);
        }
    }

    public function verifyFingerPrint(Request $request)
    {
        // get IP (use proxy-safe method if behind Cloudflare etc.)
        $ip = $request->ip();
        $fingerprint = $request->input('fingerprint');
        $categoryId = Vote::find($request->input('nominee'))->category_id;

        // count how many unique fingerprints come from this IP
        $uniqueCount = VoterIdentifier::where('ip_address', $ip)->where($categoryId, 1)
            ->distinct('fingerprint')
            ->count('fingerprint');

        // simple threshold (customize as needed)
        $threshold = 3;

        if ($uniqueCount >= $threshold) {
            return response()->json([
                'status' => 'exists',
                'message' => "Multiple fingerprints ($uniqueCount) detected from this IP",
            ], 200);
        } else {
            $existing = VoterIdentifier::where('fingerprint', $fingerprint)
                ->where($categoryId, 1)
                ->first();
            if (!$existing) {
                //update voter_identifier table to set that category to 1 for that fingerprint
                $voterIdentity = VoterIdentifier::firstOrNew(['fingerprint' => $fingerprint, 'ip_address' => $ip]);

                // Only update if the category is not already set to 1
                if ($voterIdentity->$categoryId != 1) {
                    $voterIdentity->$categoryId = 1;
                    $voterIdentity->save();
                }

                // Increment vote count for the nominee
                $nominee = Vote::find($request->input('nominee'));
                $nominee->increment('votes');

                return response()->json([
                    'status' => 'verified',
                    'message' => "Fingerprint verified",
                    'name' => $nominee ? $nominee->name : null
                ], 200);
            } else {
                return response()->json([
                    'status' => 'exists',
                    'message' => "Fingerprint already exists",
                ], 200);
            }
        }
    }

    public function processPayment(Request $request)
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

    public function checkStatus(Request $request)
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
            $mobile = $request->input('payment_number');
            $categoryId = Vote::find($request->input('nominee'))->category_id;

            // Increment vote count for the nominee
            $nominee = Vote::find($request->input('nominee'));
            $nominee->increment('votes');

            // Record the vote transaction
            $nomineeTransaction = NomineeTransaction::firstOrCreate(['nominee_id' => $nominee->id],);
            $nomineeTransaction->increment('votes_count');
            $nomineeTransaction->save();

            // Update nominate_mobiles table to set that category to 1 for that mobile
            $voteMobile = VoteMobile::firstOrNew(['mobile' => $mobile]);

            // Only update if the category is not already set to 1
            if ($voteMobile->$categoryId != 1) {
                $voteMobile->$categoryId = 1;
                $voteMobile->save();
            }
        }

        return response()->json([
            'error' => $error,
            'response' => $responseArr,
            'name' => $nominee ? $nominee->name : null // Handle case where $nominee is null
        ]);
    }

    public function checkBalancePage(Request $request)
    {
        $now = time();

        $finalDate = strtotime('29-11-2025 23:59');
        $remainingTime = $finalDate - $now;

        if ($remainingTime <= 0) {
            $remainingTime = 0;
        }

        return view('check-balance', ['remainingTime' => $remainingTime]);
    }

    public function checkBalance(Request $request)
    {
        $id = substr($request->input('id'), 5);

        $nominee = Vote::where('votes.id', $id)
            ->join('nominee_transactions', 'votes.id', '=', 'nominee_transactions.nominee_id')
            ->select('votes.*', 'nominee_transactions.votes_count')
            ->first();

        if ($nominee) {
            $balance = $nominee->votes_count * 100 * 0.97 * 0.5;

            return response()->json([
                'status' => 'success',
                'balance' => $balance,
                'name' => $nominee->name,
                'message' => 'Balance retrieved successfully.'
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'No matching nominee found with the provided name and ID.',
                'id' => $id,
            ]);
        }
    }

    public function votes()
    {
        $votes = Vote::orderBy('id', 'DESC')->get();
        return view('admin.votes', ['votes' => $votes]);
    }

    public function nominees()
    {
        $categories = Category::orderBy('id', 'ASC')->get();
        return view('admin.nominees', ['categories' => $categories]);
    }

    public function create()
    {
        $categories = Category::orderBy('id', 'ASC')->get();
        return view('admin.add-nominee', ['categories' => $categories]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = time() . '.' . $file->getClientOriginalExtension();

            //Get category directory
            $directory = Category::find($request->input('category_id'))->hiphen;
            $path = public_path('frontend/assets/nominees/' . $directory);

            if (!file_exists($path)) {
                mkdir($path, 0755, true);
            }

            // Create ImageManager instance with GD driver
            $manager = new ImageManager(new Driver());

            //Read and process image
            $image = $manager->read($file->getPathname());

            // Resize to max width of 800px (keeping aspect ratio)
            $image->scale(width: 800);

            //Save compressed image (60% quality)
            $savePath = $path . '/' . $imageName;
            $image->toJpeg(quality: 60)->save($savePath);

            //Store data in database
            Vote::create([
                'name' => $request->input('name'),
                'category_id' => $request->input('category_id'),
                'image' => $imageName,
                'votes' => 0,
            ]);

            return redirect()
                ->route('admin.show.add-nominee')
                ->with('success', 'Nominee added successfully.');
        }

        return back()->withErrors(['image' => 'Image upload failed.']);
    }

    public function getCategoryData($category_id)
    {
        $nominees = Vote::where('category_id', $category_id)
            ->join('categories', 'votes.category_id', '=', 'categories.id')
            ->select('votes.*', 'categories.hiphen', 'categories.category')
            ->orderBy('name', 'ASC')
            ->get();

        return response()->json($nominees);
    }

    public function edit($nominee_id)
    {
        $nominee = Vote::find($nominee_id);
        $categories = Category::orderBy('id', 'ASC')->get();

        return view('admin.edit-nominee', compact('nominee', 'categories'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'nullable',
            'id' => 'required|exists:votes,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $nominee = Vote::find($request['id']);
        $oldCategoryId = $nominee->category_id;
        $newCategoryId = $request['category_id'] == "" ? $oldCategoryId : $request['category_id'];
        $categoryChanged = $oldCategoryId != $newCategoryId;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = time() . '.' . $file->getClientOriginalExtension();

            //Get category directory
            $directory = Category::find($newCategoryId)->hiphen;
            $path = public_path('frontend/assets/nominees/' . $directory);

            if (!file_exists($path)) {
                mkdir($path, 0755, true);
            }

            // Delete old image if it exists
            if ($nominee->image) {
                $oldDirectory = Category::find($oldCategoryId)->hiphen;
                $oldPath = public_path('frontend/assets/nominees/' . $oldDirectory . '/' . $nominee->image);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            // Create ImageManager instance with GD driver
            $manager = new ImageManager(new Driver());

            //Read and process image
            $image = $manager->read($file->getPathname());

            // Resize to max width of 800px (keeping aspect ratio)
            $image->scale(width: 800);

            //Save compressed image (60% quality)
            $savePath = $path . '/' . $imageName;
            $image->toJpeg(quality: 60)->save($savePath);

            $nominee->image = $imageName;
        } else if ($categoryChanged && $nominee->image) {
            // Move the existing image to the new category directory
            $oldDirectory = Category::find($oldCategoryId)->hiphen;
            $oldPath = public_path('frontend/assets/nominees/' . $oldDirectory . '/' . $nominee->image);
            $newDirectory = Category::find($newCategoryId)->hiphen;
            $newPath = public_path('frontend/assets/nominees/' . $newDirectory);
            if (!file_exists($newPath)) {
                mkdir($newPath, 0755, true);
            }
            $newImagePath = $newPath . '/' . $nominee->image;
            if (file_exists($oldPath)) {
                rename($oldPath, $newImagePath);
            }
        }

        $nominee->name = $request['name'];
        $nominee->category_id = $newCategoryId;
        $nominee->save();

        return back()->with('success', 'Nominee updated successfully.');
    }

    public function destroy($nominee_id)
    {
        $nominee = Vote::findOrFail($nominee_id);

        // Get category directory
        $directory = Category::find($nominee->category_id)->hiphen;
        $path = public_path('frontend/assets/nominees/' . $directory);

        // Delete the nominee's image if it exists
        $imagePath = $path . '/' . $nominee->image;
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }

        // Delete the nominee record
        $nominee->delete();

        return redirect()->route('admin.nominees')->with('success', 'Nominee deleted successfully.');
    }
}
