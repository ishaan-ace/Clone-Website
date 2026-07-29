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


const audioPlayer = document.getElementById("audioPlayer");
const coverImage = document.getElementById("cover");
const titleElement = document.getElementById("title");
const artistElement = document.getElementById("artist");
const playPauseBtn = document.getElementById("playPause");
const progressBar = document.getElementById("progress");

const songsObj = window.songs || (typeof songs !== "undefined" ? songs : null);

function updateBottomPlayer({ title, artist, cover }) {
    if (cover) coverImage.src = cover;
    if (title) titleElement.textContent = title;
    if (artist) artistElement.textContent = artist;
}

function getCardInfo(card) {
    const songId = card.dataset.id;
    let songData = null;

    if (songId && songsObj) {
        songData = songsObj[songId];
        if (Array.isArray(songData)) {
            songData = songData[0];
        }
    }

    const songSrc = card.dataset.song || songData?.src;
    const title = card.dataset.title || songData?.title || card.querySelector(".info h4")?.textContent.trim();
    const artist = card.dataset.artist || songData?.artist || card.querySelector(".info p")?.textContent.trim();
    const cover = card.dataset.cover || songData?.cover || card.querySelector("img")?.src;

    return { songSrc, title, artist, cover };
}

function setPlayerState(isPlaying) {
    playPauseBtn.textContent = isPlaying ? "❚❚" : "▶";
}

function syncProgress() {
    if (!audioPlayer.duration || Number.isNaN(audioPlayer.duration)) return;
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
}

playPauseBtn.addEventListener("click", () => {
    if (!audioPlayer.src) return;
    if (audioPlayer.paused) {
        audioPlayer.play().catch(error => console.error("Audio playback failed:", error));
    } else {
        audioPlayer.pause();
    }
});

audioPlayer.addEventListener("play", () => setPlayerState(true));
audioPlayer.addEventListener("pause", () => setPlayerState(false));
audioPlayer.addEventListener("ended", () => setPlayerState(false));
audioPlayer.addEventListener("timeupdate", syncProgress);

progressBar.addEventListener("input", () => {
    if (!audioPlayer.duration || Number.isNaN(audioPlayer.duration)) return;
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

document.querySelectorAll(".card-play-btn").forEach(button => {
    button.addEventListener("click", () => {
        const card = button.closest(".card");
        const { songSrc, title, artist, cover } = getCardInfo(card);

        if (!songSrc) {
            console.error("No audio source found for this card. Add data-song or a valid data-id.");
            return;
        }

        audioPlayer.src = songSrc;
        audioPlayer.load();
        updateBottomPlayer({ title, artist, cover });
        audioPlayer.play().catch(error => console.error("Audio playback failed:", error));
    });
});


