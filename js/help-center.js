document.addEventListener("DOMContentLoaded", function () {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(function (button) {
    button.addEventListener("click", function () {
      const item = this.parentElement;
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach(function (otherItem) {
        otherItem.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  const searchInput = document.getElementById("faqSearchInput");
  const searchBtn = document.getElementById("faqSearchBtn");

  function filterFAQs() {
    const query = (searchInput.value || "").toLowerCase().trim();
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {
      const text = item.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterFAQs);
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", filterFAQs);
  }
});