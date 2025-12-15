@extends('layouts.admin-layout')

@section('title', 'Maso Awards - Sponsors')

@section('main-content')
<div class="main_content_iner ">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="QA_section">
                    <div class="white_box_tittle list_header">
                        <h4>Sponsors & Partners</h4>
                        <div class="box_right d-flex lms_block">
                            <div class="add_button ms-2">
                                <a href="{{ route('admin.show.add-sponsor') }}" class="btn_1"><i class="fa fa-plus"></i> Add Sponsor</a>
                            </div>
                        </div>
                    </div>
                    <div class="QA_table mb_30">

                        <table class="table lms_table_active">
                            <thead>
                                <tr>
                                    <th scope="col">Logo</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($sponsors as $sponsor)
                                    <tr>
                                        <td><img src="{{ asset('frontend/assets/img/partners/' . $sponsor->image) }}" style="max-height: 50px;"></td>
                                        <td>{{ $sponsor->name }}</td>
                                        <td>
                                            <a href="{{ route('admin.delete-sponsor', $sponsor->id) }}" class="status_btn bg-danger" onclick="return confirm('Delete {{ $sponsor->name }}?')">
                                                <i class="fa fa-trash"></i>
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
        document.querySelector("#sidebar_menu .sponsors").classList.add("mm-active");
    </script>
@endsection