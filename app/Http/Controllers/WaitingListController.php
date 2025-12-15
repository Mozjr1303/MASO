<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WaitingList;
use App\Mail\WaitingListVerificationMail;
use Illuminate\Support\Facades\Mail;

class WaitingListController extends Controller
{
    public function index()
    {

        $now = time();

        $finalDate = strtotime('26-10-2025 23:59');
        $remainingTime = $finalDate - $now;

        if ($remainingTime <= 0) {
            $remainingTime = 0;
        }

        return view('waiting-list', ['remainingTime' => $remainingTime]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'mobile' => 'required|string|max:20',
            'ticket_type' => 'required|string|max:50',
            'email' => 'required|email|max:255|unique:waiting_list,email',
        ]);

        // Generate a verification token
        $token = bin2hex(random_bytes(32));
        // Store data temporarily in session or a temp table (for demo, session)
        session([
            'waitinglist_data' => [
                'name' => $request->input('name'),
                'mobile' => $request->input('mobile'),
                'ticket_type' => $request->input('ticket_type'),
                'email' => $request->input('email'),
                'token' => $token
            ]
        ]);

        $verificationLink = url('/waiting-list/verify/' . $token);
        Mail::to($request->input('email'))->send(
            new WaitingListVerificationMail(
                $request->input('name'),
                $verificationLink,
                date('Y')
            )
        );

        return redirect('/waiting-list')->with('success', 'A verification email has been sent. Please check your inbox.');
    }

    public function verify($token)
    {
        $data = session('waitinglist_data');
        if ($data && $data['token'] === $token) {
            $waitingListEntry = new WaitingList();
            $waitingListEntry->name = $data['name'];
            $waitingListEntry->mobile = $data['mobile'];
            $waitingListEntry->ticket_type = $data['ticket_type'];
            $waitingListEntry->email = $data['email'];
            $waitingListEntry->save();
            session()->forget('waitinglist_data');
            return redirect('/home')->with('success', 'You have joined the waiting list!');
        }
        return redirect('/waiting-list')->with('error', 'Invalid or expired verification link.');
    }
}
