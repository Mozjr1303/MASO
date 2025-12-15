<!DOCTYPE html>
<html lang="en" class="no-js">

<head>

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <title>@yield('title')</title>
    <link rel="icon" href="{{ url('frontend/assets/img/maso.png') }}" type="image/png">
    <link rel="stylesheet" href="{{ url('frontend/admin/css/bootstrap1.min.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/vendors/themefy_icon/themify-icons.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/vendors/swiper_slider/css/swiper.min.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/vendors/select2/css/select2.min.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/vendors/niceselect/css/nice-select.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/vendors/owl_carousel/css/owl.carousel.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/vendors/gijgo/gijgo.min.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/vendors/font_awesome/css/all.min.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/vendors/tagsinput/tagsinput.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/vendors/datatable/css/jquery.dataTables.min.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/vendors/datatable/css/responsive.dataTables.min.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/vendors/datatable/css/buttons.dataTables.min.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/vendors/text_editor/summernote-bs4.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/vendors/morris/morris.css') }}">
    <link rel="stylesheet" href="{{ url('frontend/admin/vendors/material_icon/material-icons.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/css/metisMenu.css') }}">
    <link rel="stylesheet" href="{{ url('frontend/admin/css/style1.css?v=1') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/css/colors/default.css') }}" id="colorSkinCSS">
    <link rel="stylesheet" href="{{ url('frontend/admin/css/component.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/css/normalize.css') }}" />
    <link rel="stylesheet" href="{{ url('frontend/admin/css/scanner.css') }}" />

    <script src="{{ url('frontend/admin/js/sweetalert.min.js') }}"></script>
    <script src="{{ url('frontend/admin/js/chart.min.3.5.1.js') }}"></script>

    <script src="{{ url('frontend/admin/vendors/html5-qrcode/html5-qrcode.min.js') }}"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
    <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>
    <!--[if IE]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!-- remove this if you use Modernizr -->
    <script>
        (function(e, t, n) {
            var r = e.querySelectorAll("html")[0];
            r.className = r.className.replace(/(^|\s)no-js(\s|$)/, "$1js$2")
        })(document, window, 0);
    </script>

    <style>

    </style>
</head>

<body class="crm_body_bg">
    <nav class="sidebar">
        <div class="logo d-flex justify-content-center">
            <a href="{{ route('admin.dashboard') }}"><img src="{{ url('frontend/assets/img/maso-icon-black.png') }}"
                    alt></a>
            <div class="sidebar_close_icon d-lg-none">
                <i class="ti-close"></i>
            </div>
        </div>
        @auth
            <ul id="sidebar_menu">
                @if (Auth::user()->type == 1)
                    <li class="dashboard">
                        <a class="" href="{{ route('admin.dashboard') }}" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="fill:#8c8c8c;">
                                <path
                                    d="M288 32C128.94 32 0 160.94 0 320c0 52.8 14.25 102.26 39.06 144.8 5.61 9.62 16.3 15.2 27.44 15.2h443c11.14 0 21.83-5.58 27.44-15.2C561.75 422.26 576 372.8 576 320c0-159.06-128.94-288-288-288zm0 64c14.71 0 26.58 10.13 30.32 23.65-1.11 2.26-2.64 4.23-3.45 6.67l-9.22 27.67c-5.13 3.49-10.97 6.01-17.64 6.01-17.67 0-32-14.33-32-32S270.33 96 288 96zM96 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm48-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm246.77-72.41l-61.33 184C343.13 347.33 352 364.54 352 384c0 11.72-3.38 22.55-8.88 32H232.88c-5.5-9.45-8.88-20.28-8.88-32 0-33.94 26.5-61.43 59.9-63.59l61.34-184.01c4.17-12.56 17.73-19.45 30.36-15.17 12.57 4.19 19.35 17.79 15.17 30.36zm14.66 57.2l15.52-46.55c3.47-1.29 7.13-2.23 11.05-2.23 17.67 0 32 14.33 32 32s-14.33 32-32 32c-11.38-.01-20.89-6.28-26.57-15.22zM480 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z" />
                            </svg>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li class="nominations">
                        <a class="" href="{{ route('admin.nominations') }}" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="fill:#8c8c8c;">
                                <path
                                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                            </svg>
                            <span>Nominations</span>
                        </a>
                    </li>
                    <li class="votes">
                        <a class="" href="{{ route('admin.votes') }}" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="fill:#8c8c8c;">
                                <path
                                    d="M608 320h-64v64h22.4c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8H96v-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h576c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32zm-96 64V64.3c0-17.9-14.5-32.3-32.3-32.3H160.4C142.5 32 128 46.5 128 64.3V384h384zM211.2 202l25.5-25.3c4.2-4.2 11-4.2 15.2.1l41.3 41.6 95.2-94.4c4.2-4.2 11-4.2 15.2.1l25.3 25.5c4.2 4.2 4.2 11-.1 15.2L300.5 292c-4.2 4.2-11 4.2-15.2-.1l-74.1-74.7c-4.3-4.2-4.2-11 0-15.2z" />
                            </svg>
                            <span>Votes</span>
                        </a>
                    </li>
                    <li class="nominees">
                        <a class="" href="{{ route('admin.nominees') }}" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style="fill:#8c8c8c;">
                                <path
                                    d="M97.12 362.63c-8.69-8.69-4.16-6.24-25.12-11.85-9.51-2.55-17.87-7.45-25.43-13.32L1.2 448.7c-4.39 10.77 3.81 22.47 15.43 22.03l52.69-2.01L105.56 507c8 8.44 22.04 5.81 26.43-4.96l52.05-127.62c-10.84 6.04-22.87 9.58-35.31 9.58-19.5 0-37.82-7.59-51.61-21.37zM382.8 448.7l-45.37-111.24c-7.56 5.88-15.92 10.77-25.43 13.32-21.07 5.64-16.45 3.18-25.12 11.85-13.79 13.78-32.12 21.37-51.62 21.37-12.44 0-24.47-3.55-35.31-9.58L252 502.04c4.39 10.77 18.44 13.4 26.43 4.96l36.25-38.28 52.69 2.01c11.62.44 19.82-11.27 15.43-22.03zM263 340c15.28-15.55 17.03-14.21 38.79-20.14 13.89-3.79 24.75-14.84 28.47-28.98 7.48-28.4 5.54-24.97 25.95-45.75 10.17-10.35 14.14-25.44 10.42-39.58-7.47-28.38-7.48-24.42 0-52.83 3.72-14.14-.25-29.23-10.42-39.58-20.41-20.78-18.47-17.36-25.95-45.75-3.72-14.14-14.58-25.19-28.47-28.98-27.88-7.61-24.52-5.62-44.95-26.41-10.17-10.35-25-14.4-38.89-10.61-27.87 7.6-23.98 7.61-51.9 0-13.89-3.79-28.72.25-38.89 10.61-20.41 20.78-17.05 18.8-44.94 26.41-13.89 3.79-24.75 14.84-28.47 28.98-7.47 28.39-5.54 24.97-25.95 45.75-10.17 10.35-14.15 25.44-10.42 39.58 7.47 28.36 7.48 24.4 0 52.82-3.72 14.14.25 29.23 10.42 39.59 20.41 20.78 18.47 17.35 25.95 45.75 3.72 14.14 14.58 25.19 28.47 28.98C104.6 325.96 106.27 325 121 340c13.23 13.47 33.84 15.88 49.74 5.82a39.676 39.676 0 0 1 42.53 0c15.89 10.06 36.5 7.65 49.73-5.82zM97.66 175.96c0-53.03 42.24-96.02 94.34-96.02s94.34 42.99 94.34 96.02-42.24 96.02-94.34 96.02-94.34-42.99-94.34-96.02z" />
                            </svg>
                            <span>Nominees</span>
                        </a>
                    </li>
                    <li class="articles">
                        <a class="" href="{{ route('admin.articles') }}" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="fill:#8c8c8c;">
                                <path
                                    d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z" />
                            </svg>
                            <span>Articles</span>
                        </a>
                    </li>
                    <li class="sponsors">
                        <a class="" href="{{ route('admin.sponsors') }}" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="fill:#8c8c8c;">
                                <path
                                    d="M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z" />
                            </svg>
                            <span>Sponsors</span>
                        </a>
                    </li>
                @endif

                <li class="scan">
                    <a class="" href="{{ route('admin.show.scan-tickets') }}" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="fill:#8c8c8c;">
                            <path
                                d="M0 224h192V32H0v192zM64 96h64v64H64V96zm192-64v192h192V32H256zm128 128h-64V96h64v64zM0 480h192V288H0v192zm64-128h64v64H64v-64zm352-64h32v128h-96v-32h-32v96h-64V288h96v32h64v-32zm0 160h32v32h-32v-32zm-64 0h32v32h-32v-32z" />
                        </svg>
                        <span>Scan</span>
                    </a>
                </li>

                @if (Auth::user()->type == 1)
                    <li class="tickets">
                        <a class="" href="{{ route('admin.tickets') }}" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="fill:#8c8c8c;">
                                <path
                                    d="M128 160h320v192H128V160zm400 96c0 26.51 21.49 48 48 48v96c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-96c26.51 0 48-21.49 48-48s-21.49-48-48-48v-96c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v96c-26.51 0-48 21.49-48 48zm-48-104c0-13.255-10.745-24-24-24H120c-13.255 0-24 10.745-24 24v208c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V152z" />
                            </svg>
                            <span>Tickets</span>
                        </a>
                    </li>
                    <li class="users">
                        <a class="" href="{{ route('users') }}" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="fill:#8c8c8c;">
                                <path
                                    d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" />
                            </svg>
                            <span>Users</span>
                        </a>
                    </li>
                @endif
            </ul>
        @endauth
    </nav>

    <section class="main_content dashboard_part">

        <div class="container-fluid g-0">
            <div class="row">
                <div class="col-lg-12 p-0">
                    <div class="header_iner d-flex justify-content-between align-items-center">
                        <div class="sidebar_icon d-lg-none">
                            <i class="ti-menu"></i>
                        </div>
                        <div class="serach_field-area"></div>
                        <div class="header_right d-flex justify-content-between align-items-center">
                            <div class="profile_info">
                                <img src="{{ url('frontend/admin/img/avatar.png') }}" alt="Avatar">
                                <div class="profile_info_iner">
                                    <p>{{ Auth::user()->email }}</p>
                                    <h5>{{ Auth::user()->name }}</h5>
                                    <div class="profile_info_details">
                                        <a href="#">My Profile <i class="ti-user"></i></a>
                                        <a href="{{ route('logout') }}">Log Out <i class="ti-shift-left"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        @yield('main-content')

        <div class="footer_part">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="footer_iner text-center">
                            <p>© Maso Awards {{ date('Y') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="{{ url('frontend/admin/js/jquery1-3.4.1.min.js') }}"></script>
    <script src="{{ url('frontend/admin/js/custom-file-input.js') }}"></script>
    <script src="{{ url('frontend/admin/js/popper1.min.js') }}"></script>
    <script src="{{ url('frontend/admin/js/bootstrap1.min.js') }}"></script>
    <script src="{{ url('frontend/admin/js/metisMenu.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/count_up/jquery.waypoints.min.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/count_up/jquery.counterup.min.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/swiper_slider/js/swiper.min.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/niceselect/js/jquery.nice-select.min.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/owl_carousel/js/owl.carousel.min.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/gijgo/gijgo.min.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/datatable/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/datatable/js/dataTables.responsive.min.js') }}"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.dataTables.min.css">
    <script src="https://cdn.datatables.net/responsive/2.5.0/js/dataTables.responsive.min.js"></script>

    <script src="{{ url('frontend/admin/vendors/datatable/js/dataTables.buttons.min.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/datatable/js/buttons.flash.min.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/datatable/js/jszip.min.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/datatable/js/pdfmake.min.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/datatable/js/vfs_fonts.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/datatable/js/buttons.html5.min.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/datatable/js/buttons.print.min.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/progressbar/jquery.barfiller.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/tagsinput/tagsinput.js') }}"></script>
    <script src="{{ url('frontend/admin/vendors/text_editor/summernote-bs4.js') }}"></script>
    <script src="{{ url('frontend/admin/js/custom.js') }}"></script>
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

    @yield('active-page')

    @if ($errors->any())
        @foreach ($errors->all() as $error)
            <script>
                notyf.error("{{ $error }}");
            </script>
        @endforeach
    @endif

    @if (@session('success'))
        <script>
            notyf.success("{{ session('success') }}");
        </script>
    @elseif(@session('error'))
        <script>
            notyf.error("{{ session('error') }}");
        </script>
    @endif
</body>

</html>
