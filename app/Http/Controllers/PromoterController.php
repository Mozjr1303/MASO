<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Promoter;
use App\Mail\RegisterPromoterMail;
use Illuminate\Support\Facades\Mail;

class PromoterController extends Controller
{
    public function index()
    {
        $promoters = Promoter::all();
        return view('admin.promoters', compact('promoters'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'code' => 'required|string|unique:promoters,code',
            'mobile' => 'required|string',
            'email' => 'required|email',
        ]);

        Promoter::create([
            'name' => $request->name,
            'code' => $request->code,
            'mobile' => $request->mobile,
            'email' => $request->email,
        ]);

        Mail::to($request->email)->send(new RegisterPromoterMail($request->name, $request->code, $request->mobile, $request->email));

        return redirect()->route('admin.promoters')->with('success', 'Promoter added successfully.');
    }

    public function edit($id)
    {
        $promoter = Promoter::find($id);
        return view('admin.edit-promoter', compact('promoter'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'code' => 'required|string|unique:promoters,code,' . $request->id,
            'mobile' => 'required|string',
            'email' => 'required|email',
        ]);

        $promoter = Promoter::find($request->id);
        $promoter->name = $request->name;
        $promoter->code = $request->code;
        $promoter->mobile = $request->mobile;
        $promoter->email = $request->email;
        $promoter->save();

        return redirect()->route('admin.promoters')->with('success', 'Promoter updated successfully.');
    }

    public function destroy($id)
    {
        $promoter = Promoter::find($id);
        $promoter->delete();

        return redirect()->route('admin.promoters')->with('success', 'Promoter deleted successfully.');
    }
}
