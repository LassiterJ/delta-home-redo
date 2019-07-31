


$(document).ready(() => {
    $(".more-details-btn").on("click", () => {
        $(".nav-dropdown").toggle();
       
    });
    $('.navbar-toggler').on('click', function () {
        $('.signup-login, .notification').toggleClass('d-none d-inline-flex').children().toggleClass('d-none');
        $('.hamburger').toggleClass('open');
      });
    
});
