@if(Auth::user()->type != 1)
    @php
        header("Location: " . URL::to('/admin/nominees'));
        exit();
    @endphp
@endif

@extends('layouts.admin-layout')

@section('title', 'Maso Awards - Tickets')

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
                                <a href="{{route('admin.promoters')}}" class="btn_1"><i class="fa fa-star"></i> Promoters</a>
                                <a href="{{route('admin.generate-ticket')}}" class="btn_1"><i class="fa fa-plus"></i> Generate Ticket</a>
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
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($tickets as $ticket)
                                <tr>
                                    <td>{{ date('d M Y', strtotime($ticket->created_at)) }}</td>
                                    <td>{{ $ticket->name }}</td>
                                    <td>{{ $ticket->mobile }}</td>
                                    <td>{{ $ticket->ticket_type }}</td>
                                    <td>{{ $ticket->unique_id }}</td>

                                    <td><a href="{{ url('frontend/tickets/'.$ticket->image) }}" class="status_btn bg-success" download>
                                            <i class="fa fa-download"></i>
                                        </a>
                                    </td>
                                    <td><a href="{{ route('admin.delete-ticket', ['id' => $ticket->id]) }}" class="status_btn bg-danger"
                                            onclick="return confirm('Delete {{ $ticket->name }}')"><i
                                                class="fa fa-trash"></i>
                                        </a>
                                    </td>
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
    document.querySelector("#sidebar_menu .tickets").classList.add("mm-active");
</script>
@endsection