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

    <script src="{{ url('frontend/admin/js/sweetalert.min.js') }}"></script>
    <script src="{{ url('frontend/admin/js/chart.min.3.5.1.js') }}"></script>

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
                <li class="tickets">
                    <a class="" href="{{ route('admin.roots') }}" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="fill:#8c8c8c;">
                            <path
                                d="M128 160h320v192H128V160zm400 96c0 26.51 21.49 48 48 48v96c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-96c26.51 0 48-21.49 48-48s-21.49-48-48-48v-96c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v96c-26.51 0-48 21.49-48 48zm-48-104c0-13.255-10.745-24-24-24H120c-13.255 0-24 10.745-24 24v208c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V152z" />
                        </svg>
                        <span>Tickets</span>
                    </a>
                </li>
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
