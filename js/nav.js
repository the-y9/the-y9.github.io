function initNavbar() {
  const navbarCollapse = document.getElementById("navbarNav");
  if (!navbarCollapse) {
    console.error("#navbarNav element not found");
    return;
  }

  const navLinks = document.querySelectorAll(".nav-link");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const collapseInstance = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        collapseInstance.hide();
      }
    });
  });

  document.addEventListener("click", (event) => {
    const isClickInside = navbarCollapse.contains(event.target);
    const isToggler = navbarToggler && navbarToggler.contains(event.target);

    if (!isClickInside && !isToggler && navbarCollapse.classList.contains("show")) {
      collapseInstance.hide();
    }
  });
}

// Fetch and insert navbar, then initialize it
document.addEventListener("DOMContentLoaded", () => {
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;
      initNavbar();
    })
    .catch(err => console.error('Failed to load navbar:', err));
});
