/**
 * Created by austin on 4/30/18.
 */


$(document).ready(function () {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });

// smooth scrolling
    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
                var $position = $($(this).attr('href')).offset().top;
                $('html, body').stop().animate({
                    scrollTop: $position
                }, 600);
                event.preventDefault();
            });
});