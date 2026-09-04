document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".gallery-filter");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
          btn.classList.remove("active");
        });
        button.classList.add("active");

        const filterValue = button.getAttribute("data-filter");

        galleryItems.forEach(function (item) {
          const category = item.getAttribute("data-category");

          if (filterValue === "all" || category === filterValue) {
            item.style.display = "";
            item.style.opacity = "0";
            item.style.transform = "translateY(15px)";
            
            setTimeout(function () {
              item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, 50);
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  const modal = document.getElementById("galleryModal");
  const modalImg = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const modalClose = document.querySelector(".modal-close");
  const backdrop = document.querySelector(".modal-backdrop");
  const galleryCards = document.querySelectorAll(".gallery-item");

  function openModal(imgSrc, captionText) {
    if (modal && modalImg) {
      modalImg.src = imgSrc;
      modalCaption.textContent = captionText;
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  galleryCards.forEach(function (card) {
    card.addEventListener("click", function (event) {
      const img = card.querySelector("img");
      const title = card.querySelector("h3");
      const sub = card.querySelector(".gallery-overlay span");

      if (img) {
        const caption = `${sub ? sub.textContent.trim() + " — " : ""}${title ? title.textContent.trim() : ""}`;
        openModal(img.src, caption);
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", function (event) {
      event.stopPropagation();
      closeModal();
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal && modal.classList.contains("active")) {
      closeModal();
    }
  });
});