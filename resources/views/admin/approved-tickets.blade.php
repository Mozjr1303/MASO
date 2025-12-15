@extends('layouts.admin-layout')

@section('title', 'Maso Awards - Approved Tickets')

@section('main-content')
    <div class="main_content_iner ">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-12">
                    <div class="QA_section">
                        <div class="white_box_tittle list_header">
                            <h4>Tickets</h4>
                            <div class="box_right d-flex lms_block">
                                <div class="add_button ms-2">
                                    <a href="{{ route('admin.ticket-dashboard') }}" class="btn_1"><i
                                            class="fa fa-tachometer-alt"></i>
                                        Metrics</a>
                                    <a href="{{ route('admin.approved-tickets') }}" class="btn_1"><i
                                            class="fa fa-ticket-alt"></i>
                                        Tickets</a>
                                </div>
                            </div>
                        </div>
                        <div class="QA_table mb_30">

                            <table class="table lms_table_active">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Mobile</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($tickets as $ticket)
                                        <tr>
                                            <td>{{ date('d M Y, G:i:s', strtotime($ticket->updated_at)) }}</td>
                                            <td>{{ $ticket->name }}</td>
                                            <td>{{ $ticket->mobile }}</td>
                                            <td>{{ $ticket->ticket_type }}</td>
                                            <td>{{ $ticket->unique_id }}</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
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
@endsection
