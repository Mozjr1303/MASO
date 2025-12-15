@if(Auth::user()->type != 1)
    @php
        header("Location: " . URL::to('/admin/nominees'));
        exit();
    @endphp
@endif

@extends('layouts.admin-layout')

@section('title', 'Maso Awards - Promoters')

@section('main-content')
<div class="main_content_iner ">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="QA_section">
                    <div class="white_box_tittle list_header">
                        <h4>Promoters</h4>
                        <div class="box_right d-flex lms_block">
                            <div class="add_button ms-2">
                                <a href="{{route('admin.tickets')}}" class="btn_1"><i class="fa fa-ticket-alt"></i> Tickets</a>
                                <a href="{{route('admin.show.add-promoter')}}" class="btn_1"><i class="fa fa-plus"></i> Add Promoter</a>
                            </div>
                        </div>
                    </div>
                    <div class="QA_table mb_30">

                        <table class="table lms_table_active">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">Revenue</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($promoters as $promoter)
                                <tr>
                                    <td>{{ $promoter->name }}</td>
                                    <td>{{ $promoter->mobile }}</td>
                                    <td>{{ $promoter->email }}</td>
                                    <td>{{ $promoter->code }}</td>
                                    <td>{{ $promoter->amount }}</td>

                                    <td>
                                        <a href="{{ route('admin.show.edit-promoter', ['id' => $promoter->id]) }}"
                                            class="status_btn bg-primary">
                                            <i class="fa fa-pencil-alt"></i>
                                        </a>
                                    </td>
                                    <td><a href="{{ route('admin.delete-promoter', ['id' => $promoter->id]) }}" class="status_btn bg-danger"
                                            onclick="return confirm('Delete {{ $promoter->name }}')"><i
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