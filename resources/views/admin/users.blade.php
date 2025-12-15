
@if(Auth::user()->type != 1)
    @php
        header("Location: " . URL::to('/admin/nominees'));
        exit();
    @endphp
@endif

@extends('layouts.admin-layout')

@section('title', 'Maso Awards - Users')

@section('main-content')
<div class="main_content_iner ">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="QA_section">
                    <div class="white_box_tittle list_header">
                        <h4>Users</h4>
                        <div class="box_right d-flex lms_block">
                            <div class="add_button ms-2">
                                <a href="{{route('add-user')}}" class="btn_1"><i class="fa fa-plus"></i> Add User</a>
                            </div>
                        </div>
                    </div>
                    <div class="QA_table mb_30">

                        <table class="table lms_table_active">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Type</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($users as $user)
                                <tr>
                                    <td>{{ $user->name }}</td>
                                    <td>{{ $user->email }}</td>

                                    @if($user->type == 0)
                                    <td>
                                        <i class="fas fa-user"></i>
                                    </td>
                                    @else
                                    <td>
                                        <i class="fas fa-crown"></i>
                                    </td>
                                    @endif
                                    <td>
                                        <a href="{{ route('show.edit-user', ['id' => $user->id]) }}"
                                            class="status_btn bg-primary">
                                            <i class="fa fa-pencil-alt"></i>
                                        </a>
                                    </td>
                                    <td><a href="{{ route('delete-user', ['id' => $user->id]) }}"
                                            class="status_btn bg-danger"
                                            onclick="return confirm('Delete {{ $user->name }}')"><i
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
    document.querySelector("#sidebar_menu .users").classList.add("mm-active");
</script>
@endsection