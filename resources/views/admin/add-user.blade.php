@if(Auth::user()->type != 1)
    @php
        header("Location: " . URL::to('/admin/nominees'));
        exit();
    @endphp
@endif

@extends('layouts.admin-layout')

@section('title','Maso Awards - Add Users')

@section('main-content')
<div class="main_content_iner ">
    <div class="container-fluid p-0">
        <div class="row justify-content-center">
            <div class="col-lg-12">
                <div class="white_box mb_30">
                    <div class="box_header ">
                        <div class="main-title">
                            <h3 class="mb-0">Add User</h3>
                        </div>
                    </div>
                    <form action="{{route('add-user')}}" method="POST">
                        @csrf
                        <div class="mb-3">
                            <label class="form-label" for="fname">First Name</label>
                            <input type="text" name="first_name" class="form-control" id="fname" placeholder="Enter First Name" value="{{old('first_name')}}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="lname">Last Name</label>
                            <input type="text" name="last_name" class="form-control" id="lname" placeholder="Enter Last Name" value="{{old('last_name')}}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="email">Email</label>
                            <input type="text" name="email" class="form-control" id="email" placeholder="Enter Email" value="{{old('email')}}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="type">Account Type</label>
                            <select name="type" id="type" class="form-control">
                                <option selected disabled value="">Select</option>
                                <option value="0">User</option>
                                <option value="1">Admin</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="password">Password</label>
                            <input type="password" name="password" id="password" class="form-control" placeholder="Enter Password">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="confirm">Confirm Password</label>
                            <input type="password" name="password_confirmation" id="confirm" class="form-control" placeholder="Confifrm Password">
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="form-btn"><i class="fa fa-user"></i> Register</button>
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
        document.querySelector("#sidebar_menu .users").classList.add("mm-active");
    </script>
@endsection