const loading = document.getElementById("loading");
const intro = document.getElementById("intro");
const startButton = document.getElementById("startButton");
const story = document.getElementById("story");
const timer = document.getElementById("timer");
const message = document.getElementById("message");

loading.style.display = "none";
intro.classList.remove("hidden");

startButton.addEventListener("click", () => {

    intro.style.display = "none";

    story.classList.remove("hidden");
    timer.classList.remove("hidden");

    message.innerHTML = `
        <h2>I Love You ❤️</h2>
        <p>Cao Bảo Lâm</p>
    `;

    document.body.style.background = "#000";

});
