const API_URL = "http://localhost:5000/api/favorites";

const destinations = {
    varanasi: {
        name: "Varanasi",
        state: "Uttar Pradesh",
        image: "images/destinations/varanasi.jpg",
        description: "Explore the spiritual heart of India along the sacred Ganges.",
        link: "destinations/varanasi.html"
    },

    udaipur: {
        name: "Udaipur",
        state: "Rajasthan",
        image: "images/destinations/udaipur.jpg",
        description: "Discover royal palaces, beautiful lakes and the timeless beauty of Rajasthan.",
        link: "destinations/udaipur.html"
    },

    "taj-mahal": {
        name: "Taj Mahal",
        state: "Uttar Pradesh",
        image: "images/destinations/taj-mahal.jpg",
        description: "Visit one of India's most iconic monuments and symbols of love.",
        link: "destinations/taj-mahal.html"
    },

    manali: {
        name: "Manali",
        state: "Himachal Pradesh",
        image: "images/destinations/manali.jpg",
        description: "Experience beautiful mountains, valleys, snow and adventure.",
        link: "destinations/manali.html"
    },

    "kerala-backwaters": {
        name: "Kerala Backwaters",
        state: "Kerala",
        image: "images/destinations/kerala-backwaters.jpg",
        description: "Relax among peaceful backwaters, greenery and traditional houseboats.",
        link: "destinations/kerala-backwaters.html"
    },

    jaipur: {
        name: "Jaipur",
        state: "Rajasthan",
        image: "images/destinations/jaipur.jpg",
        description: "Explore the Pink City, royal forts, palaces and vibrant culture.",
        link: "destinations/jaipur.html"
    },

    "goa-beaches": {
        name: "Goa Beaches",
        state: "Goa",
        image: "images/destinations/goa-beaches.jpg",
        description: "Enjoy beautiful beaches, sunsets, food and coastal experiences.",
        link: "destinations/goa-beaches.html"
    }
};


document.addEventListener("DOMContentLoaded", () => {
    loadFavorites();
});


async function loadFavorites() {

    const token = localStorage.getItem("travelBharatToken");

    const grid = document.getElementById("favouriteGrid");
    const empty = document.getElementById("favouriteEmpty");
    const section = document.getElementById("favouriteSection");
    const count = document.getElementById("favouriteCount");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        console.log("Favorites:", data);

        if (response.status === 401) {

            localStorage.removeItem("travelBharatToken");
            localStorage.removeItem("travelBharatUser");

            alert("Your login session has expired.");
            window.location.href = "login.html";
            return;
        }

        if (!response.ok) {
            throw new Error(data.message || "Unable to load favorites");
        }

        const favorites = data.favorites || [];

        count.textContent = favorites.length;

        if (favorites.length === 0) {

            grid.innerHTML = "";

            section.style.display = "none";
            empty.style.display = "block";

            return;
        }

        section.style.display = "block";
        empty.style.display = "none";

        grid.innerHTML = "";

        favorites.forEach(destinationId => {

            const destination = destinations[destinationId];

            if (!destination) {
                return;
            }

            const card = document.createElement("article");

            card.className = "favourite-card";

            card.innerHTML = `
                <div class="favourite-card-img">

                    <img
                        src="${destination.image}"
                        alt="${destination.name}"
                        loading="lazy"
                    >

                    <button
                        type="button"
                        class="remove-fav-btn"
                        data-id="${destinationId}"
                        aria-label="Remove ${destination.name} from favorites"
                        title="Remove from favorites"
                    >
                        ♥
                    </button>

                </div>

                <div class="favourite-card-body">

                    <span class="fav-state">
                        ${destination.state}
                    </span>

                    <h3>${destination.name}</h3>

                    <p>
                        ${destination.description}
                    </p>

                    <a
                        href="${destination.link}"
                        class="explore-fav-btn"
                    >
                        Explore Destination →
                    </a>

                </div>
            `;

            grid.appendChild(card);
        });


        document.querySelectorAll(".remove-fav-btn").forEach(button => {

            button.addEventListener("click", async () => {

                const destinationId = button.dataset.id;

                await removeFavorite(
                    destinationId,
                    button
                );

            });

        });

    } catch (error) {

        console.error("Favorites Error:", error);

        section.style.display = "block";
        empty.style.display = "none";

        grid.innerHTML = `
            <div class="favorite-error">
                <h3>Unable to load favorites</h3>

                <p>
                    Something went wrong while loading your saved destinations.
                </p>

                <button
                    type="button"
                    onclick="loadFavorites()"
                >
                    Try Again
                </button>
            </div>
        `;
    }
}


async function removeFavorite(destinationId, button) {

    const token = localStorage.getItem("travelBharatToken");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {

        button.disabled = true;
        button.textContent = "…";

        const response = await fetch(
            `${API_URL}/${destinationId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        console.log("Remove Favorite:", data);

        if (response.status === 401) {

            localStorage.removeItem("travelBharatToken");
            localStorage.removeItem("travelBharatUser");

            alert("Your login session has expired.");
            window.location.href = "login.html";

            return;
        }

        if (!response.ok) {
            throw new Error(
                data.message || "Unable to remove favorite"
            );
        }

        await loadFavorites();

    } catch (error) {

        console.error("Remove Favorite Error:", error);

        button.disabled = false;
        button.textContent = "♥";

        alert(
            "Favorite remove nahi hua.\nPlease try again."
        );
    }
}