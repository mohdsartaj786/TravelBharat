const API_URL = "http://localhost:5000/api/auth";

document.addEventListener("DOMContentLoaded", () => {
    loadProfile();

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", logoutUser);
    }
});

async function loadProfile() {
    const token = localStorage.getItem("travelBharatToken");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        console.log("Profile Response:", data);

        if (response.status === 401) {
            localStorage.removeItem("travelBharatToken");
            localStorage.removeItem("travelBharatUser");

            alert("Your login session has expired.");
            window.location.href = "login.html";
            return;
        }

        if (!response.ok || !data.success) {
            alert(data.message || "Unable to load profile.");
            return;
        }

        const user = data.user;

        const name = user.name || "User";
        const email = user.email || "user@example.com";

        document.getElementById("profileName").textContent = name;
        document.getElementById("profileEmail").textContent = email;

        document.getElementById("infoName").textContent = name;
        document.getElementById("infoEmail").textContent = email;

        const avatar = document.getElementById("profileAvatar");

        if (avatar) {
            avatar.textContent = name.charAt(0).toUpperCase();
        }

        localStorage.setItem(
            "travelBharatUser",
            JSON.stringify(user)
        );

    } catch (error) {
        console.error("Profile Error:", error);

        alert(
            "Server se connection nahi ho raha.\n" +
            "Check karo backend server running hai."
        );
    }
}


function logoutUser() {
    const confirmLogout = confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmLogout) {
        return;
    }

    localStorage.removeItem("travelBharatToken");
    localStorage.removeItem("travelBharatUser");

    window.location.href = "login.html";
}