document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach((carousel) => {
        const container = carousel.querySelector(".cont_cards");
        const leftBtn = carousel.querySelector(".left-btn");
        const rightBtn = carousel.querySelector(".right-btn");

        if (!container || !leftBtn || !rightBtn) return;

        leftBtn.addEventListener("click", (event) => {
            event.preventDefault();
            container.scrollBy({
                left: -800,
                behavior: "smooth"
            });
        });

        rightBtn.addEventListener("click", (event) => {
            event.preventDefault();
            container.scrollBy({
                left: 800,
                behavior: "smooth"
            });
        });
    });
});