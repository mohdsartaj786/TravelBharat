document.addEventListener("DOMContentLoaded", () => {
    const fromCity = document.getElementById("fromCity");
    const toCity = document.getElementById("toCity");
    const travelDate = document.getElementById("travelDate");
    const passengers = document.getElementById("passengers");
    const swapTransport = document.getElementById("swapTransport");
    const transportSearch = document.getElementById("transportSearch");
    const transportResult = document.getElementById("transportResult");
    const transportTypes = document.querySelectorAll(".transport-type");

    let selectedTransport = "Train";

    // Set minimum date as today
    const today = new Date().toISOString().split("T")[0];

    if (travelDate) {
        travelDate.min = today;
        travelDate.value = today;
    }

    // Transport type selection
    transportTypes.forEach(type => {
        type.addEventListener("click", () => {
            transportTypes.forEach(item => {
                item.classList.remove("active");
            });

            type.classList.add("active");

            selectedTransport =
                type.querySelector("strong").textContent.trim();
        });
    });

    // Swap From and To
    if (swapTransport) {
        swapTransport.addEventListener("click", () => {
            const temp = fromCity.value;
            fromCity.value = toCity.value;
            toCity.value = temp;
        });
    }

    // Search Transport
    if (transportSearch) {
        transportSearch.addEventListener("click", () => {
            const from = fromCity.value.trim();
            const to = toCity.value.trim();
            const date = travelDate.value;
            const passengerCount = passengers.value;

            if (!from || !to) {
                showMessage(
                    "⚠️",
                    "Please enter your journey details",
                    "Enter both starting city and destination."
                );
                return;
            }

            if (from.toLowerCase() === to.toLowerCase()) {
                showMessage(
                    "⚠️",
                    "Invalid Journey",
                    "Starting city and destination cannot be the same."
                );
                return;
            }

            if (!date) {
                showMessage(
                    "📅",
                    "Select Travel Date",
                    "Please choose your travel date."
                );
                return;
            }

            showTransportResults(
                from,
                to,
                date,
                passengerCount,
                selectedTransport
            );
        });
    }

    function showTransportResults(from, to, date, passengerCount, type) {
        const formattedDate = new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        const transportData = {
            Train: {
                icon: "🚆",
                title: "Train Journey",
                subtitle: "Comfortable & convenient travel",
                duration: "8h 30m",
                fare: "₹650",
                availability: "Seats Available"
            },
            Flight: {
                icon: "✈️",
                title: "Flight Journey",
                subtitle: "Fast & convenient travel",
                duration: "2h 10m",
                fare: "₹3,499",
                availability: "Available"
            },
            Bus: {
                icon: "🚌",
                title: "Bus Journey",
                subtitle: "Affordable travel option",
                duration: "10h 15m",
                fare: "₹850",
                availability: "Seats Available"
            },
            Cab: {
                icon: "🚕",
                title: "Cab Journey",
                subtitle: "Private & comfortable ride",
                duration: "9h 20m",
                fare: "₹4,500",
                availability: "Available"
            }
        };

        const data = transportData[type];

        transportResult.innerHTML = `
            <div class="result-icon">${data.icon}</div>

            <div class="transport-result-content">
                <span class="result-label">${type}</span>

                <h3>
                    ${from}
                    <span>→</span>
                    ${to}
                </h3>

                <p>${data.subtitle}</p>

                <div class="result-details">
                    <span>📅 ${formattedDate}</span>
                    <span>👥 ${passengerCount} Passenger${passengerCount > 1 ? "s" : ""}</span>
                    <span>⏱️ ${data.duration}</span>
                    <span>💰 From ${data.fare}</span>
                </div>

                <div class="result-bottom">
                    <strong>${data.availability}</strong>
                    <button type="button" class="view-transport-btn">
                        View Options
                    </button>
                </div>
            </div>
        `;

        transportResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        const viewButton = transportResult.querySelector(
            ".view-transport-btn"
        );

        if (viewButton) {
            viewButton.addEventListener("click", () => {
                alert(
                    `${type} options for ${from} → ${to} will be available here.`
                );
            });
        }
    }

    function showMessage(icon, title, message) {
        transportResult.innerHTML = `
            <div class="result-icon">${icon}</div>

            <div>
                <h3>${title}</h3>
                <p>${message}</p>
            </div>
        `;
    }
});