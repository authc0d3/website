import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import "owl.carousel";
import "particles.js";
import "wowjs/css/libs/animate.css";
import WOW from "wowjs";
import "jquery.easing";
import "./data/home.json";
import "../scss/styles.scss";

const loader = {
  show: function () {
    $("body").addClass("is-loading");
  },
  hide: function () {
    $("body").removeClass("is-loading");
  },
};

// On load...
$(window).on("load", function () {
  new WOW.WOW({
    mobile: false,
    live: true,
  }).init();

  $('[data-toggle="tooltip"]').tooltip();
  particlesJS.load("home", "home.json");

  $(".owl-portfolio").owlCarousel({
    loop: false,
    margin: 20,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      991: {
        items: 2,
      },
    },
  });

  $(".scroll-to").on("click", function (e) {
    e.preventDefault();
    goTo($(this).attr("href"));
  });

  toggleHeader();
  loader.hide();
});

// Al mover el scroll
$(window).on("scroll", function () {
  toggleHeader();
});

// Scroll animation
function goTo(id) {
  if (id != "" && $(id).length > 0) {
    const top = $(id).offset().top - 2 * $("#main-nav").height();
    $("html,body")
      .stop()
      .animate({ scrollTop: top + "px" }, 550, "easeInOutExpo");
  }
}

// Mostrar u ocultar header
function toggleHeader() {
  const scroll = $(document).scrollTop();
  if (scroll >= 35) {
    $("header").removeClass("header-hidden");
    $("#home").addClass("full-height-section-down");
  } else {
    $("header").addClass("header-hidden");
    $("#home").removeClass("full-height-section-down");
  }
}

// Mostrar alertas con modal bootstrap
function showAlert(type, title, message) {
  if (type == "info")
    title =
      '<i class="fas fa-info-circle" style="color:#ff0043;"></i> ' + title;
  if (type == "error")
    title =
      '<i class="material-icons" style="color:#ff0043;">warning</i> ' + title;
  $("#alert-modal").find(".modal-title").html(title);
  $("#alert-modal").find(".modal-body").html(message);
  $("#alert-modal").modal("show");
}
