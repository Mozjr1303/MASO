@extends('layouts.nominate-layout')

@section('title', 'Maso Awards - Buy Ticket')

@section('og-tags')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta property="og:url" content="https://www.maso-awards.com/buy-ticket" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Maso Awards {{ date('Y') }}" />
    <meta property="og:image" content="https://maso-awards.live/frontend/assets/img/maso-og.jpg" />
    <meta property="og:description" content="Buy Ticket" />
@endsection

@section('content')

    <div class="form php-email-form">
        @if (request()->hasCookie('image'))
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <div class="col-sm-8 col-12">
                        <div class="alert alert-success">
                            <h4>Your ticket has been successfully purchased!</h4>
                            <p>Please save your ticket by clicking the button below</p>
                            <p>The ticket will be used for your verification at the event.</p>
                            <a href="{{ request()->cookie('image') }}" class="btn"
                                download>Download
                                Ticket</a>
                        </div>
                    </div>
                </div>
            </div>
        @endif

        <form action="" id="ticketForm" method="POST">
            @csrf
            <div class="form-group mt-3 mb-4">
                <input type="text" class="form-control" name="name" id="name" placeholder="Full Name" required>
            </div>
            <div class="form-group mt-3 mb-4">
                <select name="ticket_type" id="payment-method" class="form-control" required>
                    <option value="" selected disabled>Payment Method</option>
                    <option value="tnm">Mpamba</option>
                    <option value="airtel">Airtel Money</option>
                </select>
            </div>
            <div class="form-group mt-3 mb-4 payment" style="display:none">
                <input type="text" class="form-control" name="mobile" id="mobile" placeholder=""
                    required>
            </div>
            <div class="form-group mt-3 mb-4">
                <select name="ticket_type" id="ticket_type" class="form-control" required>
                    <option value="">Ticket Type</option>
                    <option value="standard">Standard (MK 20,000)</option>
                    <option value="vip">VIP (MK 70,000)</option>
                </select>
            </div>
            <div class="form-group mt-3 mb-4">
                <input type="email" class="form-control" name="email" id="email"
                    placeholder="Email Address (Optional)">
            </div>
            <div class="form-group mt-3 mb-4">
                <input type="text" class="form-control" name="code" id="code"
                    placeholder="Promo Code (Optional)">
            </div>
            <div class="text-center"><button>Submit</button></div>

            <div class="loader-container">
                <div class="loader-content">
                    <div class="loader"></div>
                    <h6></h6>
                </div>
            </div>
            <p class="text-center">For inquiries, contact +265 998 41 24 21</p>
        </form>
    </div>
@endsection

@section('ticket-js')
    <script src="{{ url('frontend/js/ticket.min.js') }}"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var paymentMethod = document.getElementById('payment-method');
            var paymentDiv = document.querySelector('.payment');
            var paymentInput = paymentDiv.querySelector('#mobile');

            paymentMethod.addEventListener('change', function() {
                paymentDiv.style.display = 'flex';
                if (this.value === 'tnm') {
                    paymentInput.placeholder = '08xxxxxxxx';
                } else if (this.value === 'airtel') {
                    paymentInput.placeholder = '09xxxxxxxx';
                }
            });
        });
    </script>
@endsection
