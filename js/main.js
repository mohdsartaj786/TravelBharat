document.addEventListener("DOMContentLoaded", () => {

    // Mobile Menu
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            const isActive = mobileMenu.classList.toggle("active");
            menuBtn.textContent = isActive ? "✕" : "☰";
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
                menuBtn.textContent = "☰";
            });
        });

        document.addEventListener("click", event => {
            if (
                !menuBtn.contains(event.target) &&
                !mobileMenu.contains(event.target)
            ) {
                mobileMenu.classList.remove("active");
                menuBtn.textContent = "☰";
            }
        });
    }


    // Hero Search
    const heroSearchForm = document.getElementById("heroSearchForm");
    const destinationSearch = document.getElementById("destinationSearch");

    if (heroSearchForm && destinationSearch) {
        heroSearchForm.addEventListener("submit", event => {
            event.preventDefault();

            const query = destinationSearch.value.trim();

            if (!query) {
                destinationSearch.focus();
                return;
            }

            window.location.href =
                `destinations.html?q=${encodeURIComponent(query)}`;
        });
    }


    // Newsletter
    const newsletterForm = document.getElementById("newsletterForm");
    const emailInput = document.getElementById("email");

    if (newsletterForm && emailInput) {
        newsletterForm.addEventListener("submit", event => {
            event.preventDefault();

            const email = emailInput.value.trim();

            if (!email) {
                emailInput.focus();
                return;
            }

            alert("Thank you for subscribing to TravelBharat!");

            emailInput.value = "";
        });
    }


    // Navbar Scroll Effect
    const navbar = document.querySelector(".navbar");

    if (navbar) {
        const updateNavbar = () => {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        };

        updateNavbar();

        window.addEventListener("scroll", updateNavbar);
    }

});

