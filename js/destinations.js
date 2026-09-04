document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".destination-card");
    const filterButtons = document.querySelectorAll(".destination-filter");
    const searchInput = document.getElementById("destinationSearch");
    const resultText = document.getElementById("destinationResult");
    const noDestinations = document.getElementById("noDestinations");
    const resetButton = document.getElementById("resetDestinationSearch");

    let activeCategory = "all";

    function filterDestinations() {

        const searchValue = searchInput.value
            .trim()
            .toLowerCase();

        let visibleCount = 0;

        cards.forEach(card => {

            const category =
                card.dataset.category?.toLowerCase() || "";

            const name =
                card.querySelector("h3")?.textContent.toLowerCase() || "";

            const description =
                card.querySelector("p")?.textContent.toLowerCase() || "";

            const state =
                card.querySelector(".destination-state")
                    ?.textContent.toLowerCase() || "";

            const matchesCategory =
                activeCategory === "all" ||
                category.includes(activeCategory);

            const matchesSearch =
                searchValue === "" ||
                name.includes(searchValue) ||
                description.includes(searchValue) ||
                state.includes(searchValue);

            if (matchesCategory && matchesSearch) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        if (visibleCount === 0) {

            noDestinations.style.display = "block";

            resultText.textContent =
                "No destinations found";

        } else {

            noDestinations.style.display = "none";

            if (searchValue || activeCategory !== "all") {

                resultText.textContent =
                    `${visibleCount} destination${visibleCount !== 1 ? "s" : ""} found`;

            } else {

                resultText.textContent = "";

            }

        }

    }


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            activeCategory =
                button.dataset.category.toLowerCase();

            filterDestinations();

        });

    });


    searchInput.addEventListener("input", filterDestinations);


    resetButton.addEventListener("click", () => {

        searchInput.value = "";

        activeCategory = "all";

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        document
            .querySelector('[data-category="all"]')
            .classList.add("active");

        filterDestinations();

    });


    filterDestinations();

});