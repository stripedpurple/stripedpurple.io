/**
 * Created by austin on 4/30/18.
 */


$(document).ready(function () {

    // Contact Us Submit
    $('#contact-form').submit(function () {
        return false;
    });

    $('#contact-submit').click(function () {

        $.post('/contact', $('#contact-form').serialize(), function () {
            console.log('success');
            $('.footer .msg').html('<div class="notification is-success"><button class="delete"></button>Thank you for contacting Gold Medal Environmental. Someone will contact you shortly!</div>');
        }).fail(function (err) {
                console.log(err);
                $('.footer .msg').html('<div class="notification is-danger"><button class="delete"></button>' + err.responseText + '</div>');
            });

        return false;
    });

    $(document).on('click', '.notification > button.delete', function () {
        $(this).parent().addClass('is-hidden');
        return false;
    });

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