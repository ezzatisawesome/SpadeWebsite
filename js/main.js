$(window).scroll(function () {
    $("body").css("background-position","5% " + ($(this).scrollTop() / 2) + "px");
});

