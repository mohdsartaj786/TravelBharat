document.addEventListener("DOMContentLoaded", function () {

    const cultureGrid = document.getElementById("cultureGrid");

    if (!cultureGrid) {
        console.error("cultureGrid element nahi mila.");
        return;
    }

    loadCulture();

    async function loadCulture() {

        try {

            const response = await fetch("./data/culture.json", {
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error(
                    "culture.json load nahi hua. Status: " + response.status
                );
            }

            const data = await response.json();

            console.log("Culture Data Loaded:", data);

            const states = Array.isArray(data.states)
                ? data.states
                : [];

            const unionTerritories = Array.isArray(data.unionTerritories)
                ? data.unionTerritories
                : [];

            const allCulture = [
                ...states,
                ...unionTerritories
            ];

            console.log("Total Culture Cards:", allCulture.length);

            if (allCulture.length === 0) {

                cultureGrid.innerHTML = `
                    <div class="culture-error">
                        <h3>No Culture Data Found</h3>
                        <p>culture.json me data available nahi hai.</p>
                    </div>
                `;

                return;
            }

            renderCulture(allCulture);

        } catch (error) {

            console.error("Culture Error:", error);

            cultureGrid.innerHTML = `
                <div class="culture-error">
                    <h3>Culture data load nahi hua</h3>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }


    function renderCulture(items) {

        cultureGrid.innerHTML = items.map((item, index) => {

            return `
                <article class="culture-card">

                    <div class="culture-card-image">

                        <img
                            src="${item.image}"
                            alt="${item.culture}"
                            loading="lazy"
                            onerror="this.onerror=null; this.src='images/culture/culture-hero.jpg';"
                        >

                        <span class="culture-number">
                            ${String(index + 1).padStart(2, "0")}
                        </span>

                    </div>

                    <div class="culture-card-content">

                        <span class="culture-state">
                            ${item.state}
                        </span>

                        <h3>
                            ${item.culture}
                        </h3>

                        <p>
                            ${item.description}
                        </p>

                        <div class="culture-location">
                            📍 ${item.location}
                        </div>

                    </div>

                </article>
            `;

        }).join("");
    }

});