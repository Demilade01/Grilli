"use strict"

// PRELOAD 
// Loading will be end after document is loaded

const preloader = document.querySelector("data-preload");

window.addEventListener("load", function() {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});