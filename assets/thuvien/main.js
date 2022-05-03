var barBtn = document.querySelector('.js-bar')
var modal = document.querySelector('.menu-modal')
var closeBtn = document.querySelector('.js-close')
var overlay = document.querySelector('.menu-overlay')

barBtn.onclick = function () {
    modal.style.transform = "translateX(0)";
    overlay.style.display = "block";
}
closeBtn.onclick = function () {
    modal.style.transform = "translateX(100%)";
    overlay.style.display = "none";
}
overlay.onclick = function (event) {
    modal.style.transform = "translateX(100%)";
    overlay.style.display = "none";
}


var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "flex";
    setTimeout(showSlides, 5000); // Change image every 2 seconds
}


const dot1 = document.querySelector('.js-dot-1')
const dot2 = document.querySelector('.js-dot-2')

dot2.addEventListener('click', function () {
    dot2.classList.add('manual-btn--active')
    dot1.classList.remove('manual-btn--active')
})

dot1.addEventListener('click', function () {
    dot1.classList.add('manual-btn--active')
    dot2.classList.remove('manual-btn--active')
})


$('.count').countUp({
    delay: 10,
    time: 1500
});

const navMobileBtn = document.querySelector('.js-mobile-btn')
const mobileMenu = document.querySelector('.js-mobile-menu')
var mobileOverlay = document.querySelector('.mobile-menu-overlay')

navMobileBtn.onclick = function () {
    mobileMenu.style.transform = "scaleY(1)";
    mobileOverlay.style.display = "block";
}

mobileOverlay.onclick = function () {
    mobileMenu.style.transform = "scaleY(0)";
    mobileOverlay.style.display = "none";
}


$(document).ready(function () {
    $('.slide__review-list').slick({
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        centerMode: true,
        draggable: true,
        slidesToShow: 2,
        slidesToScroll: 1
    });
});


