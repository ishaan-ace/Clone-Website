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
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const volumeSlider = document.getElementById("volume");

// Initialize volume
if (volumeSlider) {
    audioPlayer.volume = volumeSlider.value / 100;
    volumeSlider.addEventListener("input", () => {
        audioPlayer.volume = volumeSlider.value / 100;
    });
}

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

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function syncProgress() {
    if (!audioPlayer.duration || Number.isNaN(audioPlayer.duration)) return;
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    if (totalTimeEl) totalTimeEl.textContent = formatTime(audioPlayer.duration);
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
audioPlayer.addEventListener("loadedmetadata", () => {
    if (totalTimeEl) totalTimeEl.textContent = formatTime(audioPlayer.duration);
    if (currentTimeEl) currentTimeEl.textContent = formatTime(0);
});
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

// Removed static card play button listeners

document.getElementById("prev").addEventListener("click", playPreviousSong);
document.getElementById("next").addEventListener("click", playNextSong);

// Modal Logic
const modalOverlay = document.getElementById('playlistModal');
const closeModalBtn = modalOverlay.querySelector('.close-modal');

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});

function openPlaylistModal(playlist) {
    if (!playlist) return;
    
    document.getElementById('modalCover').src = playlist.cover || '';
    document.getElementById('modalTitle').textContent = playlist.name || 'Unknown Playlist';
    document.getElementById('modalArtist').textContent = playlist.artist || 'Various Artists';
    
    const songsList = document.getElementById('modalSongsList');
    songsList.innerHTML = '';
    
    if (playlist.songs && playlist.songs.length > 0) {
        playlist.songs.forEach((song, index) => {
            const songEl = document.createElement('div');
            songEl.className = 'modal-song-item';
            songEl.innerHTML = `
                <img src="${song.cover || playlist.cover || ''}" alt="">
                <div class="modal-song-info">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
                <div class="modal-song-duration">${song.duration || ''}</div>
            `;
            
            songEl.addEventListener('click', () => {
                playPlaylist(playlist, index);
            });
            
            songsList.appendChild(songEl);
        });
    } else {
        songsList.innerHTML = '<p style="color: #b3b3b3; padding: 10px;">No songs in this playlist.</p>';
    }
    
    modalOverlay.style.display = 'flex';
}

const playlistContainer = document.getElementById("playlistContainer");
if (playlistContainer && playlistData) {
    playlistContainer.innerHTML = '';
    playlistData.forEach(playlist => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = playlist.id;
        
        card.innerHTML = `
            <button class="card-play-btn">&#9658;</button>
            <img src="${playlist.cover || 'Images/arz kiya hai.jpg'}" alt="${playlist.name}">
            <div class="info">
                <h4 class="fontc">${playlist.name}</h4>
                <p>${playlist.artist}</p>
            </div>
        `;
        
        card.addEventListener("click", (e) => {
            if (e.target.closest('.card-play-btn')) return;
            openPlaylistModal(playlist);
        });
        
        const playBtn = card.querySelector(".card-play-btn");
        if (playBtn) {
            playBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                if (playlist?.songs?.length) {
                    playPlaylist(playlist, 0);
                } else {
                    console.error("No audio source found for this playlist.");
                }
            });
        }
        
        playlistContainer.appendChild(card);
    });
}
