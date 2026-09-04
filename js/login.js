document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    if (!form) {
        console.error("Login form not found");
        return;
    }

    const API_URL = "http://localhost:5000";

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const passwordToggle = document.getElementById("passwordToggle");

    if (passwordToggle) {
        passwordToggle.addEventListener("click", () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                passwordToggle.textContent = "Hide";
                passwordToggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );
            } else {
                passwordInput.type = "password";
                passwordToggle.textContent = "Show";
                passwordToggle.setAttribute(
                    "aria-label",
                    "Show password"
                );
            }
        });
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email) {
            alert("Please enter your email.");
            emailInput.focus();
            return;
        }

        if (!password) {
            alert("Please enter your password.");
            passwordInput.focus();
            return;
        }

        const button = form.querySelector(".login-btn");
        const buttonText = button
            ? button.querySelector("span:first-child")
            : null;

        if (button) {
            button.disabled = true;
        }

        if (buttonText) {
            buttonText.textContent = "Signing In...";
        }

        try {
            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            console.log("Login response:", data);

            if (!response.ok) {
                throw new Error(
                    data.message || "Invalid email or password"
                );
            }

            if (!data.token) {
                throw new Error(
                    "Login successful, but authentication token was not received."
                );
            }

            localStorage.setItem(
                "travelBharatToken",
                data.token
            );

            localStorage.setItem(
                "travelBharatUser",
                JSON.stringify(data.user)
            );

            alert("Login successful!");

            window.location.href = "index.html";

        } catch (error) {
            console.error("Login Error:", error);

            alert(
                error.message ||
                "Unable to connect to TravelBharat server."
            );

        } finally {
            if (button) {
                button.disabled = false;
            }

            if (buttonText) {
                buttonText.textContent = "Login to TravelBharat";
            }
        }
    });
});
