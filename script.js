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

const playlistData = Array.isArray(window.playlists) ? window.playlists : [];
const songsObj = window.songs || (typeof songs !== "undefined" ? songs : null);
let currentPlaylist = null;
let currentSongIndex = -1;

function updateBottomPlayer({ title, artist, cover }) {
    if (cover) coverImage.src = cover;
    if (title) titleElement.textContent = title;
    if (artist) artistElement.textContent = artist;
}

function getCardInfo(card) {
    const playlistId = Number(card.dataset.id);
    const playlist = playlistData.find(item => item.id === playlistId);
    const songFromPlaylist = playlist?.songs?.[0];

    let songData = null;
    if (playlistId && songsObj) {
        songData = songsObj[playlistId];
        if (Array.isArray(songData)) {
            songData = songData[0];
        }
    }

    const songSrc = card.dataset.song || songFromPlaylist?.src || songData?.src;
    const title = card.dataset.title || songFromPlaylist?.title || songData?.title || playlist?.name || card.querySelector(".info h4")?.textContent.trim();
    const artist = card.dataset.artist || songFromPlaylist?.artist || songData?.artist || playlist?.artist || card.querySelector(".info p")?.textContent.trim();
    const cover = card.dataset.cover || songFromPlaylist?.cover || songData?.cover || playlist?.cover || card.querySelector("img")?.src;

    return { songSrc, title, artist, cover };
}

function setPlayerState(isPlaying) {
    playPauseBtn.textContent = isPlaying ? "❚❚" : "▶";
}

function playSong(song, playlist) {
    if (!song?.src) return false;

    currentPlaylist = playlist || currentPlaylist;
    audioPlayer.src = song.src;
    audioPlayer.load();
    updateBottomPlayer({
        title: song.title || playlist?.name,
        artist: song.artist || playlist?.artist,
        cover: song.cover || playlist?.cover
    });
    audioPlayer.play().catch(error => console.error("Audio playback failed:", error));
    return true;
}

function playPlaylist(playlist, startIndex = 0) {
    if (!playlist?.songs?.length) return;

    currentPlaylist = playlist;
    currentSongIndex = startIndex;
    playSong(playlist.songs[currentSongIndex], playlist);
}

function playNextSong() {
    if (!currentPlaylist?.songs?.length) return;

    currentSongIndex = (currentSongIndex + 1) % currentPlaylist.songs.length;
    playSong(currentPlaylist.songs[currentSongIndex], currentPlaylist);
}

function playPreviousSong() {
    if (!currentPlaylist?.songs?.length) return;

    currentSongIndex =
        (currentSongIndex - 1 + currentPlaylist.songs.length) %
        currentPlaylist.songs.length;

    playSong(currentPlaylist.songs[currentSongIndex], currentPlaylist);
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
audioPlayer.addEventListener("ended", () => {
    setPlayerState(false);
    if (currentPlaylist?.songs?.length) {
        currentSongIndex = (currentSongIndex + 1) % currentPlaylist.songs.length;
        playSong(currentPlaylist.songs[currentSongIndex], currentPlaylist);
    }
});
audioPlayer.addEventListener("timeupdate", syncProgress);

progressBar.addEventListener("input", () => {
    if (!audioPlayer.duration || Number.isNaN(audioPlayer.duration)) return;
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

document.querySelectorAll(".card-play-btn").forEach(button => {
    button.addEventListener("click", () => {
        const card = button.closest(".card");
        const playlistId = Number(card?.dataset.id);
        const playlist = playlistData.find(item => item.id === playlistId);

        if (playlist?.songs?.length) {
            playPlaylist(playlist, 0);
            return;
        }

        const { songSrc, title, artist, cover } = getCardInfo(card);

        if (!songSrc) {
            console.error("No audio source found for this card. Add data-song or a valid data-id.");
            return;
        }

        currentPlaylist = null;
        currentSongIndex = -1;
        audioPlayer.src = songSrc;
        audioPlayer.load();
        updateBottomPlayer({ title, artist, cover });
        audioPlayer.play().catch(error => console.error("Audio playback failed:", error));
    });
});

document.getElementById("prev").addEventListener("click", playPreviousSong);
document.getElementById("next").addEventListener("click", playNextSong);


