document.addEventListener("DOMContentLoaded", function () {
  const navbarCollapse = document.getElementById("navbarNav");

  if (!navbarCollapse) {
    console.error("#navbarNav element not found");
    return; // Stop if navbar is missing
  }

  const navLinks = document.querySelectorAll(".nav-link");
  const navbarToggler = document.querySelector(".navbar-toggler");

  // Get or create the Bootstrap Collapse instance
  const collapseInstance = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);

  // Close when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        collapseInstance.hide();
      }
    });
  });

  // Close when clicking outside the navbar menu
  document.addEventListener("click", (event) => {
    const isClickInside = navbarCollapse.contains(event.target);
    const isToggler = navbarToggler.contains(event.target);

    if (!isClickInside && !isToggler && navbarCollapse.classList.contains("show")) {
      collapseInstance.hide();
    }
  });
});
