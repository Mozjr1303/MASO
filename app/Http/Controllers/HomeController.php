<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gallery;
use App\Models\Article;
use App\Models\Partner;

class HomeController extends Controller
{
    public function index()
    {
        $images = Gallery::all();
        $articles = Article::orderBy('id', 'DESC')->get();
        $partners = Partner::all();
        return view('home', [
            'images' => $images,
            'articles' => $articles,
            'partners' => $partners
        ]);
    }
}
