const navbarCollapse = document.getElementById("navbarNav");
if (!navbarCollapse) {
  console.error("#navbarNav element not found");
}

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarCollapse = document.getElementById("navbarNav");
  const navbarToggler = document.querySelector(".navbar-toggler");

  // Get the existing Bootstrap collapse instance
  const collapseInstance = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);

  // Close when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        collapseInstance.hide();
      }
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInside = navbarCollapse.contains(event.target);
    const isToggler = navbarToggler.contains(event.target);

    if (!isClickInside && !isToggler && navbarCollapse.classList.contains("show")) {
      collapseInstance.hide();
    }
  });
});
