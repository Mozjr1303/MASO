@extends('layouts.admin-layout')

@section('title', 'Maso Awards - Sponsors')

@section('main-content')
<div class="main_content_iner ">
    <div class="container-fluid p-0">
        <div class="row justify-content-center">
            <div class="col-lg-12">
                <div class="white_box mb_30">
                    <div class="box_header ">
                        <div class="main-title">
                            <h3 class="mb-0">Add Sponsor</h3>
                        </div>
                    </div>

                    <form action="{{ route('admin.add-sponsor') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="mb-3">
                            <input type="file" name="image" id="file-2" class="inputfile inputfile-2" data-multiple-caption="{count} files selected" required />
                            <label for="file-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                                    <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                                </svg> <span>Sponsor Photo</span>
                            </label>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="plant">Sponsor Name</label>
                            <input type="text" name="name" class="form-control" placeholder="Name of sponsor" value="<?php echo isset($_SESSION['fname']) ? $_SESSION['fname'] : ''; ?>" required>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" name="submit" class="form-btn"><i class="fa fa-user"></i> Upload</button>
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
    document.querySelector("#sidebar_menu .sponsors").classList.add("mm-active");
</script>
@endsection