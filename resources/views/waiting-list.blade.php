@extends('layouts.nominate-layout')

@section('title', 'Maso Awards - Waiting List')

@section('og-tags')
<meta property="og:url" content="https://www.maso-awards.com/waiting-list" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Maso Awards {{ date('Y') }}" />
<meta property="og:image" content="https://maso-awards.live/frontend/assets/img/maso-og.jpg" />
<meta property="og:description" content="Join the waiting list" />
@endsection

@section('content')

<div class="form php-email-form">
    <form action="waiting-list-form" method="POST">
        @csrf
        <div class="form-group mt-3 mb-4">
            <input type="text" class="form-control" name="name" id="subject" placeholder="Full Name" required>
        </div>
        <div class="form-group mt-3 mb-4">
            <input type="text" class="form-control" name="mobile" id="subject" placeholder="Mobile Number" required>
        </div>
        <div class="form-group mt-3 mb-4">
            <select name="ticket_type" id="" class="form-control" required>
                <option value="">Ticket Type</option>
                <option value="standard">Standard</option>
                <option value="vip">VIP</option>
            </select>
        </div>
        <div class="form-group mt-3 mb-4">
            <input type="email" class="form-control" name="email" id="subject" placeholder="Email Address" required>
        </div>
        <div class="text-center"><button type="submit" name="submit">Join The Waitlist</button></div>
    </form>
</div>
@endsection