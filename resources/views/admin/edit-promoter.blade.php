@if (Auth::user()->type != 1)
    @php
        header('Location: ' . URL::to('/admin/nominees'));
        exit();
    @endphp
@endif

@extends('layouts.admin-layout')

@section('title', 'Maso Awards - Edit Promoter')

@section('main-content')
    <div class="main_content_iner ">
        <div class="container-fluid p-0">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="white_box mb_30">
                        <div class="box_header ">
                            <div class="main-title">
                                <h3 class="mb-0">Edit Promoter</h3>
                            </div>
                        </div>
                        <form action="{{ route('admin.edit-promoter',['id'=>$promoter->id]) }}" method="POST">
                            @csrf
                            <div class="mb-3">
                                <label class="form-label" for="name">Full Name</label>
                                <input type="text" name="name" id="name" class="form-control"
                                    placeholder="Enter Promoter Name" value="{{ $promoter->name }}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="mobile">Mobile</label>
                                <input type="text" name="mobile" class="form-control" placeholder="Enter Phone Number"
                                    value="{{ $promoter->mobile }}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="email">Email</label>
                                <input type="email" name="email" id="email" class="form-control"
                                    placeholder="Enter Email" value="{{ $promoter->email }}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="code">Promo Code</label>
                                <input type="text" name="code" id="code" class="form-control"
                                    placeholder="Enter Promo Code" value="{{ $promoter->code }}" required>
                            </div>
                            <div class="d-flex justify-content-center">
                                <button type="submit" class="form-btn"><i class="fa fa-exchange"></i> Update</button>
                            </div>
                        </form>
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
