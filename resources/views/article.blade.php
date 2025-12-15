@php
function trimWords($text, $limit) {
    $words = explode(' ', $text);
    if (count($words) > $limit) {
        return implode(' ', array_slice($words, 0, $limit)) . '...';
    }
    return $text;
}

@endphp
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>{{ $article->title }}</title>
  <meta content="{{trimWords($article->details,25)}}" name="description">
  <!-- Icons -->

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Raleway:300,400,500,700,800" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="{{ url('frontend/assets/vendor/aos/aos.css') }}" rel="stylesheet">
  <link href="{{ url('frontend/assets/vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
  <link href="{{ url('frontend/assets/vendor/bootstrap-icons/bootstrap-icons.css') }}" rel="stylesheet">
  <link href="{{ url('frontend/assets/vendor/glightbox/css/glightbox.min.css') }}" rel="stylesheet">
  <link href="{{ url('frontend/assets/vendor/swiper/swiper-bundle.min.css') }}" rel="stylesheet">
  <link href="{{ url('frontend/assets/img/maso.png') }}" rel="icon">

  <!-- Template Main CSS File -->
  <link href="{{ url('frontend/assets/css/style.css') }}" rel="stylesheet">

  <!--og codes-->
  <meta property="og:url" content="https://maso-awards.com/article/{{ $article->id.'/'. strtolower(str_replace(' ','-',$article->title)) }}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="{{ $article->title }}" />
  <meta property="og:image" content="https://maso-awards.live/frontend/assets/articles/{{ $article->image }}" />
  <meta property="og:description" content="{{trimWords($article->details,25)}}" />
</head>

<body>

  <!-- ======= Header ======= -->
  <header id="header" class="d-flex align-items-center ">
    <div class="container-fluid container-xxl d-flex align-items-center">

      <div id="logo" class="me-auto">
        <a href="{{ url('/') }}" class="scrollto"><img src="{{ url('frontend/assets/img/maso-icon.png') }}" alt="Logo" title=""></a>
      </div>

      <nav id="navbar" class="navbar order-last order-lg-0">
        <ul>
          <li><a class="nav-link scrollto" href="{{ url('/home') }}#hero">Home</a></li>
          <li><a class="nav-link scrollto" href="{{ url('/home') }}#about">About</a></li>
          <li><a class="nav-link scrollto active" href="{{ url('/home') }}#hotels">News</a></li>
          <li><a class="nav-link scrollto" href="{{ url('/home') }}#schedule">Calender</a></li>
          <li><a class="nav-link scrollto" href="{{ url('/home') }}#venue">Venue</a></li>
          <li><a class="nav-link scrollto" href="{{ url('/home') }}#gallery">Gallery</a></li>
          <li><a class="nav-link scrollto" href="{{ url('/home') }}#supporters">Sponsors</a></li>
          <li><a class="nav-link scrollto" href="{{ url('/home') }}#contact">Contact</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->
      <a class="buy-tickets scrollto" href="/buy-ticket">Buy Ticket</a>

    </div>
  </header><!-- End Header -->

  <!-- ======= Hero Section ======= -->
  <div class="container text-container-1" id="hero-1">
    <div class="row" id="news-read">
      <!-- ======= News Section ======= -->
      <div class="col-sm-12">
        <img src="{{ url('frontend/assets/articles/' . $article->image) }}" alt="">
      </div>
      <div class="col-sm-12">
        <h3>{{ $article->title }}</h3>
        <p class="px-4">{!! nl2br(e($article->details)) !!}</p>
      </div>
    </div><!-- End News Section -->
  </div>

  </div><!-- End Hero Section -->
  <!-- <div class="gradient-bg-1"></div> -->


  <!-- ======= Footer ======= -->
  <footer id="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i class="bi bi-chevron-right"></i> <a href="#">About Us</a></li>
              <li><i class="bi bi-chevron-right"></i> <a href="#hotels">News</a></li>
              <li><i class="bi bi-chevron-right"></i> <a href="#">Nominate</a></li>
              <li><i class="bi bi-chevron-right"></i> <a href="#">Vote</a></li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-6 footer-info">
            <img src="{{ url('frontend/assets/img/maso.png') }}" alt="TheEvenet">
          </div>

          <div class="col-lg-4 col-md-6 footer-contact">
            <h4>Contact Us</h4>
            <p>
              Chichiri<br>
              Blantyre<br>
              Malawi <br>
              <strong>Phone:</strong> +265 884 08 59 95<br>
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

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
  <!-- Gradients -->
  <div class="gradient-top"></div>
  <div class="gradient-bottom"></div>

  <!-- Vendor JS Files -->
  <script src="{{ url('frontend/assets/vendor/aos/aos.js') }}"></script>
  <script src="{{ url('frontend/assets/vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
  <script src="{{ url('frontend/assets/vendor/glightbox/js/glightbox.min.js') }}"></script>
  <script src="{{ url('frontend/assets/vendor/swiper/swiper-bundle.min.js') }}"></script>
  <script src="{{ url('frontend/assets/vendor/php-email-form/validate.js') }}"></script>

  <!-- Template Main JS File -->
  <script src="{{ url('frontend/js/all.min.js') }}"></script>
  <script src="{{ url('frontend/assets/js/main.js') }}"></script>
</body>

</html>