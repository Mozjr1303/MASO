@extends('layouts.nominate-layout')

@section('title', 'Maso Awards - '.$category->category)

@section('og-tags')
<meta name="csrf-token" content="{{ csrf_token() }}">
<meta property="og:url" content="https://www.maso-awards.com/nominate/category/{{ $category->id.'/'.$category->hiphen }}" />
<meta property="og:type" content="website" />
<meta property="og:title" content="{{ $category->category }}" />
<meta property="og:image" content="https://maso-awards.live/frontend/assets/img/maso-og.jpg" />
<meta property="og:description" content="Nominate" />
@endsection

@section('content')
<form action="/api/process-deposit" method="POST" class="per-nominee">
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

            <input type="text" id="name" name="name" placeholder="{{ $category->category }}" value="" required>
            <select name="" id="payment-method" required>
                <option value="" selected disabled>Payment Method</option>
                <option value="airtel">Airtel Money</option>
                <option value="tnm">Mpamba</option>
            </select>

            <div class="payment">
                <div class="img-container">
                    <img src="{{ url('frontend/assets/img/airtel-money.png') }}" alt="">
                </div>
                <input type="text" name="payment_number" id="mobile_number" placeholder="09xxxxxxxx" required>
            </div>
            <input type="hidden" name="category_id" value="{{ $category->id }}">
            <input type="hidden" name="price" id="price" value="50">
            <button type="submit" name="submit" class="fancy-button">Nominate</button>

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

@section('nominate-js')
<script src="{{ url('frontend/js/nominate.js') }}"></script>
@endsection

@section('autocomplete-js')
<script>
    var category = [<?php echo $cate; ?>];
    autocomplete(document.getElementById("name"), category);
</script>
@endsection