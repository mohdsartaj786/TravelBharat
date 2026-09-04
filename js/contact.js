document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const subject = document.getElementById("contactSubject").value.trim();
      const message = document.getElementById("contactMessage").value.trim();

      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
      }

      const newMessage = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toLocaleString()
      };

      const messages = JSON.parse(localStorage.getItem("travelBharatMessages") || "[]");
      messages.push(newMessage);
      localStorage.setItem("travelBharatMessages", JSON.stringify(messages));

      alert("Thank you! Your message has been sent successfully.");
      contactForm.reset();
    });
  }

  const starButtons = document.querySelectorAll("#ratingStars button");
  const ratingValue = document.getElementById("ratingValue");
  const ratingSubmit = document.getElementById("ratingSubmit");
  const ratingMessage = document.getElementById("ratingMessage");
  let currentRating = 0;

  const ratingLabels = [
    "Select your rating",
    "1 Star — Needs Improvement",
    "2 Stars — Fair Experience",
    "3 Stars — Good Experience",
    "4 Stars — Great Experience",
    "5 Stars — Excellent!"
  ];

  starButtons.forEach(function (star) {
    star.addEventListener("click", function () {
      currentRating = parseInt(this.getAttribute("data-rating"));
      ratingValue.textContent = ratingLabels[currentRating];

      starButtons.forEach(function (s, index) {
        if (index < currentRating) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });
    });
  });

  if (ratingSubmit) {
    ratingSubmit.addEventListener("click", function () {
      if (currentRating === 0) {
        alert("Please select at least 1 star before submitting.");
        return;
      }

      localStorage.setItem("travelBharatUserRating", currentRating);

      if (ratingMessage) {
        ratingMessage.textContent = `Thank you for rating us ${currentRating} stars! ⭐`;
      }
    });
  }
});