<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Mail\ForgotPasswordMail;
use Illuminate\Support\Facades\Mail;
use App\Models\User;

class UsersController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            if (Auth::user()->type <= 1) {
                return redirect()->route('admin.dashboard');
            } else {
                return redirect()->route('admin.roots');
            }
        } else {
            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ])->withInput();
        }
    }

    public function logout()
    {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return redirect()->route('show.login');
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();

        $token = bin2hex(random_bytes(32));
        $user->reset_token = $token;
        $user->save();

        $resetLink = url('/reset-password/' . $token);

        Mail::to($request->email)->send(
            new ForgotPasswordMail($user->name, $resetLink)
        );

        return back()->with('success', 'If your email is registered, you will receive a password reset link shortly.');
    }

    public function showResetForm($token)
    {
        $user = User::where('reset_token', $token)->first();

        if (!$user) {
            return redirect()->route('show.login')->with('error', 'Invalid or expired password reset token.');
        }

        return view('auth.reset-password', ['token' => $token]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required|string|exists:users,reset_token',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::where('reset_token', $request->token)->first();

        if (!$user) {
            return redirect()->route('show.login')->with('error', 'Invalid or expired password reset token.');
        }

        $user->password = bcrypt($request->password);
        $user->reset_token = null;
        $user->save();

        return redirect()->route('show.login')->with('success', 'Password has been reset successfully. You can now log in with your new password.');
    }

    public function users()
    {
        $users = User::all();
        return view('admin.users', ['users' => $users]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'type' => 'required|in:0,1',
            'password' => 'required|string|min:8|confirmed',
        ]);


        $save = User::create([
            'name' => $validatedData['first_name'] . ' ' . $validatedData['last_name'],
            'email' => $validatedData['email'],
            'type' => $validatedData['type'],
            'password' => bcrypt($validatedData['password']),
        ]);

        if ($save) {
            return redirect()->route('users')->with('success', 'User added successfully.');
        } else {
            return redirect()->route('show.add-user')->with('error', 'Failed to add user. Please try again.');
        }
    }

    public function showEdit($id)
    {
        $user = User::find($id);
        return view('admin.edit-user', ['user' => $user]);
    }

    public function edit(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:560',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'type' => 'required|in:0,1',
            'password' => 'nullable|string|min:8',
        ]);

        $user = User::find($id);
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->type = $validatedData['type'];

        if (!empty($validatedData['password'])) {
            $user->password = bcrypt($validatedData['password']);
        }

        $save = $user->save();

        if ($save) {
            return redirect()->route('users')->with('success', 'User updated successfully.');
        } else {
            return redirect()->route('users')->with('error', 'Failed to update user. Please try again.');
        }
    }

    public function delete($id)
    {
        $user = User::find($id);
        if (Auth::User()->id != $id) {
            if ($user) {
                $user->delete();
                return redirect()->route('users')->with('success', 'User deleted successfully.');
            } else {
                return redirect()->route('users')->with('error', 'User not found.');
            }
        } else {
            return redirect()->route('users')->with('error', 'Action not allowed: Admins cannot delete their own accounts');
        }
    }
}
