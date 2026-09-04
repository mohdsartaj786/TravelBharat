document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    if (!form) {
        console.error("Register form not found");
        return;
    }

    const API_URL = "http://localhost:5000";

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("registerEmail");
    const passwordInput = document.getElementById("registerPassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const termsInput = document.getElementById("terms");

    const registerPasswordToggle = document.getElementById(
        "registerPasswordToggle"
    );

    const confirmPasswordToggle = document.getElementById(
        "confirmPasswordToggle"
    );

    const togglePassword = (input, toggle) => {
        if (!input || !toggle) return;

        toggle.addEventListener("click", () => {
            const isPassword = input.type === "password";

            input.type = isPassword ? "text" : "password";
            toggle.textContent = isPassword ? "Hide" : "Show";

            toggle.setAttribute(
                "aria-label",
                isPassword ? "Hide password" : "Show password"
            );
        });
    };

    togglePassword(
        passwordInput,
        registerPasswordToggle
    );

    togglePassword(
        confirmPasswordInput,
        confirmPasswordToggle
    );

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!name) {
            alert("Please enter your name.");
            nameInput.focus();
            return;
        }

        if (name.length < 2) {
            alert("Name must contain at least 2 characters.");
            nameInput.focus();
            return;
        }

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

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            passwordInput.focus();
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            confirmPasswordInput.focus();
            return;
        }

        if (termsInput && !termsInput.checked) {
            alert("Please accept the Terms and Privacy Policy.");
            return;
        }

        const button = form.querySelector(".register-btn");
        const buttonText = button
            ? button.querySelector("span")
            : null;

        if (button) {
            button.disabled = true;
        }

        if (buttonText) {
            buttonText.textContent = "Creating Account...";
        }

        try {
            const response = await fetch(
                `${API_URL}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            console.log("Registration response:", data);

            if (!response.ok) {
                throw new Error(
                    data.message || "Registration failed"
                );
            }

            alert(
                "Registration successful! Please login to continue."
            );

            window.location.href = "login.html";

        } catch (error) {
            console.error(
                "Registration Error:",
                error
            );

            alert(
                error.message ||
                "Unable to connect to TravelBharat server."
            );

        } finally {
            if (button) {
                button.disabled = false;
            }

            if (buttonText) {
                buttonText.textContent = "Create My Account";
            }
        }
    });
});

