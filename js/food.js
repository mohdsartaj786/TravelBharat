document.addEventListener("DOMContentLoaded", async () => {
    const statesGrid = document.getElementById("statesFoodGrid");
    const utGrid = document.getElementById("utFoodGrid");

    if (!statesGrid || !utGrid) return;

    try {
        const response = await fetch("./data/food.json", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        console.log("Food Data Loaded:", data);

        renderFood(data.states || [], statesGrid);
        renderFood(data.unionTerritories || [], utGrid);

    } catch (error) {
        console.error("Food JSON Error:", error);

        statesGrid.innerHTML = `
            <div class="food-error">
                <h3>Unable to load food data</h3>
                <p>Please check data/food.json and run the website using Live Server.</p>
            </div>
        `;

        utGrid.innerHTML = `
            <div class="food-error">
                <h3>Unable to load food data</h3>
                <p>Please check data/food.json and run the website using Live Server.</p>
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


function renderFood(items, grid) {

    if (!items.length) {
        grid.innerHTML = `
            <div class="food-error">
                <h3>No food data found</h3>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map((item, index) => {

        const number = String(index + 1).padStart(2, "0");

        return `
            <article class="food-card">

                <div class="food-card-image">

                    <img
                        src="${escapeHTML(item.image)}"
                        alt="${escapeHTML(item.dish)}"
                        loading="lazy"
                        onerror="this.onerror=null; this.src='images/food/food-culture.jpg';"
                    >

                    <span class="food-number">
                        ${number}
                    </span>

                </div>

                <div class="food-card-content">

                    <span class="food-state">
                        ${escapeHTML(item.state)}
                    </span>

                    <h3>
                        ${escapeHTML(item.dish)}
                    </h3>

                    <p>
                        ${escapeHTML(item.description)}
                    </p>

                    <div class="food-location">
                        <span>📍</span>
                        ${escapeHTML(item.location)}
                    </div>

                </div>

            </article>
        `;

    }).join("");
}