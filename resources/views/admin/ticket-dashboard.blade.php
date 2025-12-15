@extends('layouts.admin-layout')

@section('title', 'Maso Awards - Ticket Dashboard')

@section('main-content')
    <div class="main_content_iner ">
        <div class="container-fluid">
            <div class="row d-flex justify-content-center">
                <div class="white_box_tittle list_header">
                    <h4>Metrics</h4>
                    <div class="box_right d-flex lms_block">
                        <div class="add_button ms-2">
                            <a href="{{ route('admin.ticket-dashboard') }}" class="btn_1"><i class="fa fa-tachometer-alt"></i>
                                Metrics</a>
                            <a href="{{ route('admin.approved-tickets') }}" class="btn_1"><i class="fa fa-ticket-alt"></i>
                                Tickets</a>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <h4 class="text-center">Online Tickets</h4>
                </div>
                <div class="col-11 col-sm-6 col-md-4 mb-3 dashboard-card">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">TOTALS</h5>
                            <p class="card-text display-6" id="main_balance">VIP: 0</p>
                            <p class="card-text display-6" id="main_balance">STD: 0</p>
                        </div>
                    </div>
                </div>
                <div class="col-11 col-sm-6 col-md-4 mb-3 dashboard-card">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">STANDARD TICKETS</h5>
                            <p class="card-text display-6" id="collection_balance">A: 0</p>
                            <p class="card-text display-6" id="collection_balance">N: 0</p>
                        </div>
                    </div>
                </div>
                <div class="col-11 col-sm-6 col-md-4 mb-3 dashboard-card">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">VIP TICKETS</h5>
                            <p class="card-text display-6" id="nominees_revenue">A: 0</p>
                            <p class="card-text display-6" id="nominees_revenue">N: 0</p>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <h4 class="text-center">Physical Tickets</h4>
                </div>
                <div class="col-11 col-sm-6 col-md-4 col-lg-3 mb-3 dashboard-card">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">TOTALS</h5>
                            <p class="card-text display-6" id="main_balance">STD: 0</p>
                            <p class="card-text display-6" id="main_balance">VIP: 0</p>
                        </div>
                    </div>
                </div>
                <div class="col-11 col-sm-6 col-md-4 col-lg-3 mb-3 dashboard-card">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">STD TICKETS</h5>
                            <p class="card-text display-6" id="collection_balance">A: 0</p>
                            <p class="card-text display-6" id="collection_balance">N: 0</p>
                        </div>
                    </div>
                </div>
                <div class="col-11 col-sm-6 col-md-4 col-lg-3 mb-3 dashboard-card">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">VIP TICKETS</h5>
                            <p class="card-text display-6" id="nominees_revenue">A: 0</p>
                            <p class="card-text display-6" id="nominees_revenue">N: 0</p>
                        </div>
                    </div>
                </div>
                <div class="col-11 col-sm-6 col-md-4 col-lg-3 mb-3 dashboard-card">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">STD COMPLIMENTARY</h5>
                            <p class="card-text display-6" id="nominees_revenue">A: 0</p>
                            <p class="card-text display-6" id="nominees_revenue">N: 0</p>
                        </div>
                    </div>
                </div>
                <div class="col-11 col-sm-6 col-md-4 col-lg-3 mb-3 dashboard-card">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">VIP COMPLIMENTARY</h5>
                            <p class="card-text display-6" id="nominees_revenue">A: 0</p>
                            <p class="card-text display-6" id="nominees_revenue">N: 0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endsection

    @section('active-page')
        <script>
            document.querySelector("#sidebar_menu .scan").classList.add("mm-active");
        </script>

        <script>
            function numberWithCommas(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            function fetchKpis() {
                fetch('/admin/tickets/get-ticket-data')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        document.querySelectorAll('#main_balance')[0].innerText = `STD: ${data.standardOnlineTickets}`;
                        document.querySelectorAll('#main_balance')[1].innerText = `VIP: ${data.vipOnlineTickets}`;

                        document.querySelectorAll('#collection_balance')[0].innerText = `A: ${data.standardOnlineApproved}`;
                        document.querySelectorAll('#collection_balance')[1].innerText =
                            `N: ${data.standardOnlineTickets - data.standardOnlineApproved}`;

                        document.querySelectorAll('#nominees_revenue')[0].innerText = `A: ${data.vipOnlineApproved}`;
                        document.querySelectorAll('#nominees_revenue')[1].innerText =
                            `N: ${data.vipOnlineTickets - data.vipOnlineApproved}`;

                        document.querySelectorAll('#main_balance')[2].innerText = `STD: ${data.standardPhysicalTickets}`;
                        document.querySelectorAll('#main_balance')[3].innerText = `VIP: ${data.vipPhysicalTickets}`;

                        document.querySelectorAll('#collection_balance')[2].innerText =
                            `A: ${data.standardPhysicalApproved}`;
                        document.querySelectorAll('#collection_balance')[3].innerText =
                            `N: ${data.standardPhysicalTickets - data.standardPhysicalApproved}`;

                        document.querySelectorAll('#nominees_revenue')[2].innerText = `A: ${data.vipPhysicalApproved}`;
                        document.querySelectorAll('#nominees_revenue')[3].innerText =
                            `N: ${data.vipPhysicalTickets - data.vipPhysicalApproved}`;

                        document.querySelectorAll('#nominees_revenue')[4].innerText = `A: ${data.standardCompApproved}`;
                        document.querySelectorAll('#nominees_revenue')[5].innerText =
                            `N: ${data.standardComplimentary - data.standardCompApproved}`;

                        document.querySelectorAll('#nominees_revenue')[6].innerText = `A: ${data.vipCompApproved}`;
                        document.querySelectorAll('#nominees_revenue')[7].innerText =
                            `N: ${data.vipComplimentary - data.vipCompApproved}`;
                    })
                    .catch(error => {
                        console.error('Error fetching KPIs:', error);
                    });
            }

            // Fetch KPIs initially
            fetchKpis();

            // Refresh KPIs every 5 seconds (adjust as needed)
            setInterval(fetchKpis, 2000);
        </script>

        <style>
            .display-6 {
                font-size: 1.2rem;
                font-weight: 500;
            }

            .card-title {
                font-size: 0.8rem;
                font-weight: 600;
            }
        </style>
    @endsection
