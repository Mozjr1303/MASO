@if(Auth::user()->type != 1)
    @php
        header("Location: " . URL::to('/admin/nominees'));
        exit();
    @endphp
@endif

@extends('layouts.admin-layout')

@section('title','Maso Awards - Generate Ticket')

@section('main-content')
<div class="main_content_iner ">
    <div class="container-fluid p-0">
        <div class="row justify-content-center">
            <div class="col-lg-12">
                <div class="white_box mb_30">
                    <div class="box_header ">
                        <div class="main-title">
                            <h3 class="mb-0">Generate Ticket</h3>
                        </div>
                    </div>
                    <form action="{{route('admin.generate-ticket')}}" method="POST">
                        @csrf
                        <div class="mb-3">
                            <label class="form-label" for="plant">Full Name</label>
                            <input type="text" name="name" class="form-control" placeholder="Enter Full Name" value="{{old('name')}}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="temp">Mobile</label>
                            <input type="text" name="mobile" class="form-control" placeholder="Enter Mobile Number" value="{{old('mobile')}}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="hum">Ticket Type</label>
                            <select name="ticket_type" class="form-control">
                                <option value="" disabled selected>Select Type</option>
                                <option value="standard">Standard Ticket</option>
                                <option value="vip">VIP Ticket</option>
                                <option value="standard-complimentary">Standard Complimentary</option>
                                <option value="vip-complimentary">VIP Complimentary</option>
                            </select>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="form-btn"><i class="fas fa-ticket-alt"></i> Generate</button>
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