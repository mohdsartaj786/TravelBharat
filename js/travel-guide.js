document.addEventListener("DOMContentLoaded", async function () {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(function (anchor) {
        anchor.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (targetId && targetId !== "#" && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    event.preventDefault();

                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

    const guideGrid = document.getElementById("guideCardGrid");

    if (guideGrid) {
        try {
            const response = await fetch("./data/travel-guide.json", {
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();

            renderGuides(data.guides || [], guideGrid);
        } catch (error) {
            console.error("Travel Guide JSON Error:", error);

            guideGrid.innerHTML = `
                <div class="guide-error">
                    <h3>Travel guides load nahi hue</h3>
                    <p>Console check karo.</p>
                </div>
            `;
        }
    }

    initCardAnimations();
});

function escapeHTML(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function renderGuides(guides, grid) {
    if (!guides.length) {
        grid.innerHTML = `
            <div class="guide-error">
                <h3>No travel guides found</h3>
            </div>
        `;
        return;
    }

    grid.innerHTML = guides.map(function (guide) {
        return `
            <article class="guide-card">
                <div class="guide-card-icon">
                    ${escapeHTML(guide.icon)}
                </div>

                <span class="guide-number">
                    ${escapeHTML(guide.number)}
                </span>

                <h3>${escapeHTML(guide.title)}</h3>

                <p>${escapeHTML(guide.description)}</p>

                <a href="${escapeHTML(guide.link)}" class="guide-link">
                    Explore Guide
                    <span>→</span>
                </a>
            </article>
        `;
    }).join("");

    initCardAnimations();
}

function initCardAnimations() {
    const animatedCards = document.querySelectorAll(
        ".guide-card, .style-card, .region-item, .quick-tip"
    );

    if ("IntersectionObserver" in window) {
        const cardObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        animatedCards.forEach(function (card) {
            card.style.opacity = "0";
            card.style.transform = "translateY(24px)";
            card.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";

            cardObserver.observe(card);
        });
    } else {
        animatedCards.forEach(function (card) {
            card.style.opacity = "1";
            card.style.transform = "none";
        });
    }
}