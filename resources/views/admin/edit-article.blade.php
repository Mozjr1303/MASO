@if (Auth::user()->type != 1)
    @php
        header('Location: ' . URL::to('/admin/nominees'));
        exit();
    @endphp
@endif

@extends('layouts.admin-layout')

@section('title', 'Maso Awards - Edit Article')

@section('main-content')
    <div class="main_content_iner ">
        <div class="container-fluid p-0">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="white_box mb_30">
                        <div class="box_header ">
                            <div class="main-title">
                                <h3 class="mb-0">Add Article</h3>
                            </div>
                        </div>
                        <form action="{{ route('admin.edit-article',['id'=>$article->id]) }}" method="POST">
                            @csrf
                            <div class="mb-3">
                                <label class="form-label" for="title">Title</label>
                                <input type="text" name="title" id="title" class="form-control" placeholder="Enter Article Title"
                                    value="{{ $article->title }}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="details">Article Details</label>
                                <textarea name="details" id="details" cols="30" rows="10" class="form-control" placeholder="Enter Article Details">{{ $article->details}}</textarea>
                            </div>
                            <div class="d-flex justify-content-center">
                                <button type="submit" class="form-btn"><i class="fa fa-newspaper"></i> Update</button>
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
        document.querySelector("#sidebar_menu .articles").classList.add("mm-active");
    </script>
@endsection
