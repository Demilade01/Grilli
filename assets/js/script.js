"use strict"

// PRELOAD 
// Loading will be end after document is loaded

const preloader = document.querySelector("data-preload");

window.addEventListener("load", function() {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});


// add event listener on multitple elements

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};


// NAVBAR

const navbar = document.querySelector("[data-navbar]")
const navTogglers = document.querySelectorAll("[data-nav-toggler]")
const overlay = document.querySelector("[data-overlay]")

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);


// HEADER && BACT TO TOP

const header = document.querySelector('[data-header]');
const backTopBtn = document.querySelector('[data-top-btn]');

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if(isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}



window.addEventListener('scroll', function () {
  if(this.window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});


// HERO SLIDER

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if ( currentSlidePos >= heroSliderItems.length - 1 ) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (  currentSlidePos <= 0 ) {
    currentSlidePos >= heroSliderItems.length - 1
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev)

// AUTO SLIDE 

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", autoSlide);

window.addEventListener("load", autoSlide);


// PARALLAX EFFECT

const parallaxItems = document.querySelectorAll('[data-parallax-item]');

window.addEventListener("mousemove", function (event) {
  // Calculate the x and y movement based on mouse position
  let x = ((event.clientX / window.innerWidth) * 10) - 5;
  let y = ((event.clientY / window.innerHeight) * 10) - 5;

  // Reverse the direction of x and y
  x = -x;
  y = -y;

  // Apply transformation to each parallax item based on its speed
  for (let i = 0; i < parallaxItems.length; i++) {
    const speed = Number(parallaxItems[i].dataset.parallaxSpeed);
    const offsetX = x * speed;
    const offsetY = y * speed;
    parallaxItems[i].style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0px)`;
  }
});

