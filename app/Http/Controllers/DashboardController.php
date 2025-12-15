<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\Nominee;
use App\Models\NominateMobiles;
use App\Models\VoteMobile;
use App\Models\Ticket;
use App\Models\Vote;
use App\Models\NomineeTransaction;
use App\Models\VoterIdentifier;


class DashboardController extends Controller
{
    public function index()
    {
        return view('admin.dashboard');
    }

    public function kpis()
    {
        $tickets = count(Ticket::where('ticket_type','standard')->orwhere('ticket_type','vip')->get());
        // $mobileNumbers=NominateMobiles::count(); //nominations
        $mobileNumbers = VoteMobile::count(); //voting
        $nominations = Nominee::sum('count');
        $votes = Vote::sum('votes');
        $nomineesRevenue = NomineeTransaction::sum('votes_count') * 100 * 0.97 * 0.5; //50% of 97% of votes amount
        $fingerPrints = VoterIdentifier::count('fingerprint');
        $ipAddresses = VoterIdentifier::distinct()->count('ip_address');
        $url = "https://api.paychangu.com/wallet-balance?currency=MWK";
        $secretKey = env('PAYMENT_TOKEN');

        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $secretKey,
        ])->get($url);

        if ($response->successful()) {
            $data = $response->json();
            $walletBalance = $data; // Assign the entire data array to walletBalance
        } else {
            $walletBalance = "Request failed. Status code: " . $response->status();
        }

        return response()->json([
            'main_balance' => $data['data']['main_balance'],
            'collection_balance' => $data['data']['collection_balance'],
            'nominees_revenue' => $nomineesRevenue,
            'tickets' => $tickets,
            'mobile_numbers' => $mobileNumbers,
            'nominations' => $nominations,
            'votes' => $votes,
            'fingerprints' => $fingerPrints,
            'ipAddresses' => $ipAddresses
        ]);
    }
}
