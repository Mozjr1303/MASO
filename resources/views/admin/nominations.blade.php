
@if(Auth::user()->type != 1)
    @php
        header("Location: " . URL::to('/admin/nominees'));
        exit();
    @endphp
@endif

@extends('layouts.admin-layout')

@section('title', 'Maso Awards - Nominations')

@section('main-content')
<div class="main_content_iner ">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="QA_section">
                    <div class="white_box_tittle list_header">
                        <h4>Nominations</h4>
                        <div class="box_right d-flex lms_block">

                            <div class="add_button ms-2">
                                <!-- <a href="add-nominee.php" class="btn_1"><i class="fa fa-plus"></i> Add Nominee</a> -->
                            </div>
                        </div>
                    </div>
                    <div class="QA_table mb_30">
                        <div class="mb-3">
                            <select id="category" class="form-control">
                                <option disabled selected value="">Select Category</option>
                                @foreach($categories as $category)
                                <option value="{{$category->id}}">{{$category->category}}</option>
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

<script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function() {
        const categoryDropdown = document.getElementById('category');
        const resultContainer = document.getElementById('resultContainer');

        categoryDropdown.addEventListener('change', function() {
            const category = categoryDropdown.value;
            if (category !== '') {
                fetch("{{ route('fetch.nominees') }}", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': '{{ csrf_token() }}'
                        },
                        body: JSON.stringify({
                            category: category
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Clear the result container
                        resultContainer.innerHTML = '';

                        // Check if there are nominees
                        if (data.length > 0) {
                            // Loop through the nominees and display them
                            data.forEach(nominee => {
                                const nomineeDiv = document.createElement('div');
                                nomineeDiv.classList.add('nominee');

                                const nomineeName = document.createElement('h5');
                                nomineeName.textContent = decodeURI(nominee.name);

                                const nomineeVotes = document.createElement('p');
                                nomineeVotes.textContent = `Votes: ${nominee.count}`;

                                nomineeDiv.appendChild(nomineeName);
                                nomineeDiv.appendChild(nomineeVotes);

                                resultContainer.appendChild(nomineeDiv);
                            });
                        } else {
                            resultContainer.innerHTML = '<p>No nominees found for this category.</p>';
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        });
    });
</script>
@endsection
@section('active-page')
<script>
    document.querySelector("#sidebar_menu .nominations").classList.add("mm-active");
</script>
@endsection