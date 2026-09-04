/* =========================================================
   TRAVELBHARAT - INDIA MAP JAVASCRIPT
   File: js/map.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const mapContainer =
        document.querySelector(".india-map");

    const mapImage =
        document.querySelector(".india-map img");

    const mapSearch =
        document.getElementById("mapSearch");

    const mapResults =
        document.getElementById("mapResults");


    /* =====================================================
       MAP DATA
       ===================================================== */

    const locations = {

        /* ================= STATES ================= */

        "andhra-pradesh": {
            name: "Andhra Pradesh",
            type: "State",
            url: "states/andhra-pradesh.html"
        },

        "arunachal-pradesh": {
            name: "Arunachal Pradesh",
            type: "State",
            url: "states/arunachal-pradesh.html"
        },

        "assam": {
            name: "Assam",
            type: "State",
            url: "states/assam.html"
        },

        "bihar": {
            name: "Bihar",
            type: "State",
            url: "states/bihar.html"
        },

        "chhattisgarh": {
            name: "Chhattisgarh",
            type: "State",
            url: "states/chhattisgarh.html"
        },

        "goa": {
            name: "Goa",
            type: "State",
            url: "states/goa.html"
        },

        "gujarat": {
            name: "Gujarat",
            type: "State",
            url: "states/gujarat.html"
        },

        "haryana": {
            name: "Haryana",
            type: "State",
            url: "states/haryana.html"
        },

        "himachal-pradesh": {
            name: "Himachal Pradesh",
            type: "State",
            url: "states/himachal-pradesh.html"
        },

        "jharkhand": {
            name: "Jharkhand",
            type: "State",
            url: "states/jharkhand.html"
        },

        "karnataka": {
            name: "Karnataka",
            type: "State",
            url: "states/karnataka.html"
        },

        "kerala": {
            name: "Kerala",
            type: "State",
            url: "states/kerala.html"
        },

        "madhya-pradesh": {
            name: "Madhya Pradesh",
            type: "State",
            url: "states/madhya-pradesh.html"
        },

        "maharashtra": {
            name: "Maharashtra",
            type: "State",
            url: "states/maharashtra.html"
        },

        "manipur": {
            name: "Manipur",
            type: "State",
            url: "states/manipur.html"
        },

        "meghalaya": {
            name: "Meghalaya",
            type: "State",
            url: "states/meghalaya.html"
        },

        "mizoram": {
            name: "Mizoram",
            type: "State",
            url: "states/mizoram.html"
        },

        "nagaland": {
            name: "Nagaland",
            type: "State",
            url: "states/nagaland.html"
        },

        "odisha": {
            name: "Odisha",
            type: "State",
            url: "states/odisha.html"
        },

        "punjab": {
            name: "Punjab",
            type: "State",
            url: "states/punjab.html"
        },

        "rajasthan": {
            name: "Rajasthan",
            type: "State",
            url: "states/rajasthan.html"
        },

        "sikkim": {
            name: "Sikkim",
            type: "State",
            url: "states/sikkim.html"
        },

        "tamil-nadu": {
            name: "Tamil Nadu",
            type: "State",
            url: "states/tamil-nadu.html"
        },

        "telangana": {
            name: "Telangana",
            type: "State",
            url: "states/telangana.html"
        },

        "tripura": {
            name: "Tripura",
            type: "State",
            url: "states/tripura.html"
        },

        "uttar-pradesh": {
            name: "Uttar Pradesh",
            type: "State",
            url: "states/uttar-pradesh.html"
        },

        "uttarakhand": {
            name: "Uttarakhand",
            type: "State",
            url: "states/uttarakhand.html"
        },

        "west-bengal": {
            name: "West Bengal",
            type: "State",
            url: "states/west-bengal.html"
        },


        /* ============== UNION TERRITORIES ============== */

        "andaman-nicobar": {
            name: "Andaman & Nicobar Islands",
            type: "Union Territory",
            url: "states/union-territories/andaman-nicobar.html"
        },

        "chandigarh": {
            name: "Chandigarh",
            type: "Union Territory",
            url: "states/union-territories/chandigarh.html"
        },

        "dadra-daman-diu": {
            name: "Dadra & Nagar Haveli and Daman & Diu",
            type: "Union Territory",
            url: "states/union-territories/dadra-nagar-haveli-daman-diu.html"
        },

        "delhi": {
            name: "Delhi",
            type: "Union Territory",
            url: "states/union-territories/delhi.html"
        },

        "jammu-kashmir": {
            name: "Jammu & Kashmir",
            type: "Union Territory",
            url: "states/union-territories/jammu-kashmir.html"
        },

        "ladakh": {
            name: "Ladakh",
            type: "Union Territory",
            url: "states/union-territories/ladakh.html"
        },

        "lakshadweep": {
            name: "Lakshadweep",
            type: "Union Territory",
            url: "states/union-territories/lakshadweep.html"
        },

        "puducherry": {
            name: "Puducherry",
            type: "Union Territory",
            url: "states/union-territories/puducherry.html"
        }

    };


    /* =====================================================
       CREATE MAP TOOLTIP
       ===================================================== */

    let tooltip = document.querySelector(".map-tooltip");

    if (!tooltip && mapContainer) {

        tooltip = document.createElement("div");

        tooltip.className = "map-tooltip";

        tooltip.style.display = "none";

        document.body.appendChild(tooltip);

    }


    /* =====================================================
       MAP IMAGE
       ===================================================== */

    if (mapImage) {

        mapImage.addEventListener("click", () => {

            /*
             * Map image is currently a normal image.
             * Individual state navigation should be handled
             * through state cards or map markers.
             */

            if (mapContainer) {

                mapContainer.classList.add(
                    "map-active"
                );

                setTimeout(() => {

                    mapContainer.classList.remove(
                        "map-active"
                    );

                }, 300);

            }

        });

    }


    /* =====================================================
       SEARCH MAP LOCATIONS
       ===================================================== */

    function searchMap() {

        if (!mapSearch) return;

        const query =
            mapSearch.value
                .trim()
                .toLowerCase();


        if (query === "") {

            if (mapResults) {
                mapResults.innerHTML = "";
            }

            return;

        }


        const results =
            Object.values(locations)
                .filter(location =>
                    location.name
                        .toLowerCase()
                        .includes(query)
                );


        if (!mapResults) {

            if (results.length === 1) {

                window.location.href =
                    results[0].url;

            }

            return;

        }


        /* Clear previous results */

        mapResults.innerHTML = "";


        if (results.length === 0) {

            mapResults.innerHTML = `
                <p class="map-no-result">
                    No state or Union Territory found.
                </p>
            `;

            return;

        }


        /* Create result list */

        results.forEach(location => {

            const item =
                document.createElement("a");

            item.href = location.url;

            item.className = "map-result-item";

            item.innerHTML = `
                <strong>${location.name}</strong>
                <span>${location.type}</span>
            `;

            mapResults.appendChild(item);

        });

    }


    /* =====================================================
       SEARCH INPUT
       ===================================================== */

    if (mapSearch) {

        mapSearch.addEventListener(
            "input",
            searchMap
        );


        mapSearch.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    const query =
                        mapSearch.value
                            .trim()
                            .toLowerCase();


                    const result =
                        Object.values(locations)
                            .find(location =>
                                location.name
                                    .toLowerCase()
                                    .includes(query)
                            );


                    if (result) {

                        window.location.href =
                            result.url;

                    }

                }

            }
        );

    }


    /* =====================================================
       MAP MARKERS
       ===================================================== */

    const markers =
        document.querySelectorAll(
            ".map-marker"
        );


    markers.forEach(marker => {

        const locationId =
            marker.dataset.location;


        const location =
            locations[locationId];


        if (!location) return;


        marker.setAttribute(
            "title",
            location.name
        );


        /* Hover */

        marker.addEventListener(
            "mouseenter",
            event => {

                if (!tooltip) return;

                tooltip.innerHTML = `
                    <strong>${location.name}</strong>
                    <span>${location.type}</span>
                `;

                tooltip.style.display = "block";

            }
        );


        marker.addEventListener(
            "mousemove",
            event => {

                if (!tooltip) return;

                tooltip.style.left =
                    `${event.pageX + 15}px`;

                tooltip.style.top =
                    `${event.pageY + 15}px`;

            }
        );


        marker.addEventListener(
            "mouseleave",
            () => {

                if (!tooltip) return;

                tooltip.style.display = "none";

            }
        );


        /* Click */

        marker.addEventListener(
            "click",
            () => {

                window.location.href =
                    location.url;

            }
        );

    });


    /* =====================================================
       MAP CARD CLICK
       ===================================================== */

    document
        .querySelectorAll("[data-map-location]")
        .forEach(element => {

            element.addEventListener(
                "click",
                () => {

                    const id =
                        element.dataset.mapLocation;

                    const location =
                        locations[id];

                    if (location) {

                        window.location.href =
                            location.url;

                    }

                }
            );

        });


    /* =====================================================
       EXPOSE MAP DATA
       ===================================================== */

    window.travelBharatMap =
        locations;

});