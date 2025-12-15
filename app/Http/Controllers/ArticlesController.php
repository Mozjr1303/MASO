<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ArticlesController extends Controller
{
    public function index()
    {
        $articles = Article::orderBy('id', 'DESC')->get();
        return view('home', ['articles' => $articles]);
    }

    public function read($id)
    {
        $article = Article::find($id);
        return view('article', ['article' => $article]);
    }

    public function adminIndex()
    {
        $articles = Article::orderBy('id', 'DESC')->get();
        return view('admin.articles', compact('articles'));
    }

    public function showAddArticle()
    {
        return view('admin.add-article');
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'title' => 'required|string|max:255',
            'details' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imageName = 'article-'.time() . '.' . $file->getClientOriginalExtension();

            $path = public_path('frontend/assets/articles/');

            // Create ImageManager instance with GD driver
            $manager = new ImageManager(new Driver());

            //Read and process image
            $image = $manager->read($file->getPathname());

            // Resize to max width of 800px (keeping aspect ratio)
            $image->scale(width: 800);

            //Save compressed image (60% quality)
            $savePath = $path . '/' . $imageName;
            $image->toJpeg(quality: 60)->save($savePath);

            Article::create([
                'image' => $imageName,
                'title' => $request->title,
                'details' => $request->details,
            ]);

            return redirect()->route('admin.articles')->with('success', 'Article added successfully.');
        }

        return back()->withErrors(['image' => 'Article submission failed.']);
    }

    public function showEditArticle($id)
    {
        $article = Article::find($id);
        return view('admin.edit-article', compact('article'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'details' => 'required|string',
        ]);

        $article = Article::find($id);
        $article->title = $request->title;
        $article->details = $request->details;
        $article->save();

        return redirect()->route('admin.articles')->with('success', 'Article updated successfully.');
    }

    public function destroy($id)
    {
        $article = Article::find($id);

        $path = public_path('frontend/assets/articles/');

        // Delete the nominee's image if it exists
        $imagePath = $path . $article->image;
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }

        $article->delete();

        return redirect()->route('admin.articles')->with('success', 'Article deleted successfully.');
    }
}
