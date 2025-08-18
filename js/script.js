// Initialize typed.js
var options = {
    strings: ["Backend Developer",
      "ML Ops Enthusiast",
      "AI Engineer",
    ],
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 1000,
    startDelay: 500,
    loop: true
};

var typed = new Typed(".text-slider-items", options);

// Smooth scrolling
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('nav1');
    if (window.scrollY > 50) { // Change 50 to any pixel value to trigger the scroll effect
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
