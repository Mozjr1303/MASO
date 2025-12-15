@extends('layouts.login-layout')

@section('title','Maso Awards - Login')

@section('content')
    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100">
                <form class="login100-form validate-form p-l-55 p-r-55 p-t-178" action="{{ route('login') }}"
                    method="POST">
                    @csrf
                    <span class="login100-form-title">
                        Sign In
                    </span>

                    <div class="wrap-input100 m-b-16" data-validate="Please enter email">
                        <input class="input100" type="email" name="email" placeholder="Email"
                            value="{{ old('email') }}">
                        <span class="focus-input100"></span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate = "Please enter password">
                        <input class="input100" type="password" name="password" placeholder="Password">
                        <span class="focus-input100"></span>
                    </div>

                    <div class="text-right p-t-13 p-b-23">
                        <span class="txt1">
                            Forgot
                        </span>

                        <a href="{{url('/forgot-password')}}" class="txt2">
                            Password?
                        </a>
                    </div>

                    <div class="container-login100-form-btn">
                        <button type="submit" class="login100-form-btn">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @endsection
