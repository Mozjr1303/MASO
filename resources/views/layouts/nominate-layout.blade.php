<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ url('frontend/css/icomoon/style.css') }}">
    <link rel="stylesheet" href="{{ url('frontend/css/main.css') }}">
    <link rel="stylesheet" href="{{ url('frontend/css/animate.css') }}" type="text/css">

    <!-- Vendor CSS Files -->
    <link href="{{ url('frontend/assets/vendor/aos/aos.css') }}" rel="stylesheet">
    <link href="{{ url('frontend/assets/vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ url('frontend/assets/vendor/bootstrap-icons/bootstrap-icons.css') }}" rel="stylesheet">
    <link href="{{ url('frontend/assets/vendor/glightbox/css/glightbox.min.css') }}" rel="stylesheet">
    <link href="{{ url('frontend/assets/vendor/swiper/swiper-bundle.min.css') }}" rel="stylesheet">
    <link rel="icon" type="image/png" href="{{ url('frontend/assets/img/maso.png') }}">

    <link href="{{ url('frontend/assets/css/style.css?') }}" rel="stylesheet">

    <script src="{{ url('frontend/js/countdown.js') }}"></script>
    <script type='text/javascript' src='//platform-api.sharethis.com/js/sharethis.js#property=5b67c4f0f3815e0011ed2735&product=inline-share-buttons' async='async'></script>

    <!-- Notyf -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
    <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>

    <title>@yield('title')</title>

    <!--og codes-->
    @yield('og-tags')

</head>

<body>
    <!-- ======= Header ======= -->
    <header id="header" class="d-flex align-items-center ">
        <div class="container-fluid container-xxl d-flex align-items-center">

            <div id="logo" class="me-auto">
                <a href="home" class="scrollto"><img src="{{ url('frontend/assets/img/maso-icon.png') }}" alt="Logo" title=""></a>
            </div>

            <nav id="navbar" class="navbar order-last order-lg-0">
                <ul>
                    <li><a class="nav-link scrollto" href="/home">Home</a></li>
                    <li><a class="nav-link scrollto active" href="/nominate">Categories</a></li>
                    <li><a class="nav-link scrollto" href="/home#hotels">News</a></li>
                    <li><a class="nav-link scrollto" href="/home#schedule">Calendar</a></li>
                    <li><a class="nav-link scrollto" href="/home#venue">Venue</a></li>
                    <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
                </ul>
                <i class="bi bi-list mobile-nav-toggle"></i>
            </nav><!-- .navbar -->
            <a class="buy-tickets scrollto" href="{{ route('show.buy-ticket') }}">Buy Ticket</a>
            <!-- <a class="buy-tickets scrollto" href="donate">Donate</a> -->
            <!-- <a class="buy-tickets scrollto" href="nominate">Nominate</a> -->
            <!-- <a class="buy-tickets scrollto" href="vote">Vote</a> -->

        </div>
    </header><!-- End Header -->

    <div class="vote">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12 head-container">
                    <img src="{{ url('frontend/assets/img/maso.png')}}" class="wow flip" data-wow-duration="0.5s" data-wow-delay="0.1s">
                    <div id="timer" class="wow flipInY" data-wow-duration="0.5s" data-wow-delay="1s"></div>
                </div>
            </div>
            @yield('content')
        </div>
    </div>

    <!-- ======= Footer ======= -->
    <footer id="footer">
        <div class="footer-top">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-4 col-md-6 footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                            <li><i class="bi bi-chevron-right"></i> <a href="home#about">About Us</a></li>
                            <li><i class="bi bi-chevron-right"></i> <a href="home#hotels">News</a></li>
                            <li><i class="bi bi-chevron-right"></i> <a href="nominate">Nominate</a></li>
                            <li><i class="bi bi-chevron-right"></i> <a href="#">Vote</a></li>
                        </ul>
                    </div>

                    <div class="col-lg-4 col-md-6 footer-info">
                        <img src="{{ url('frontend/assets/img/maso.png')}}" alt="Logo">
                    </div>

                    <div class="col-lg-4 col-md-6 footer-contact">
                        <h4>Contact Us</h4>
                        <p>
                            Chichiri<br>
                            Blantyre<br>
                            Malawi <br>
                            <strong>Phone:</strong> +265 884 08 59 95 / +265 998 41 24 21<br>
                            <strong>Email:</strong> info@maso-awards.live<br>
                        </p>

                        <div class="social-links">
                            <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                            <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                            <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                            <a href="#" class="google-plus"><i class="bi bi-instagram"></i></a>
                            <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="copyright">
                &copy; Copyright <strong>MASO Awards</strong>. All Rights Reserved
            </div>
        </div>
    </footer><!-- End  Footer -->
    <!-- ATTACH COUNTDOWN TIMER -->
    <script>
        window.addEventListener("load", function() {
            // 27 days = 27 X 24 X 60 X 60 = 2419200 secs
            counter.init("timer", <?= $remainingTime ?>);
        });
    </script>
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

    <!-- Gradients -->
    <div class="gradient-top"></div>
    <div class="gradient-bottom"></div>

    <!-- Vendor JS Files -->
    <script src="{{ url('frontend/assets/vendor/aos/aos.js') }}"></script>
    <script src="{{ url('frontend/assets/vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ url('frontend/assets/vendor/glightbox/js/glightbox.min.js') }}"></script>
    <script src="{{ url('frontend/assets/vendor/swiper/swiper-bundle.min.js') }}"></script>
    <script src="{{ url('frontend/js/autoComplete.js') }}"></script>
    @yield('nominate-js')
    @yield('ticket-js')
    
    <!-- Template Main JS File -->
    <script src="{{ url('frontend/js/all.min.js') }}"></script>
    <script src="{{ url('frontend/assets/js/main.js') }}"></script>

    <!-- Wow -->
    <script src="{{ url('frontend/js/wow.min.js') }}"></script>
    <script src="{{ url('frontend/js/jquery-3.3.1.min.js') }}"></script>

    <script type="text/javascript">
        new WOW().init();
    </script>

    @yield('autocomplete-js')
    @yield('category-js')

    <script>
        const notyf = new Notyf({
            duration: 5000,
            dismissible: true,
            position: {
                x: 'right',
                y: 'top'
            }
        });
    </script>

    @if(@session('success'))
    <script>
        notyf.success("{{ session('success') }}");
    </script>
    @elseif(@session('error'))
    <script>
        notyf.error("{{ session('error') }}");
    </script>
    @endif

    @if ($errors->any())
    @foreach ($errors->all() as $error)
    <script>
        notyf.error("{{ $error }}");
    </script>
    @endforeach
    @endif
</body>

</html>