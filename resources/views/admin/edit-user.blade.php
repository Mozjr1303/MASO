@if(Auth::user()->type != 1)
    @php
        header("Location: " . URL::to('/admin/nominees'));
        exit();
    @endphp
@endif

@extends('layouts.admin-layout')

@section('title','Maso Awards - Edit User')

@section('main-content')
<div class="main_content_iner ">
    <div class="container-fluid p-0">
        <div class="row justify-content-center">
            <div class="col-lg-12">
                <div class="white_box mb_30">
                    <div class="box_header ">
                        <div class="main-title">
                            <h3 class="mb-0">Edit User</h3>
                        </div>
                    </div>
                    <form action="{{route('show.edit-user',['id' => $user->id])}}" method="POST">
                        @csrf
                        <div class="mb-3">
                            <label class="form-label" for="name">Full Name</label>
                            <input type="text" name="name" id="name" value="{{$user->name}}" class="form-control" placeholder="Full Name" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="email">Email</label>
                            <input type="text" name="email" id="email" value="{{ $user->email}}" class="form-control" placeholder="Email" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="type">Account Type</label>
                            <select name="type" id="type" class="form-control">
                                <option selected value="{{ $user->type }}">
                                    {{ $user->type == 0 ? 'User' : 'Admin' }}
                                </option>
                                <option value="0">User</option>
                                <option value="1">Admin</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="password">Password</label>
                            <input type="text" name="password" id="password" class="form-control" placeholder="New Password (Optional)">
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="form-btn"><i class="fa fa-user"></i> Update</button>
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