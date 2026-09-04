document.addEventListener("DOMContentLoaded", () => {
    const favoriteBtn = document.getElementById("favoriteBtn");

    console.log("Favorite button:", favoriteBtn);

    if (!favoriteBtn) return;

    favoriteBtn.addEventListener("click", () => {
        alert("BUTTON CLICK HO RAHA HAI!");
    });
});