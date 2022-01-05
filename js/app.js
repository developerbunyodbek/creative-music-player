// SELECTORS
const musicContainer = document.querySelector("#music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#music");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const bigImage = document.querySelector("#player-big-image");

// MUSICS TITLES
const songs = [
  "Allahu-Allah",
  "Alone, Pt. II",
  "Babel",
  "Maktabimda",
  "Moonlight",
  "Whoopty",
];

let songIndex = 0;

// LOAD MUSIC DETAILS
loadSong(songs[songIndex]);

// UPDATE MUSIC DETAILS
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
  bigImage.src = `images/${song}.jpg`;
}

// EVENT LISTENER
// PLAY
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// PLAYSONG FUNCTION
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

// PAUSESONG FUNCTION
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

// CHANGE MUSIC
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length + 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// TIME MUSIC UPTADE
audio.addEventListener("timeupdate", uptadeProgress);
function uptadeProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// CLICK ON PROGRESSBAR
progressContainer.addEventListener("click", setProgress);
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
