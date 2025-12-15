@if (Auth::user()->type != 1)
    @php
        header('Location: ' . URL::to('/admin/nominees'));
        exit();
    @endphp
@endif

@extends('layouts.admin-layout')

@section('title', 'Maso Awards - Votes')

@section('main-content')
    <div class="main_content_iner ">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-12">
                    <div class="QA_section">
                        <div class="QA_table mb_30">
                            <div id="results-container"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        async function loadResults() {
            const container = document.getElementById('results-container');

            try {
                const response = await fetch('{{ route('api.retrieve.vote-data') }}');
                const data = await response.json();

                // console.log(data);
                data.forEach(category => {
                    const totalVotes = category.totalVotes;
                    // Category container
                    const catDiv = document.createElement('div');
                    catDiv.classList.add('category-container');

                    // Category title
                    const catTitle = document.createElement('h4');
                    catTitle.textContent = category.category;
                    catDiv.appendChild(catTitle);
                    catDiv.appendChild(document.createElement('hr'));

                    const directory = category.directory;
                    // Loop through nominees
                    category.nominees.forEach(nominee => {
                        const percentage = totalVotes > 0 ? ((nominee.votes / totalVotes) * 100)
                            .toFixed(1) : 0;

                        const nomineeDiv = document.createElement('div');
                        nomineeDiv.classList.add('nominee-card');

                        nomineeDiv.innerHTML = `
              <img src="${directory}/${nominee.image}" alt="${nominee.name}">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between">
                  <strong>${nominee.name}</strong>
                  <small>${nominee.votes} votes (${percentage}%)</small>
                </div>
                <div class="progress" style="height: 13px;">
                  <div class="progress-bar" role="progressbar" style="width: ${percentage}%;" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            `;

                        catDiv.appendChild(nomineeDiv);
                    });

                    container.appendChild(catDiv);
                });

            } catch (error) {
                container.innerHTML = `<div class="alert alert-danger">Error loading results.</div>`;
                console.error(error);
            }
        }

        window.onload = loadResults;

    </script>
@endsection
@section('active-page')
    <script>
        document.querySelector("#sidebar_menu .votes").classList.add("mm-active");
    </script>
@endsection
