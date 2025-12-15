<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Partner;

class PartnersController extends Controller
{
    public function index()
    {
        $sponsors = Partner::orderBy('id', 'DESC')->get(); // Assuming you have a Sponsor model
        return view('admin.sponsors', compact('sponsors'));
    }

    public function showAddSponsor()
    {
        return view('admin.add-sponsor');
    }

    public function create(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'name' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('frontend/assets/img/partners'), $imageName);

            Partner::create([
                'image' => $imageName,
                'name' => $request->input('name'),
            ]);

            return redirect()->route('admin.sponsors')->with('success', 'Sponsor added successfully.');
        }

        return back()->withErrors(['image' => 'Failed to upload image.'])->withInput();
    }

    public function destroy($id)
    {
        $sponsor = Partner::findOrFail($id);

        // Delete the sponsor's image if it exists
        $imagePath = url('frontend/assets/img/partners/' . $sponsor->image);
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }

        // Delete the sponsor record
        $sponsor->delete();

        return redirect()->route('admin.sponsors')->with('success', 'Sponsor deleted successfully.');
    }
}
