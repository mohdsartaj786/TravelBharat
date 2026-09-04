/* =========================================================
   TRAVELBHARAT - AUTHENTICATION
   File: js/auth.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       STORAGE KEYS
    ===================================================== */

    const USERS_KEY = "travelBharatUsers";
    const CURRENT_USER_KEY = "travelBharatCurrentUser";


    /* =====================================================
       GET USERS
    ===================================================== */

    function getUsers() {

        try {

            const users =
                JSON.parse(
                    localStorage.getItem(USERS_KEY)
                );

            return Array.isArray(users)
                ? users
                : [];

        } catch (error) {

            console.error(
                "Unable to load users:",
                error
            );

            return [];

        }

    }


    /* =====================================================
       SAVE USERS
    ===================================================== */

    function saveUsers(users) {

        localStorage.setItem(
            USERS_KEY,
            JSON.stringify(users)
        );

    }


    /* =====================================================
       GET CURRENT USER
    ===================================================== */

    function getCurrentUser() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    CURRENT_USER_KEY
                )
            );

        } catch (error) {

            return null;

        }

    }


    /* =====================================================
       REGISTER
    ===================================================== */

    const registerForm =
        document.getElementById("registerForm");


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        ?.value
                        .trim();

                const email =
                    document
                        .getElementById("email")
                        ?.value
                        .trim()
                        .toLowerCase();

                const password =
                    document
                        .getElementById("password")
                        ?.value;


                if (!name || !email || !password) {

                    alert(
                        "Please fill all fields."
                    );

                    return;

                }


                if (password.length < 6) {

                    alert(
                        "Password must contain at least 6 characters."
                    );

                    return;

                }


                const users =
                    getUsers();


                const existingUser =
                    users.find(
                        user =>
                            user.email === email
                    );


                if (existingUser) {

                    alert(
                        "An account with this email already exists."
                    );

                    return;

                }


                const newUser = {

                    id:
                        Date.now(),

                    name:
                        name,

                    email:
                        email,

                    password:
                        password,

                    createdAt:
                        new Date().toISOString()

                };


                users.push(newUser);

                saveUsers(users);


                alert(
                    "Registration successful! Please login."
                );


                window.location.href =
                    "login.html";

            }
        );

    }


    /* =====================================================
       LOGIN
    ===================================================== */

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const email =
                    document
                        .getElementById("email")
                        ?.value
                        .trim()
                        .toLowerCase();

                const password =
                    document
                        .getElementById("password")
                        ?.value;


                if (!email || !password) {

                    alert(
                        "Please enter email and password."
                    );

                    return;

                }


                const users =
                    getUsers();


                const user =
                    users.find(
                        item =>
                            item.email === email &&
                            item.password === password
                    );


                if (!user) {

                    alert(
                        "Invalid email or password."
                    );

                    return;

                }


                /* Save logged-in user */

                const sessionUser = {

                    id:
                        user.id,

                    name:
                        user.name,

                    email:
                        user.email

                };


                localStorage.setItem(
                    CURRENT_USER_KEY,
                    JSON.stringify(sessionUser)
                );


                alert(
                    `Welcome back, ${user.name}!`
                );


                window.location.href =
                    "index.html";

            }
        );

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    const logoutButtons =
        document.querySelectorAll(
            ".logout-btn"
        );


    logoutButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();


                localStorage.removeItem(
                    CURRENT_USER_KEY
                );


                alert(
                    "You have been logged out."
                );


                window.location.href =
                    "index.html";

            }
        );

    });


    /* =====================================================
       UPDATE NAVIGATION
    ===================================================== */

    const currentUser =
        getCurrentUser();


    const loginButtons =
        document.querySelectorAll(
            ".login-btn"
        );


    if (currentUser) {

        loginButtons.forEach(button => {

            button.textContent =
                currentUser.name;

            button.href =
                "profile.html";

        });

    }


    /* =====================================================
       GLOBAL AUTH FUNCTIONS
    ===================================================== */

    window.isLoggedIn =
        function () {

            return getCurrentUser() !== null;

        };


    window.getLoggedInUser =
        function () {

            return getCurrentUser();

        };


    window.logoutUser =
        function () {

            localStorage.removeItem(
                CURRENT_USER_KEY
            );

            window.location.href =
                "index.html";

        };


});