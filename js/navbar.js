document.addEventListener("DOMContentLoaded", () => {
    updateNavbar();
    setupMobileMenu();
});

function updateNavbar() {
    const token = localStorage.getItem("travelBharatToken");
    const userData = localStorage.getItem("travelBharatUser");

    const loginButtons = document.querySelectorAll(".login-btn");

    if (!loginButtons.length) return;

    if (token && userData) {
        try {
            const user = JSON.parse(userData);
            const userName = user.name || "Profile";

            loginButtons.forEach(button => {
                button.textContent = `👤 ${userName}`;
                button.href = "profile.html";
                button.classList.add("user-login");
            });

        } catch (error) {
            console.error("Invalid user data:", error);

            clearUserSession(loginButtons);
        }

    } else {
        loginButtons.forEach(button => {
            button.textContent = "Login";
            button.href = "login.html";
            button.classList.remove("user-login");
        });
    }
}

function clearUserSession(buttons) {
    localStorage.removeItem("travelBharatToken");
    localStorage.removeItem("travelBharatUser");

    buttons.forEach(button => {
        button.textContent = "Login";
        button.href = "login.html";
        button.classList.remove("user-login");
    });
}

function setupMobileMenu() {
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        menuBtn.classList.toggle("active");
    });
}