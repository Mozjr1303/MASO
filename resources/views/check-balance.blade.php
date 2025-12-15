@extends('layouts.vote-layout')

@section('title', 'Maso Awards - Check Balance')

@section('og-tags')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta property="og:url" content="https://www.maso-awards.com/vote/check-balance/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="View Balance" />
    <meta property="og:image" content="https://maso-awards.live/frontend/assets/img/maso-og.jpg" />
    <meta property="og:description" content="Check Now" />
@endsection

@section('content')
    <form action="/vote/process-deposit" method="POST" class="per-nominee">
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-sm-9 col-md-8 col-lg-5 wow fadeInUp" data-wow-duration="1.5s" data-wow-delay="0.5s">

                <input type="text" id="nominee_id" name="id" placeholder="Nominee ID" value="" required>

                <button type="submit" class="fancy-button">Check</button>

                <div class="balance-result" style="display: none">
                    <p class="text-center mt-2">Your balance for <strong id="nominee-name"></strong> is: <strong
                            id="balance-amount"></strong>
                    </p>
                </div>
                <div class="loader-container">
                    <div class="loader-content">
                        <div class="loader"></div>
                        <h6></h6>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <script>
        var form = document.querySelector('.per-nominee');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            var nominee_id = document.getElementById('nominee_id').value;

            var formData = new FormData();
            formData.append('id', nominee_id);
            formData.append('_token', csrfToken);

            function loader(message, boolean) {
                const loaderContainer = document.querySelector('.loader-content');
                const loaderContent = document.querySelector('.loader-content h6');

                if (boolean) {
                    loaderContent.textContent = message;
                    loaderContainer.style.display = 'flex';
                } else {
                    loaderContainer.style.display = 'none';
                }
            }
            console.log('Form Data:', nominee_id);
            loader('Please wait...', true);

            fetch('/api/check-balance', {
                    method: 'POST',
                    body: formData,
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    loader('', false); // Hide loader
                    // console.log(data);

                    if (data.status === 'success') {
                        document.querySelector('.balance-result').style.display = 'block';
                        document.getElementById('balance-amount').innerText = 'MK ' + data.balance;
                        document.getElementById('nominee-name').innerText = data.name;
                        notyf.success(data.message);
                    } else {
                        notyf.error(data.message);
                        loader('', false);
                    }
                })
                .catch(error => {
                    loader('', false); // Hide loader
                    console.error('Error:', error);
                    notyf.error('An error occurred while processing your request.');
                });
        });


        function loader(message, show) {
            var loaderContainer = document.querySelector('.loader-container');
            var loaderContent = document.querySelector('.loader-content h6');

            if (show) {
                loaderContainer.style.display = 'flex';
                loaderContent.innerText = message;
            } else {
                loaderContainer.style.display = 'none';
                loaderContent.innerText = '';
            }
        }
    </script>
@endsection
