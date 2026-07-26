document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("cont_cards");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    if (!container || !leftBtn || !rightBtn) return;

    leftBtn.addEventListener("click", () => {
        container.scrollBy({
            left: -800,
            behavior: "smooth"
        });
    });

    rightBtn.addEventListener("click", () => {
        container.scrollBy({
            left: 800,
            behavior: "smooth"
        });
    });
});