@extends('layouts.vote-layout')

@section('title', 'Maso Awards - ' . $category->category)

@section('og-tags')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta property="og:url"
        content="https://www.maso-awards.com/vote/category/{{ $category->id . '/' . $category->hiphen }}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="{{ $category->category }}" />
    <meta property="og:image" content="https://maso-awards.live/frontend/assets/img/maso-og.jpg" />
    <meta property="og:description" content="Vote" />
@endsection

@section('content')
    <form action="" class="per-category" method="POST">
        <div class="row d-flex justify-content-center pb-3">
            @if (count($nominees) > 0)
                @foreach ($nominees as $nominee)
                    <input type="hidden" id="vid" value="{{ $nominee->id }}">
                    <input type="hidden" id="url" value="<?php echo $category->hiphen; ?>">
                    <div class="col-lg-3 col-md-4 col-sm-6 col-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.5s">
                        <div class="inside-col">
                            <div>
                                <label for="vote-{{ $nominee->id }}" id="{{ $nominee->id }}">
                                    <img src="{{ url('frontend/assets/nominees/' . $category->hiphen . '/' . $nominee->image) }}"
                                        alt="">
                                    <h4>{{ $nominee->name }}</h4>
                                </label>
                                <input type="radio" id="vote-{{ $nominee->id }}" value="{{ $nominee->id }}">
                                <button type="button" onClick="vote({{ $nominee->id }},{{$category->id}})"
                                    class="vote-b"><span class="fa fa-vote-yea"></span> Vote
                                </button>
                            </div>
                        </div>
                    </div>
                @endforeach
            @else
                <div class="text-center my-3"> No data added yet in this category </div>
            @endif
        </div>
    </form>
    <form action="/vote/process-deposit" method="POST" class="per-nominee" style="display:none;">
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-sm-9 col-md-8 col-lg-5 wow fadeInUp" data-wow-duration="1.5s" data-wow-delay="0.5s">

                <label for="name">
                    <span class="label-decoration">
                        <i class="fas fa-user icons"></i>
                    </span>
                    <span class="label-text">
                        <span class="label-text-inner">{{ $category->category }}</span>
                    </span>
                </label>

                <select name="" id="payment-method" required>
                    <option value="" selected disabled>Payment Method</option>
                    <option value="airtel">Airtel Money (MK 100)</option>
                    <option value="tnm">Mpamba (MK 100)</option>
                </select>

                <div class="payment">
                    <div class="img-container">
                        <img src="{{ url('frontend/assets/img/airtel-money.png') }}" alt="">
                    </div>
                    <input type="text" name="payment_number" id="mobile_number" placeholder="09xxxxxxxx" required>
                </div>
                <input type="hidden" name="nominee_id" id="selected-nominee" value="">
                <input type="hidden" name="price" id="price" value="100">
                <input type="hidden" name="category_id" id="category-id" value="{{$category->id}}">
                <button type="submit" name="submit" class="fancy-button">Submit</button>

                <div class="loader-container">
                    <div class="loader-content">
                        <div class="loader"></div>
                        <h6></h6>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var paymentMethod = document.getElementById('payment-method');
            var paymentDiv = document.querySelector('.payment');
            var paymentImg = paymentDiv.querySelector('img');
            var paymentInput = paymentDiv.querySelector('input');

            paymentMethod.addEventListener('change', function() {
                paymentDiv.style.display = 'flex';
                if (this.value === 'tnm') {
                    paymentImg.src = "{{ url('frontend/assets/img/mpamba.png') }}";
                    paymentInput.placeholder = '08xxxxxxxx';
                } else if (this.value === 'airtel') {
                    paymentImg.src = "{{ url('frontend/assets/img/airtel-money.png') }}";
                    paymentInput.placeholder = '09xxxxxxxx';
                }
            });
        });
    </script>

    <div class="row">
        <div class="col-12">
            <!-- share button -->
            <div class="sharethis-inline-share-buttons"></div>
        </div>
    </div>
@endsection

@section('vote-js')
    <script src="{{ url('frontend/js/vote.min.js') }}"></script>
    <script>
        //scripts for trimming nominee names
        x = document.querySelectorAll(".per-category .col-lg-3 .inside-col label h4");
        for (i = 0; i < x.length; i++) {
            y = x[i].innerHTML;
            if (y.length <= 22) {
                z = x[i].innerHTML;
            } else {
                y = x[i].innerHTML.slice(0, 22);
                z = x[i].innerHTML = y + "...";
            }
        }
    </script>
@endsection
