<!DOCTYPE html>
<html lang="en">

<head>
    <title>@yield('title')</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--===============================================================================================-->
    <link rel="icon" type="image/png" href="{{ url('frontend/assets/img/maso.png') }}" />
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{ url('frontend/login/vendor/bootstrap/css/bootstrap.min.css') }}">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css"
        href="{{ url('frontend/login/fonts/font-awesome-4.7.0/css/font-awesome.min.css') }}">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{ url('frontend/login/vendor/animate/animate.css') }}">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{ url('frontend/login/vendor/css-hamburgers/hamburgers.min.css') }}">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{ url('frontend/login/vendor/animsition/css/animsition.min.css') }}">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{ url('frontend/login/vendor/select2/select2.min.css') }}">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css"
        href="{{ url('frontend/login/vendor/daterangepicker/daterangepicker.css') }}">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="{{ url('frontend/login/css/util.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ url('frontend/login/css/main.css') }}">
    <!--===============================================================================================-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
    <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>
    <!--===============================================================================================-->

    <!--og codes-->
    <meta property="og:url" content="https://maso-awards.com/login" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Maso Awards {{ date('Y') }}" />
    <meta property="og:image" content="https://maso-awards.live/frontend/assets/img/maso-og.jpg" />
    <meta property="og:description" content="Admin Login" />
</head>

<body>

    @yield('content')

    <!--===============================================================================================-->
    <script src="{{ url('frontend/login/vendor/jquery/jquery-3.2.1.min.js') }}"></script>
    <!--===============================================================================================-->
    <script src="{{ url('frontend/login/vendor/animsition/js/animsition.min.js') }}"></script>
    <!--===============================================================================================-->
    <script src="{{ url('frontend/login/vendor/bootstrap/js/popper.js') }}"></script>
    <script src="{{ url('frontend/login/vendor/bootstrap/js/bootstrap.min.js') }}"></script>
    <!--===============================================================================================-->
    <script src="{{ url('frontend/login/vendor/select2/select2.min.js') }}"></script>
    <!--===============================================================================================-->
    <script src="{{ url('frontend/login/vendor/daterangepicker/moment.min.js') }}"></script>
    <script src="{{ url('frontend/login/vendor/daterangepicker/daterangepicker.js') }}"></script>
    <!--===============================================================================================-->
    <script src="{{ url('frontend/login/vendor/countdowntime/countdowntime.js') }}"></script>
    <!--===============================================================================================-->
    <script src="{{ url('frontend/login/js/main.js') }}"></script>
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

    @if ($errors->any())
    @foreach ($errors->all() as $error)
    <script>
        notyf.error("{{ $error }}");
    </script>
    @endforeach
    @endif

    @if(@session('success'))
    <script>
        notyf.success("{{ session('success') }}");
    </script>
    @endif
</body>

</html>