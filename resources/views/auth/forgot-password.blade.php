@extends('layouts.login-layout')

@section('title','Maso Awards - Forgot Password')

@section('content')
<div class="limiter">
    <div class="container-login100">
        <div class="wrap-login100">
            <form class="login100-form validate-form p-l-55 p-r-55 p-t-178" action="{{ route('forgot-password') }}"
                method="POST">
                @csrf
                <span class="login100-form-title">
                    Forgot Password
                </span>

                <div class="wrap-input100 m-b-16" data-validate="Please enter email">
                    <input class="input100" type="text" name="email" placeholder="Enter Email"
                        value="{{ old('email') }}">
                    <span class="focus-input100"></span>
                </div>

                <div class="text-right p-t-13 p-b-23">

                    <a href="{{route('show.login')}}" class="txt2">
                        Login
                    </a>
                </div>

                <div class="container-login100-form-btn">
                    <button type="submit" class="login100-form-btn">
                        <i class="fa fa-envelope"></i>&nbsp; Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection