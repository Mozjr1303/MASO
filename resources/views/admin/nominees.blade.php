@extends('layouts.admin-layout')

@section('title', 'Maso Awards - Nominees')

@section('main-content')
<div class="main_content_iner ">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="QA_section">
                    <div class="white_box_tittle list_header">
                        <h4>Nominees</h4>
                        <div class="box_right d-flex lms_block">

                            <div class="add_button ms-2">
                                <a href="{{route('admin.show.add-nominee')}}" class="btn_1"><i class="fa fa-plus"></i> Add Nominee</a>
                            </div>
                        </div>
                    </div>
                    <div class="QA_table mb_30">
                        <div class="mb-3">
                            <select id="category" class="form-control">
                                <!-- <option disabled selected value="">Select Category</option> -->
                                @foreach ($categories as $category)
                                <option value="{{ $category->id }}">{{ $category->category }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div id="resultContainer"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('active-page')
<script>
    document.querySelector("#sidebar_menu .nominees").classList.add("mm-active");
</script>

<script type="text/javascript">
    $(document).ready(function() {
        function fetchData(category) {
            const apiUrl = "/admin/nominees/fetch/" + category;

            fetch(apiUrl, {
                    method: 'GET',
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // console.log(data)
                    // Create the table HTML
                    let tableHtml = '<table class="table lms_table_active"><thead><tr><th scope="col">Image</th><th scope="col">Name</th><th scope="col">Category</th><th scope="col"></th><th scope="col"></th></tr></thead><tbody>';

                    // Loop through the data and create table rows
                    data.forEach(nominee => {
                        tableHtml += `
                                <tr>
                                    <td><img src="{{ url('frontend/assets/nominees/') }}/${nominee.hiphen}/${nominee.image}" alt="${nominee.name}" style="width: 50px; height: 50px;"></td>
                                    <td>${nominee.name}</td>
                                    <td>${nominee.category}</td>
                                    <td><a href="/admin/nominees/edit/${nominee.id}" class="status_btn bg-primary"><i class="fa fa-pencil-alt"></i></a></td>
                                </tr>
                            `;
                    });

                    // <tr>
                    //     <td><img src="" alt="" style="width: 50px; height: 50px;"></td>
                    //     <td></td>
                    //     <td></td>
                    //     <td><a href="" class="status_btn bg-primary"><i class="fa fa-pencil-alt"></i></a></td>
                    //     <td><a href="/admin/nominees/delete/${nominee.id}" class="status_btn bg-danger" onclick="return confirm('Delete ${nominee.name}?')"><i class="fa fa-trash"></i></a></td>
                    // </tr>

                    tableHtml += '</tbody></table>';

                    // Insert the table HTML into the result container
                    $('#resultContainer').html(tableHtml);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    $('#resultContainer').html('<p>Error fetching data.</p>');
                });
        }

        // Initial fetch on page load
        fetchData($('#category').val());

        // Handle changes in the 'category' dropdown
        $('#category').change(function() {
            fetchData($(this).val());
        });
    });
</script>
@endsection