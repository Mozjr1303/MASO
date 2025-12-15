<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Maso Awards</title>
  <meta content="Be part of the biggest music and arts awards show in Malawi" name="description">
  <meta content="" name="keywords">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Raleway:300,400,500,700,800" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="{{ url('frontend/assets/vendor/aos/aos.css') }}" rel="stylesheet">
  <link href="{{ url('frontend/assets/vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
  <link href="{{ url('frontend/assets/vendor/bootstrap-icons/bootstrap-icons.css') }}" rel="stylesheet">
  <link href="{{ url('frontend/assets/vendor/glightbox/css/glightbox.min.css') }}" rel="stylesheet">
  <link href="{{ url('frontend/assets/vendor/swiper/swiper-bundle.min.css') }}" rel="stylesheet">
  <link rel="icon" type="image/png" href="{{ url('frontend/assets/img/maso.png') }}">

  <!-- Template Main CSS File -->
  <link href="{{ url('frontend/assets/css/style.css?v=1') }}" rel="stylesheet">

  <!-- Sweet Alert -->
  <script src="{{ url('frontend/js/sweetalert.min.js') }}"></script>

  <!-- Notyf -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
  <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>

  <!--og codes-->
  <meta property="og:url" content="https://maso-awards.com/home" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Maso Awards {{ date('Y') }}" />
  <meta property="og:image" content="https://maso-awards.live/frontend/assets/img/maso-og.jpg" />
  <meta property="og:description" content="Be part of the biggest music and arts awards show in Malawi" />

</head>

<body>
  @include('layouts.header')
  <!-- ======= Hero Section ======= -->
  <div class="container-fluid text-container" id="hero">
    <div class="row d-flex justify-content-center">
      <div class="col-sm-12 col-md-5 col-lg-4 hero-container-2 fade-in-up fade-in-up-delay-1">
        <img src="{{ url('frontend/assets/img/maso-awards.png') }}" alt="" class="flip">
      </div>
      <div class="col-sm-12 col-md-7 col-lg-8 hero-container-1">
        <h2 data-aos="fade-up" data-aos-delay="100">MASO AWARDS</h2>
        <p data-aos="fade-up" data-aos-delay="150">Be part of the biggest music and arts awards show in Malawi. Experience the glitz and glamour at Maso Awards 2025!</p>

        <div class="links">
          <a href="{{ url('waiting-list') }}" class="waiting-list" data-aos="fade-up" data-aos-delay="200">Join the waiting List</a>
          <a href="{{ url('vote') }}" data-aos="fade-up" data-aos-delay="250">Vote</a>
        </div>

        <div class="event-details">
          <div class="detail" data-aos="fade-up" data-aos-delay="300">
            <img src="{{ url('frontend/assets/img/calendar.png') }}">
            <div class="sub-detail-1">Dec 13</div>
            <div class="sub-detail-2">2025</div>
          </div>
          <div class="detail" data-aos="fade-up" data-aos-delay="350">
            <img src="{{ url('frontend/assets/img/clock.png') }}">
            <div class="sub-detail-1">06:00</div>
            <div class="sub-detail-2">PM</div>
          </div>
          <div class="detail" data-aos="fade-up" data-aos-delay="400">
            <img src="{{ url('frontend/assets/img/location.png') }}">
            <div class="sub-detail-1">BICC</div>
            <div class="sub-detail-2">Presidential Hall</div>
          </div>
          <div class="detail" data-aos="fade-up" data-aos-delay="450">
            <img src="{{ url('frontend/assets/img/trophy-star.png') }}">
            <div class="sub-detail-1">6+</div>
            <div class="sub-detail-2">Awards</div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
  <div class="gradient-bg">
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
    <div class="gradients-container">
      <div class="g1"></div>
      <div class="g2"></div>
      <div class="g3"></div>
      <div class="g4"></div>
      <div class="g5"></div>
    </div>
  </div>
  <main id="main">

    <!-- ======= About Section ======= -->
    <section id="about">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div class="col-lg-12">
            <h2>About Maso Awards</h2>
            <p>
              Established in 2021 by Maso Enterprises, the Maso Awards honor and recognize exceptional
              artistic talent across Malawi. With a reputation for credibility and inclusivity, the awards provide
              equal opportunities for artists from all genres. Our vision is to position the Maso Awards as the
              leading arts and entertainment platform in Malawi and Africa, fostering growth, innovation, and
              sustained excellence within the creative sector.
            </p>
          </div>
        </div>
        <div class="row">
          <!-- Mission -->
          <div class="mission col-md-6">
            <h2>Our Mission</h2>
            <p>
              To empower artists by recognizing and celebrating outstanding talent. The Maso Awards annual
              ceremony not only honors artistic excellence but also provides a stage for artists to showcase
              their creativity through performances.
            </p>
          </div>
          <!-- Stats -->
          <div class="stats col-md-6">
            <div class="row d-flex justify-content-center">
              <div class="col-6 mb-4">
                <div class="detail-1">50+</div>
                <div class="detail-2">Artists honored</div>
              </div>
              <div class="col-6 mb-4">
                <div class="detail-1">30+</div>
                <div class="detail-2">Award Categories</div>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-6">
                <div class="detail-1">10+</div>
                <div class="detail-2">Partners</div>
              </div>
              <div class="col-6">
                <div class="detail-1">5</div>
                <div class="detail-2">Years Running</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4 d-flex justify-content-center">
          <div class="col-6 col-sm-6 col-md-4 col-lg-3">
            <div class="wrapper">
              <img src="{{ url('frontend/assets/img/trophy.png') }}" alt="">
              <h4>Excellence Recognition</h4>
              <p>celebrating outstanding achievements in african music and arts</p>
            </div>
          </div>
          <div class="col-6 col-sm-6 col-md-4 col-lg-3">
            <div class="wrapper">
              <img src="{{ url('frontend/assets/img/star.png') }}" alt="">
              <h4>Industry Leaders</h4>
              <p>Bringing together most influential voices in entertainment</p>
            </div>
          </div>
          <div class="col-6 col-sm-6 col-md-4 col-lg-3">
            <div class="wrapper">
              <img src="{{ url('frontend/assets/img/musical-note.png') }}" alt="">
              <h4>Cultural Heritage</h4>
              <p>Preserving and promoting African musical traditions</p>
            </div>
          </div>
          <div class="col-6 col-sm-6 col-md-4 col-lg-3">
            <div class="wrapper">
              <img src="{{ url('frontend/assets/img/heart.png') }}" alt="">
              <h4>Community Impact</h4>
              <p>Supporting charitable causes and community development</p>
            </div>
          </div>
        </div>
      </div>
    </section><!-- End About Section -->

    <!-- ======= Articles Section ======= -->
    <section id="hotels" class="section-with-bg">
      <div class="container" data-aos="fade-up">
        <div class="section-header">
          <h2>Latest News</h2>
        </div>
        <div class="row d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
          @foreach ($articles as $article)
          <div class="col-lg-4 col-md-6">
            <div class="hotel">
              <div class="hotel-img">
                <img src="{{ url('frontend/assets/articles/'.$article->image) }}" alt="">
              </div>
              <h3><a href="article/{{ $article->id }}/{{ strtolower(str_replace(' ','-',$article->title)) }}">{{ strtoupper($article->title) }}</a></h3>
              <div class="hotel-icons">
                <div class="hotel-icon"><i class="far fa-clock"></i> 2 hours ago</div>
                <div class="hotel-icon">Read More <i class="fas fa-arrow-right"></i> </div>
              </div>
            </div>
          </div>
          @endforeach
        </div>
      </div>
    </section><!-- End Hotels Section -->

    <!-- ======= Schedule Section ======= -->
    <section id="schedule" class="section-with-bg">
      <div class="container" data-aos="fade-up">
        <div class="section-header">
          <h2>Event Calendar</h2>
          <p>Here is our event calendar</p>
        </div>

        <div class="tab-content row justify-content-center">
          <div role="tabpanel" class="col-lg-9 tab-pane fade show active" id="day-1">

            <div class="row schedule-item" data-aos="fade-up" data-aos-delay="200">
              <div class="col-md-2">
                <div class="phase">Phase 1</div>
              </div>
              <div class="col-md-10 mt-3">
                <div class="speaker">
                  <img src="{{ url('frontend/assets/img/nominee.png') }}" alt="Nominations">
                </div>
                <h4>Nominations</h4>
                <p>6th October - 25th October</p>
              </div>
            </div>

            <div class="row schedule-item" data-aos="fade-up" data-aos-delay="250">
              <div class="col-md-2">
                <div class="phase">Phase 2</div>
              </div>
              <div class="col-md-10 mt-3">
                <div class="speaker">
                  <img src="{{ url('frontend/assets/img/vote.png') }}" alt="Voting">
                </div>
                <h4>Voting</h4>
                <p>8th November - 29th November</p>
              </div>
            </div>

            <div class="row schedule-item d-flex" data-aos="fade-up" data-aos-delay="300">
              <div class="col-md-2">
                <div class="phase">Phase 3</div>
              </div>
              <div class="col-md-10 mt-3">
                <div class="speaker">
                  <img src="{{ url('frontend/assets/img/red-carpet.png') }}" alt="Award Event">
                </div>
                <h4>Award Event</h4>
                <p>13th December</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section><!-- End Schedule Section -->

    <!-- ======= Gallery Section ======= -->
    <section id="gallery">

      <div class="container" data-aos="fade-up">
        <div class="section-header">
          <h2>Gallery</h2>
        </div>
      </div>

      <div class="gallery-slider swiper">
        <div class="swiper-wrapper align-items-center">
          @foreach ($images as $image)
          <div class="swiper-slide">
            <a href="{{ url('frontend/assets/img/gallery/' . $image->image) }}" class="gallery-lightbox">
              <img src="{{ url('frontend/assets/img/gallery/' . $image->image) }}" class="img-fluid" alt="">
            </a>
          </div>
          @endforeach
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </section><!-- End Gallery Section -->

    <!-- ======= Venue Section ======= -->
    <section id="venue">
      <div class="container-fluid" data-aos="fade-up">

        <div class="section-header">
          <h2>Event Venue</h2>
          <p>Event venue location info and gallery</p>
        </div>

        <div class="row g-0">
          <div class="col-lg-6 venue-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.032487744444!2d33.79062477514622!3d-13.954184480342663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d34c7bb9a083%3A0x4694987eaa1748e1!2sBingu%20International%20Convention%20Center!5e1!3m2!1sen!2smw!4v1758358566962!5m2!1sen!2smw" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div class="col-lg-6 venue-info">
            <div class="row justify-content-center">
              <div class="col-11 col-lg-8 position-relative">
                <h3>BICC</h3>
                <p>The Bingu Wa Mutharika International Convention Centre (BICC) is Malawi&#039;s go to venue for international conferences. Located in the business center of Malawi in the capital city of Lilongwe, this convention center in Malawi is easy to reach and is close to the cultural heart of the country.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Venue Section -->

    <!-- ======= Supporters Section ======= -->
    <section id="supporters" class="section-with-bg">

      <div class="container" data-aos="fade-up">
        <div class="section-header">
          <h2>Partners</h2>
        </div>

        <div class="row d-flex justify-content-center no-gutters supporters-wrap clearfix">
          @foreach ($partners as $partner)
          <div class="col-lg-3 col-md-4 col-6">
            <div class="supporter-logo">
              <img src="{{ url('frontend/assets/img/partners/' . $partner->image) }}" class="img-fluid" alt="">
            </div>
          </div>
          @endforeach
        </div>
      </div>

    </section><!-- End Sponsors Section -->

    <!-- ======= Contact Section ======= -->
    <section id="contact" class="section-bg" style="background:#001017;">

      <div class="container" data-aos="fade-up">

        <div class="section-header">
          <h2>Contact Us</h2>
        </div>

        <div class="row contact-info">

          <div class="col-md-4">
            <div class="contact-address">
              <i class="bi bi-geo-alt"></i>
              <h3>Address</h3>
              <address>Chichiri, Blantyre, Malawi</address>
            </div>
          </div>

          <div class="col-md-4">
            <div class="contact-phone">
              <i class="bi bi-phone"></i>
              <h3>Phone Number</h3>
              <p><a href="tel:+265884085995">+265 884 085 995</a></p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="contact-email">
              <i class="bi bi-envelope"></i>
              <h3>Email</h3>
              <p><a href="mailto:info@maso-awards.live">info@maso-awards.live</a></p>
            </div>
          </div>
        </div>
      </div>
    </section><!-- End Contact Section -->

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <footer id="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i class="bi bi-chevron-right"></i> <a href="#about">About Us</a></li>
              <li><i class="bi bi-chevron-right"></i> <a href="#hotels">News</a></li>
              <li><i class="bi bi-chevron-right"></i> <a href="nominate">Nominate</a></li>
              <li><i class="bi bi-chevron-right"></i> <a href="#vote">Vote</a></li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-6 footer-info">
            <img src="{{ url('frontend/assets/img/maso-awards.png') }}" alt="TheEvenet">
          </div>

          <div class="col-lg-4 col-md-6 footer-contact">
            <h4>Contact Us</h4>
            <p>
              Chichiri<br>
              Blantyre<br>
              Malawi <br>
              <strong>Phone:</strong> +265 884 41 21 72 / +265 994 61 91 94<br>
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

  <!-- Template Main JS File -->
  <script src="{{ url('frontend/js/all.min.js') }}"></script>
  <script src="{{ url('frontend/assets/js/main.js') }}"></script>
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


  <script>
    //slicing all playlists titles
    var count = document.querySelectorAll(".hotel a").length;
    for (var i = 0; i < count; i++) {
      var title = document.querySelectorAll(".hotel a")[i].innerText;
      var slicer = title.slice(0, 30);
      if (title.length >= 30) {
        document.querySelectorAll(".hotel a")[i].innerHTML = slicer + '...';
      } else {
        document.querySelectorAll(".hotel a")[i].innerHTML = slicer;
      }
    }
  </script>

</body>

</html>