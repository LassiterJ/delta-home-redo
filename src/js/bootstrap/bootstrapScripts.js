$(document).ready(() => {
  $(".more-details-btn").on("click", () => {
    $(".nav-dropdown").toggle();
  });
  $(".navbar-toggler").on("click", function() {
    $(".hamburger").toggleClass("open");
    const $signupLoginNotif = $("#signup-login-notif, #notif");
    if ($signupLoginNotif.hasClass("d-none")) {
      setTimeout(function() {
        $signupLoginNotif
          .removeClass("d-none")
          .contents()
          .removeClass("d-none");
      }, 380);
    } else {
      console.log("Hide signup");
      $signupLoginNotif
        .addClass("d-none")
        .contents()
        .addClass("d-none");
    }
  });

  $(window).resize(function() {
    if (window.innerWidth >= 768) {
      $("#card-content2")
        .toggle()
        .appendTo("#card-img2")
        .toggleClass("col-12");
      $("#card-img2").toggleClass("card-img2-overlap");
    }
  });
});
