(() => {const API_BASE = "/api";

    const state = {
        open: false,
        loading: false,
        data: {
            destinations: [],
            food: [],
            culture: [],
            festivals: [],
            guides: []
        }
    };

    function createBot() {
        if (document.getElementById("tb-ai-toggle")) return;

        const toggle = document.createElement("button");
        toggle.id = "tb-ai-toggle";
        toggle.type = "button";
        toggle.innerHTML = "🤖";
        toggle.setAttribute("aria-label", "Open TravelBharat AI Assistant");

        const chat = document.createElement("div");
        chat.id = "tb-ai-chat";

        chat.innerHTML = `
            <div class="tb-ai-header">
                <div class="tb-ai-brand">
                    <div class="tb-ai-avatar">🤖</div>
                    <div>
                        <div class="tb-ai-title">TravelBharat AI</div>
                        <div class="tb-ai-status">● Your travel assistant</div>
                    </div>
                </div>

                <button id="tb-ai-close" type="button">×</button>
            </div>

            <div class="tb-ai-messages" id="tb-ai-messages">
                <div class="tb-ai-message bot">
                    <div class="tb-ai-bubble">
                        👋 Namaste! Main <b>TravelBharat AI</b> hoon.<br><br>
                        Main aapko destinations, food, culture, festivals aur travel tips ke baare mein help kar sakta hoon.
                    </div>
                </div>
            </div>

            <div class="tb-ai-suggestions">
                <button class="tb-ai-suggestion">3 day Goa trip</button>
                <button class="tb-ai-suggestion">Best places in India</button>
                <button class="tb-ai-suggestion">Famous Indian food</button>
                <button class="tb-ai-suggestion">Travel tips</button>
            </div>

            <div class="tb-ai-input-area">
                <input
                    id="tb-ai-input"
                    type="text"
                    placeholder="Ask anything about India..."
                    autocomplete="off"
                >
                <button id="tb-ai-send" type="button">➤</button>
            </div>
        `;

        document.body.appendChild(toggle);
        document.body.appendChild(chat);

        toggle.addEventListener("click", toggleChat);

        document
            .getElementById("tb-ai-close")
            .addEventListener("click", closeChat);

        document
            .getElementById("tb-ai-send")
            .addEventListener("click", sendMessage);

        document
            .getElementById("tb-ai-input")
            .addEventListener("keydown", event => {
                if (event.key === "Enter") {
                    sendMessage();
                }
            });

        document.querySelectorAll(".tb-ai-suggestion").forEach(button => {
            button.addEventListener("click", () => {
                document.getElementById("tb-ai-input").value = button.textContent;
                sendMessage();
            });
        });

        loadTravelData();
    }

    function toggleChat() {
        state.open = !state.open;

        const chat = document.getElementById("tb-ai-chat");

        if (state.open) {
            chat.classList.add("active");
            setTimeout(() => {
                document.getElementById("tb-ai-input")?.focus();
            }, 100);
        } else {
            chat.classList.remove("active");
        }
    }

    function closeChat() {
        state.open = false;
        document.getElementById("tb-ai-chat")?.classList.remove("active");
    }

    async function loadTravelData() {
        const requests = [
            fetchData("/destinations", "destinations"),
            fetchData("/food", "food"),
            fetchData("/culture", "culture"),
            fetchData("/festivals", "festivals"),
            fetchData("/travel-guide", "guides")
        ];

        await Promise.allSettled(requests);
    }

    async function fetchData(endpoint, key) {
        try {
            const response = await fetch(`${API_BASE}${endpoint}`);

            if (!response.ok) return;

            const result = await response.json();

            if (Array.isArray(result)) {
                state.data[key] = result;
            } else if (Array.isArray(result.data)) {
                state.data[key] = result.data;
            } else if (Array.isArray(result.destinations)) {
                state.data[key] = result.destinations;
            } else if (Array.isArray(result.guides)) {
                state.data[key] = result.guides;
            } else if (Array.isArray(result.food)) {
                state.data[key] = result.food;
            } else if (Array.isArray(result.culture)) {
                state.data[key] = result.culture;
            } else if (Array.isArray(result.festivals)) {
                state.data[key] = result.festivals;
            }
        } catch (error) {
            console.warn(`TravelBharat AI: ${endpoint} unavailable`);
        }
    }

    async function sendMessage() {
        if (state.loading) return;

        const input = document.getElementById("tb-ai-input");
        const message = input.value.trim();

        if (!message) return;

        input.value = "";

        addMessage(message, "user");

        showTyping();

        state.loading = true;

        document.getElementById("tb-ai-send").disabled = true;

        try {
            const answer = await generateAnswer(message);

            removeTyping();

            addMessage(answer, "bot");
        } catch (error) {
            removeTyping();

            addMessage(
                "Sorry, abhi mujhe response generate karne mein problem aa rahi hai. Please thodi der baad try karein.",
                "bot"
            );
        }

        state.loading = false;

        document.getElementById("tb-ai-send").disabled = false;
    }

    async function generateAnswer(question) {
        const q = question.toLowerCase();

        if (
            q.includes("hello") ||
            q.includes("hi") ||
            q.includes("hey") ||
            q.includes("namaste")
        ) {
            return `
                👋 Namaste! Welcome to <b>TravelBharat</b>.<br><br>
                Main aapki India travel planning mein help kar sakta hoon.
                Aap destination, food, culture, festivals ya itinerary ke baare mein pooch sakte hain.
            `;
        }

        if (
            q.includes("goa") ||
            q.includes("varanasi") ||
            q.includes("jaipur") ||
            q.includes("udaipur") ||
            q.includes("manali") ||
            q.includes("kerala") ||
            q.includes("ladakh") ||
            q.includes("agra") ||
            q.includes("taj")
        ) {
            return searchDestinations(question);
        }

        if (
            q.includes("food") ||
            q.includes("khana") ||
            q.includes("dish") ||
            q.includes("cuisine") ||
            q.includes("biryani") ||
            q.includes("thali")
        ) {
            return searchFood(question);
        }

        if (
            q.includes("festival") ||
            q.includes("holi") ||
            q.includes("diwali") ||
            q.includes("culture") ||
            q.includes("tradition")
        ) {
            return searchCultureAndFestivals(question);
        }

        if (
            q.includes("travel tip") ||
            q.includes("safety") ||
            q.includes("packing") ||
            q.includes("transport") ||
            q.includes("budget") ||
            q.includes("best time")
        ) {
            return searchGuides(question);
        }

        if (
            q.includes("trip") ||
            q.includes("itinerary") ||
            q.includes("plan") ||
            q.includes("days") ||
            q.includes("day trip")
        ) {
            return createTripPlan(question);
        }

        return genericAnswer(question);
    }

    function searchDestinations(question) {
        const results = findMatching(
            state.data.destinations,
            question
        );

        if (!results.length) {
            return `
                🗺️ Aap kis destination ke baare mein jaana chahte hain?<br><br>
                Example:<br>
                • Varanasi<br>
                • Goa<br>
                • Jaipur<br>
                • Manali<br>
                • Kerala
            `;
        }

        return results.slice(0, 3).map(item => {
            return `
                <b>📍 ${escapeHTML(item.name || item.title || "Destination")}</b><br>
                ${escapeHTML(
                    item.description ||
                    item.shortDescription ||
                    item.details ||
                    "Beautiful destination in India."
                )}
            `;
        }).join("<br><br>");
    }

    function searchFood(question) {
        const results = findMatching(state.data.food, question);

        if (!results.length) {
            return `
                🍛 India has amazing regional cuisines.<br><br>
                Aap kisi state ya dish ka naam pooch sakte hain, jaise:
                <b>UP food, Rajasthan food, Karnataka food, Biryani</b>.
            `;
        }

        return results.slice(0, 3).map(item => `
            <b>🍛 ${escapeHTML(item.name || item.title || "Indian Food")}</b><br>
            ${escapeHTML(
                item.description ||
                item.details ||
                item.about ||
                "Famous Indian cuisine."
            )}
        `).join("<br><br>");
    }

    function searchCultureAndFestivals(question) {
        const culture = findMatching(state.data.culture, question);
        const festivals = findMatching(state.data.festivals, question);

        const results = [...culture, ...festivals].slice(0, 3);

        if (!results.length) {
            return `
                🇮🇳 India has a rich culture and many colourful festivals.<br><br>
                Aap kisi state, festival ya tradition ka naam pooch sakte hain.
            `;
        }

        return results.map(item => `
            <b>🎉 ${escapeHTML(item.name || item.title || "Indian Culture")}</b><br>
            ${escapeHTML(
                item.description ||
                item.details ||
                item.about ||
                "Explore the rich culture of India."
            )}
        `).join("<br><br>");
    }

    function searchGuides(question) {
        const results = findMatching(state.data.guides, question);

        if (!results.length) {
            return `
                🎒 Travel ke liye main aapko help kar sakta hoon:
                <br><br>
                • Best time to travel<br>
                • Budget travel<br>
                • Transport<br>
                • Packing<br>
                • Travel safety<br>
                • Responsible travel
            `;
        }

        return results.slice(0, 2).map(item => `
            <b>🧭 ${escapeHTML(item.title || item.name || "Travel Guide")}</b><br>
            ${escapeHTML(
                item.description ||
                item.intro ||
                item.details ||
                "Useful travel information."
            )}
        `).join("<br><br>");
    }

    function createTripPlan(question) {
        const daysMatch = question.match(/(\d+)\s*(day|days|din)/i);
        const days = daysMatch ? Number(daysMatch[1]) : 3;

        let destination = "India";

        const destinations = [
            "goa",
            "varanasi",
            "jaipur",
            "udaipur",
            "manali",
            "kerala",
            "agra",
            "ladakh"
        ];

        const found = destinations.find(item =>
            question.toLowerCase().includes(item)
        );

        if (found) {
            destination =
                found.charAt(0).toUpperCase() + found.slice(1);
        }

        if (destination === "India") {
            return `
                🗺️ Main aapke liye trip plan bana sakta hoon!<br><br>
                Bas destination aur duration bataiye.<br><br>
                Example:<br>
                <b>"3 din ka Goa trip plan banao"</b><br>
                <b>"5 din Varanasi trip plan"</b>
            `;
        }

        const plans = {
            Goa: [
                "Arrival + Baga/Calangute Beach",
                "North Goa sightseeing + Fort Aguada",
                "South Goa + beach sunset"
            ],
            Varanasi: [
                "Kashi Vishwanath + Ganga Aarti",
                "Sarnath + old city exploration",
                "Ghats + local food + shopping"
            ],
            Jaipur: [
                "Amber Fort + Jal Mahal",
                "City Palace + Hawa Mahal",
                "Markets + local Rajasthani food"
            ],
            Udaipur: [
                "City Palace + Lake Pichola",
                "Saheliyon Ki Bari + local sightseeing",
                "Monsoon Palace + sunset"
            ],
            Manali: [
                "Mall Road + Hadimba Temple",
                "Solang Valley",
                "Local sightseeing + shopping"
            ],
            Kerala: [
                "Kochi sightseeing",
                "Alleppey backwaters",
                "Munnar exploration"
            ],
            Agra: [
                "Taj Mahal sunrise",
                "Agra Fort + local markets",
                "Fatehpur Sikri"
            ],
            Ladakh: [
                "Leh local sightseeing",
                "Nubra Valley",
                "Pangong Lake"
            ]
        };

        const plan = plans[destination] || plans.Goa;

        let html = `<b>🗺️ ${days}-Day ${destination} Trip</b><br><br>`;

        for (let i = 0; i < days; i++) {
            const activity = plan[i % plan.length];
            html += `<b>Day ${i + 1}:</b> ${activity}<br>`;
        }

        html += `
            <br>💡 Tip: Travel time, hotel location aur local transport ko pehle plan karein.
        `;

        return html;
    }

    function genericAnswer(question) {
        const keywords = extractKeywords(question);

        const allData = [
            ...state.data.destinations,
            ...state.data.food,
            ...state.data.culture,
            ...state.data.festivals,
            ...state.data.guides
        ];

        const results = allData.filter(item => {
            const text = JSON.stringify(item).toLowerCase();

            return keywords.some(keyword =>
                text.includes(keyword)
            );
        });

        if (results.length) {
            const item = results[0];

            return `
                <b>${escapeHTML(item.name || item.title || "TravelBharat")}</b><br><br>
                ${escapeHTML(
                    item.description ||
                    item.intro ||
                    item.details ||
                    "TravelBharat par is topic ke baare mein aur information available hai."
                )}
            `;
        }

        return `
            🤖 Main abhi mainly <b>India travel</b> related questions mein help karta hoon.<br><br>
            Aap mujhse ye pooch sakte hain:<br>
            📍 Destinations<br>
            🍛 Food<br>
            🎉 Culture & Festivals<br>
            🧳 Travel Guides<br>
            🗺️ Trip Plans
        `;
    }

    function findMatching(data, question) {
        const keywords = extractKeywords(question);

        return data.filter(item => {
            const text = JSON.stringify(item).toLowerCase();

            return keywords.some(keyword =>
                keyword.length > 2 && text.includes(keyword)
            );
        });
    }

    function extractKeywords(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, " ")
            .split(/\s+/)
            .filter(word =>
                word.length > 2 &&
                ![
                    "the",
                    "and",
                    "for",
                    "what",
                    "where",
                    "when",
                    "how",
                    "can",
                    "hai",
                    "kya",
                    "ka",
                    "ke",
                    "ki",
                    "me",
                    "mujhe",
                    "batao",
                    "please",
                    "about"
                ].includes(word)
            );
    }

    function addMessage(text, type) {
        const container = document.getElementById("tb-ai-messages");

        const message = document.createElement("div");
        message.className = `tb-ai-message ${type}`;

        const bubble = document.createElement("div");
        bubble.className = "tb-ai-bubble";

        if (type === "user") {
            bubble.textContent = text;
        } else {
            bubble.innerHTML = text;
        }

        message.appendChild(bubble);
        container.appendChild(message);

        container.scrollTop = container.scrollHeight;
    }

    function showTyping() {
        const container = document.getElementById("tb-ai-messages");

        if (document.getElementById("tb-ai-typing")) return;

        const message = document.createElement("div");
        message.id = "tb-ai-typing";
        message.className = "tb-ai-message bot";

        message.innerHTML = `
            <div class="tb-ai-bubble">
                <div class="tb-ai-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        container.appendChild(message);
        container.scrollTop = container.scrollHeight;
    }

    function removeTyping() {
        document.getElementById("tb-ai-typing")?.remove();
    }

    function escapeHTML(value) {
        const div = document.createElement("div");
        div.textContent = String(value ?? "");
        return div.innerHTML;
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", createBot);
    } else {
        createBot();
    }
})();

