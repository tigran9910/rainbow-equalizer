const musicContainer = document.querySelector(".player-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const volumeBtn = document.querySelector("#volume");
const audioS = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const volume = document.querySelector(".volume-progress");
const progressContainer = document.querySelector(".progress-bar");
const volumeContainer = document.querySelector(".volume-bar");
const title = document.querySelector(".song-title");
const songMenu = document.querySelector(".song-menu");
const volumeDivide = 3;

//Song titles
const songs = [
  "Lost Sky - Fearless pt.II (feat. Chris Linton)",
  "Sub Urban - Cradles",
  "DEAF KEV - Invincible",
  "Disfigure - Blank",
  "Fade - Alan Walker",
  "Spectre - Alan Walker",
  "Cartoon - Why We Lose (feat. Coleman Trapp)",
  "Different Heaven & EH!DE - My Heart",
  "Sky High - Elektronomia",
  "Warriyo - Mortals (feat. Laura Brehm)",
];

//Keep track of the songs
let songIndex = 0;
audioS.volume = 0.3 / volumeDivide;
let audioVolumeSave = audioS.volume * 100;
let isMuted = false;

//Initially load song into DOM
loadSong(songs[songIndex]);

//Update song details

function loadSong(song) {
  title.innerText = song;
  audioS.src = `https://tigran9910.github.io/rainbow-equalizer/music/${song}.mp3`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audioS.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");

  audioS.pause();
}

function prevSong() {
  songMenu
    .querySelector(`.${CSS.escape(songIndex)}`)
    .classList.remove("active-song");

  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  songMenu
    .querySelector(`.${CSS.escape(songIndex)}`)
    .classList.add("active-song");

  loadSong(songs[songIndex]);

  playSong();
}
function nextSong() {
  songMenu
    .querySelector(`.${CSS.escape(songIndex)}`)
    .classList.remove("active-song");

  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  songMenu
    .querySelector(`.${CSS.escape(songIndex)}`)
    .classList.add("active-song");

  loadSong(songs[songIndex]);

  playSong();
}

async function setSongMenu() {
  songs.map((song) => {
    let newbtn = document.createElement("button");
    newbtn.innerHTML = song;
    songMenu.appendChild(newbtn);
  });
}

function changeActiveSong(newActive) {
  const allSongButtons = songMenu.querySelectorAll("button");
  allSongButtons.forEach((button) => {
    if (button.classList.contains("active-song")) {
      button.classList.remove("active-song");
    }
  });
  newActive.classList.add("active-song");
}

function activeSongFunc(button) {
  changeActiveSong(button);
  songIndex = button.classList[0];
  loadSong(songs[songIndex]);
  playSong();
}

setSongMenu().then(() => {
  const allSongButtons = songMenu.querySelectorAll("button");
  allSongButtons.forEach((button, index) => {
    button.addEventListener("click", () => activeSongFunc(button));
    button.classList.add(index);
    if (index == 0) button.classList.add("active-song");
  });
});

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioS.duration;

  audioS.currentTime = (clickX / width) * duration;
}

function setVolume(e) {
  const widthV = this.clientWidth;
  const clickXV = e.offsetX;

  audioS.volume = clickXV / widthV / volumeDivide;
  audioVolumeSave = audioS.volume * 100;
  if (volumeBtn.querySelector("i.fas").classList.contains("fa-volume-mute")) {
    volumeBtn.querySelector("i.fas").classList.remove("fa-volume-mute");
    volumeBtn.querySelector("i.fas").classList.add("fa-volume-up");
  }
  volume.style.width = `${audioVolumeSave * volumeDivide}%`;
}

function setMuteUnmute() {
  if (volumeBtn.querySelector("i.fas").classList.contains("fa-volume-up")) {
    audioS.volume = 0;
    volumeBtn.querySelector("i.fas").classList.remove("fa-volume-up");
    volumeBtn.querySelector("i.fas").classList.add("fa-volume-mute");
  } else {
    audioS.volume = audioVolumeSave / 100;
    volumeBtn.querySelector("i.fas").classList.remove("fa-volume-mute");
    volumeBtn.querySelector("i.fas").classList.add("fa-volume-up");
  }
}

//Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//Change song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audioS.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audioS.addEventListener("ended", nextSong);

//Volume settings
volumeContainer.addEventListener("click", setVolume);

volumeBtn.addEventListener("click", setMuteUnmute);

const menuBtn = document.querySelector("#menu");
menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  songMenu.classList.toggle("closed");
}
