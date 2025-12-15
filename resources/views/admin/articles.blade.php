@extends('layouts.admin-layout')

@section('title', 'Maso Awards - Articles')

@section('main-content')
    <div class="main_content_iner ">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-12">
                    <div class="QA_section">
                        <div class="white_box_tittle list_header">
                            <h4>Articles</h4>
                            <div class="box_right d-flex lms_block">
                                <div class="add_button ms-2">
                                    <a href="{{ route('admin.show.add-article') }}" class="btn_1"><i class="fa fa-plus"></i>
                                        Add Article</a>
                                </div>
                            </div>
                        </div>
                        <div class="QA_table mb_30">

                            <table class="table lms_table_active">
                                <thead>
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Date</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($articles as $article)
                                        <tr>
                                            <td><img src="{{ asset('frontend/assets/articles/' . $article->image) }}"
                                                    style="max-height: 50px;"></td>
                                            <td>{{ $article->title }}</td>
                                            <td>{{ date('d M Y', strtotime($article->created_at)) }}</td>
                                            <td>
                                                <a href="{{ route('admin.show.edit-article', ['id' => $article->id]) }}"
                                                    class="status_btn bg-primary">
                                                    <i class="fa fa-pencil-alt"></i>
                                                </a>
                                            </td>
                                            <td>
                                                <a href="{{ route('admin.delete-article', $article->id) }}"
                                                    class="status_btn bg-danger"
                                                    onclick="return confirm('Delete {{ $article->title }}?')">
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
        document.querySelector("#sidebar_menu .articles").classList.add("mm-active");
    </script>
@endsection
