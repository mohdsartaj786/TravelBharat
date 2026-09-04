document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active-menu");
      menuToggle.classList.toggle("active-toggle");
    });
  }

  const filterButtons = document.querySelectorAll(".state-filter");
  const stateCards = document.querySelectorAll(".state-card");
  const utHeading = document.querySelector(".union-heading");

  if (filterButtons.length && stateCards.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
          btn.classList.remove("active");
        });
        button.classList.add("active");

        const selectedRegion = button.getAttribute("data-region");

        stateCards.forEach(function (card) {
          const cardRegion = card.getAttribute("data-region");

          if (selectedRegion === "all" || cardRegion === selectedRegion) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });

        if (utHeading) {
          if (selectedRegion === "ut" || selectedRegion === "all") {
            utHeading.style.display = "";
          } else {
            utHeading.style.display = "none";
          }
        }
      });
    });
  }
});