/* =========================================================
   TRAVELBHARAT - SEARCH JAVASCRIPT
   File: js/search.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("destinationSearch");

    const searchBtn =
        document.getElementById("searchBtn");


    /* =====================================================
       SEARCH DATA
       ===================================================== */

    const searchData = [

        /* ================= STATES ================= */

        {
            name: "Andhra Pradesh",
            keywords: ["andhra", "andhra pradesh"],
            url: "states/andhra-pradesh.html"
        },

        {
            name: "Arunachal Pradesh",
            keywords: ["arunachal", "arunachal pradesh"],
            url: "states/arunachal-pradesh.html"
        },

        {
            name: "Assam",
            keywords: ["assam"],
            url: "states/assam.html"
        },

        {
            name: "Bihar",
            keywords: ["bihar"],
            url: "states/bihar.html"
        },

        {
            name: "Chhattisgarh",
            keywords: ["chhattisgarh", "chattisgarh"],
            url: "states/chhattisgarh.html"
        },

        {
            name: "Goa",
            keywords: ["goa"],
            url: "states/goa.html"
        },

        {
            name: "Gujarat",
            keywords: ["gujarat"],
            url: "states/gujarat.html"
        },

        {
            name: "Haryana",
            keywords: ["haryana"],
            url: "states/haryana.html"
        },

        {
            name: "Himachal Pradesh",
            keywords: ["himachal", "himachal pradesh"],
            url: "states/himachal-pradesh.html"
        },

        {
            name: "Jharkhand",
            keywords: ["jharkhand"],
            url: "states/jharkhand.html"
        },

        {
            name: "Karnataka",
            keywords: ["karnataka"],
            url: "states/karnataka.html"
        },

        {
            name: "Kerala",
            keywords: ["kerala"],
            url: "states/kerala.html"
        },

        {
            name: "Madhya Pradesh",
            keywords: ["mp", "madhya pradesh"],
            url: "states/madhya-pradesh.html"
        },

        {
            name: "Maharashtra",
            keywords: ["maharashtra", "mumbai"],
            url: "states/maharashtra.html"
        },

        {
            name: "Manipur",
            keywords: ["manipur"],
            url: "states/manipur.html"
        },

        {
            name: "Meghalaya",
            keywords: ["meghalaya"],
            url: "states/meghalaya.html"
        },

        {
            name: "Mizoram",
            keywords: ["mizoram"],
            url: "states/mizoram.html"
        },

        {
            name: "Nagaland",
            keywords: ["nagaland", "kohima"],
            url: "states/nagaland.html"
        },

        {
            name: "Odisha",
            keywords: ["odisha", "orissa"],
            url: "states/odisha.html"
        },

        {
            name: "Punjab",
            keywords: ["punjab", "amritsar"],
            url: "states/punjab.html"
        },

        {
            name: "Rajasthan",
            keywords: ["rajasthan", "jaipur", "udaipur", "jaisalmer"],
            url: "states/rajasthan.html"
        },

        {
            name: "Sikkim",
            keywords: ["sikkim", "gangtok"],
            url: "states/sikkim.html"
        },

        {
            name: "Tamil Nadu",
            keywords: ["tamil nadu", "tamilnadu", "chennai", "madurai"],
            url: "states/tamil-nadu.html"
        },

        {
            name: "Telangana",
            keywords: ["telangana", "hyderabad"],
            url: "states/telangana.html"
        },

        {
            name: "Tripura",
            keywords: ["tripura", "agartala"],
            url: "states/tripura.html"
        },

        {
            name: "Uttar Pradesh",
            keywords: [
                "uttar pradesh",
                "up",
                "agra",
                "varanasi",
                "ayodhya",
                "lucknow"
            ],
            url: "states/uttar-pradesh.html"
        },

        {
            name: "Uttarakhand",
            keywords: [
                "uttarakhand",
                "nainital",
                "rishikesh",
                "mussoorie"
            ],
            url: "states/uttarakhand.html"
        },

        {
            name: "West Bengal",
            keywords: [
                "west bengal",
                "kolkata",
                "darjeeling"
            ],
            url: "states/west-bengal.html"
        },


        /* ================= UNION TERRITORIES ================= */

        {
            name: "Andaman & Nicobar Islands",
            keywords: [
                "andaman",
                "andaman nicobar",
                "port blair"
            ],
            url: "states/union-territories/andaman-nicobar.html"
        },

        {
            name: "Chandigarh",
            keywords: ["chandigarh"],
            url: "states/union-territories/chandigarh.html"
        },

        {
            name: "Dadra & Nagar Haveli and Daman & Diu",
            keywords: [
                "daman",
                "diu",
                "dadra",
                "nagar haveli"
            ],
            url: "states/union-territories/dadra-nagar-haveli-daman-diu.html"
        },

        {
            name: "Delhi",
            keywords: [
                "delhi",
                "new delhi"
            ],
            url: "states/union-territories/delhi.html"
        },

        {
            name: "Jammu & Kashmir",
            keywords: [
                "jammu",
                "kashmir",
                "jammu kashmir",
                "srinagar"
            ],
            url: "states/union-territories/jammu-kashmir.html"
        },

        {
            name: "Ladakh",
            keywords: [
                "ladakh",
                "leh"
            ],
            url: "states/union-territories/ladakh.html"
        },

        {
            name: "Lakshadweep",
            keywords: [
                "lakshadweep"
            ],
            url: "states/union-territories/lakshadweep.html"
        },

        {
            name: "Puducherry",
            keywords: [
                "puducherry",
                "pondicherry"
            ],
            url: "states/union-territories/puducherry.html"
        },


        /* ================= DESTINATIONS ================= */

        {
            name: "Taj Mahal",
            keywords: [
                "taj mahal",
                "tajmahal",
                "agra"
            ],
            url: "destinations/taj-mahal.html"
        },

        {
            name: "Varanasi",
            keywords: [
                "varanasi",
                "banaras",
                "kashi"
            ],
            url: "destinations/varanasi.html"
        },

        {
            name: "Jaipur",
            keywords: [
                "jaipur",
                "pink city"
            ],
            url: "destinations/jaipur.html"
        },

        {
            name: "Manali",
            keywords: [
                "manali"
            ],
            url: "destinations/manali.html"
        },

        {
            name: "Udaipur",
            keywords: [
                "udaipur"
            ],
            url: "destinations/udaipur.html"
        },

        {
            name: "Goa Beaches",
            keywords: [
                "goa beach",
                "goa beaches",
                "baga beach"
            ],
            url: "destinations/goa-beaches.html"
        },

        {
            name: "Kerala Backwaters",
            keywords: [
                "kerala backwaters",
                "backwaters",
                "alleppey",
                "alappuzha"
            ],
            url: "destinations/kerala-backwaters.html"
        }

    ];


    /* =====================================================
       SEARCH FUNCTION
       ===================================================== */

    function performSearch() {

        if (!searchInput) return;

        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        if (query === "") {

            searchInput.focus();

            return;

        }


        /* Find matching result */

        const result =
            searchData.find(item => {

                if (
                    item.name
                        .toLowerCase()
                        .includes(query)
                ) {
                    return true;
                }


                return item.keywords.some(keyword =>
                    keyword.toLowerCase().includes(query) ||
                    query.includes(keyword.toLowerCase())
                );

            });


        /* Open result */

        if (result) {

            window.location.href = result.url;

            return;

        }


        /* No result */

        alert(
            `No result found for "${searchInput.value}".\n\nTry searching for a state, city or destination.`
        );

    }


    /* =====================================================
       SEARCH BUTTON
       ===================================================== */

    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            performSearch
        );

    }


    /* =====================================================
       ENTER KEY
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    performSearch();

                }

            }
        );

    }

});