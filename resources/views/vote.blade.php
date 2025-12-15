
@extends('layouts.vote-layout')

@section('title', 'Maso Awards - Vote')

@section('og-tags')
    <meta property="og:url" content="https://www.maso-awards.com/vote" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Maso Awards {{ date('Y') }}" />
    <meta property="og:image" content="https://maso-awards.live/frontend/assets/img/maso-og.jpg" />
    <meta property="og:description" content="Vote" />
@endsection

@section('content')

<div class="categories row d-flex justify-content-center">
    @foreach ($categories as $category)
    <div class="col-lg-3 col-md-4 col-sm-6 col-6 wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.2s">
        <a href="{{ url('vote/category/'. $category->id.'/'. $category->hiphen) }}" target="_blank" class="black">
            <img src="{{ url('frontend/assets/img/category-star.png') }}" alt="">
            <div>{{ $category->category }}</div>
        </a>
    </div>
    @endforeach
</div>
@endsection