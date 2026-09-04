document.addEventListener("DOMContentLoaded", () => {
    loadGuide();
});

async function loadGuide() {
    const loading = document.getElementById("guideLoading");

    try {
        const params = new URLSearchParams(window.location.search);
        const guideId = params.get("id");

        console.log("Guide ID:", guideId);

        if (!guideId) {
            showGuideError("Guide ID is missing.");
            return;
        }

        const response = await fetch("./data/guide-details.json", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        const guides = Array.isArray(data)
            ? data
            : data.guides || [];

        const guide = guides.find(
            item =>
                String(item.id).trim().toLowerCase() ===
                String(guideId).trim().toLowerCase()
        );

        if (!guide) {
            console.error("Guide not found:", guideId);
            console.log("Available guides:", guides);
            showGuideError(`Guide "${guideId}" was not found.`);
            return;
        }

        renderGuide(guide);

        if (loading) {
            loading.style.display = "none";
        }

    } catch (error) {
        console.error("Guide Details Error:", error);
        showGuideError("Unable to load this travel guide.");
    }
}

function renderGuide(guide) {

    setText("guideNumber", guide.number || "");
    setText("guideIcon", guide.icon || "✈️");
    setText("guideTitle", guide.title || "Travel Guide");
    setText("guideDescription", guide.description || "");
    setText("guideIntro", guide.intro || "");
    setText("guideTip", guide.tip || "");

    const sectionsContainer =
        document.getElementById("guideSections");

    if (!sectionsContainer) {
        return;
    }

    const sections = Array.isArray(guide.sections)
        ? guide.sections
        : [];

    if (!sections.length) {
        sectionsContainer.innerHTML = "";
        return;
    }

    sectionsContainer.innerHTML = sections
        .map(section => `
            <section class="guide-detail-section">
                <h3>${escapeHTML(section.title || "")}</h3>
                <p>${escapeHTML(section.content || "")}</p>
            </section>
        `)
        .join("");
}

function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}

function showGuideError(message) {

    const loading = document.getElementById("guideLoading");

    if (!loading) {
        return;
    }

    loading.style.display = "flex";

    loading.innerHTML = `
        <div class="guide-error">
            <h3>Guide Not Found</h3>
            <p>${escapeHTML(message)}</p>
        </div>
    `;
}

function escapeHTML(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}