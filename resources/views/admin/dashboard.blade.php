@if(Auth::user()->type != 1)
@php
header("Location: " . URL::to('/admin/tickets/scan'));
exit();
@endphp
@endif

@extends('layouts.admin-layout')

@section('title', 'Maso Awards - Dashboard')

@section('main-content')
<div class="main_content_iner ">
    <div class="container-fluid">
        <div class="row d-flex justify-content-center">
            <div class="col-11 col-sm-6 col-md-4 mb-3 dashboard-card">
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">MAIN BALANCE</h5>
                        <p class="card-text display-6" id="main_balance">0</p>
                    </div>
                </div>
            </div>
            <div class="col-11 col-sm-6 col-md-4 mb-3 dashboard-card">
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">COLLECTION BALANCE</h5>
                        <p class="card-text display-6" id="collection_balance">0</p>
                    </div>
                </div>
            </div>
            <div class="col-11 col-sm-6 col-md-4 mb-3 dashboard-card">
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">NOMINEE'S REVENUE</h5>
                        <p class="card-text display-6" id="nominees_revenue">0</p>
                    </div>
                </div>
            </div>
            <div class="col-11 col-sm-6 col-md-4 mb-3 dashboard-card">
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">NOMINATIONS</h5>
                        <p class="card-text display-6" id="nominations">0</p>
                    </div>
                </div>
            </div>
            <div class="col-11 col-sm-6 col-md-4 mb-3 dashboard-card">
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">VOTES</h5>
                        <p class="card-text display-6" id="votes">0</p>
                    </div>
                </div>
            </div>
            <div class="col-11 col-sm-6 col-md-4 mb-3 dashboard-card">
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">TICKETS GENERATED</h5>
                        <p class="card-text display-6" id="tickets_generated">0</p>
                    </div>
                </div>
            </div>
            <div class="col-11 col-sm-6 col-md-4 mb-3 dashboard-card">
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">MOBILE NUMBERS</h5>
                        <p class="card-text display-6" id="mobile_numbers">0</p>
                    </div>
                </div>
            </div>
            <div class="col-11 col-sm-6 col-md-4 mb-3 dashboard-card">
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">FINGERPRINTS</h5>
                        <p class="card-text display-6" id="fingerprints">0</p>
                    </div>
                </div>
            </div>
            <div class="col-11 col-sm-6 col-md-4 mb-3 dashboard-card">
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">IP ADDRESSES</h5>
                        <p class="card-text display-6" id="ip_addresses">0</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endsection

    @section('active-page')
    <script>
        document.querySelector("#sidebar_menu .dashboard").classList.add("mm-active");
    </script>
    <script>
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        function fetchKpis() {
            fetch('/admin/api/kpis')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text(); // Get the raw text response
                })
                .then(text => {
                    try {
                        const data = JSON.parse(text);
                        console.log(data);
                        document.getElementById('main_balance').innerText = 'MK' + numberWithCommas(data.main_balance);
                        document.getElementById('collection_balance').innerHTML = 'MK' + numberWithCommas(data.collection_balance);
                        document.getElementById('nominees_revenue').innerHTML = 'MK' + numberWithCommas(data.nominees_revenue);
                        document.getElementById('tickets_generated').innerText = numberWithCommas(data.tickets);
                        document.getElementById('mobile_numbers').innerText = numberWithCommas(data.mobile_numbers);
                        document.getElementById('nominations').innerText = numberWithCommas(data.nominations);
                        document.getElementById('fingerprints').innerText = numberWithCommas(data.fingerprints);
                        document.getElementById('ip_addresses').innerText = numberWithCommas(data.ipAddresses);
                        document.getElementById('votes').innerText = numberWithCommas(data.votes);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                        console.error('Raw response text:', text); // Log the raw response
                        // Optionally display a user-friendly error message on the page
                        // document.getElementById('error-message').innerText = 'Failed to load data. Please try again later.';
                    }
                })
                .catch(error => {
                    console.error('Error fetching KPIs:', error);
                    // Optionally display a user-friendly error message on the page
                    // document.getElementById('error-message').innerText = 'Failed to load data. Please try again later.';
                });
        }

        // Fetch KPIs initially
        fetchKpis();

        // Refresh KPIs every 5 seconds (adjust as needed)
        setInterval(fetchKpis, 2000);
    </script>
    @endsection