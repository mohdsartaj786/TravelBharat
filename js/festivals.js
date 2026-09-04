document.addEventListener("DOMContentLoaded", async () => {
    const festivalGrid = document.querySelector(".festival-grid");

    if (!festivalGrid) return;

    try {
        const response = await fetch("./data/festivals.json", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        console.log("Festival Data Loaded:", data);

        renderFestivals(data.festivals || [], festivalGrid);

    } catch (error) {
        console.error("Festival JSON Error:", error);

        festivalGrid.innerHTML = `
            <div class="festival-error">
                <h3>Unable to load festivals</h3>
                <p>Please check data/festivals.json</p>
            </div>
        `;
    }
});


function escapeHTML(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function renderFestivals(items, grid) {

    if (!items.length) {
        grid.innerHTML = `
            <div class="festival-error">
                <h3>No festivals found</h3>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map((festival, index) => {

        const number = String(index + 1).padStart(2, "0");

        return `
            <article class="festival-card">

                <div class="festival-card-image">

                    <img
                        src="${escapeHTML(festival.image)}"
                        alt="${escapeHTML(festival.name)}"
                        loading="lazy"
                        onerror="this.onerror=null; this.src='images/festivals/festival-hero.jpg';"
                    >

                    <span class="festival-month">
                        ${escapeHTML(festival.month)}
                    </span>

                </div>

                <div class="festival-card-content">

                    <span class="festival-number">
                        ${number}
                    </span>

                    <h3>
                        ${escapeHTML(festival.name)}
                    </h3>

                    <p>
                        ${escapeHTML(festival.description)}
                    </p>

                    <span class="festival-location">
                        ${escapeHTML(festival.location)}
                    </span>

                </div>

            </article>
        `;

    }).join("");
}