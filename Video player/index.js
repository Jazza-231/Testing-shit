const video = document.getElementById("myVideo");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.querySelector(".progress-container");
const videoContainer = document.querySelector(".video-container");

playPauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  updateButton();
});

function updateButton() {
  if (video.paused) playPauseBtn.textContent = "Play";
  else playPauseBtn.textContent = "Pause";
}

let currentWidth;
let steps;

video.addEventListener("timeupdate", () => {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
});

video.addEventListener("pause", updateButton);

videoContainer.addEventListener("mousemove", updateTimeout);
videoContainer.addEventListener("mousedown", updateTimeout);

function updateTimeout() {
  playPauseBtn.classList.remove("hide-controls");

  clearTimeout(hideControlsTimeout);
  hideControlsTimeout = setTimeout(() => {
    playPauseBtn.classList.add("hide-controls");
  }, 2000);
}

let hideControlsTimeout;
function hidePlayButton() {
  playPauseBtn.classList.add("hide-controls");
}

hidePlayButton();

videoContainer.addEventListener("mouseout", hidePlayButton);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") video.currentTime += 5;
  else if (e.key === "ArrowLeft") video.currentTime -= 5;
  else if (e.key === " ") {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    updateButton();
  }
});

progressContainer.addEventListener("click", (e) => {
  handleSeek(e);
});

let mousedown;
progressContainer.addEventListener("mousedown", (e) => {
  mousedown = true;
});
progressContainer.addEventListener("mouseup", (e) => {
  mousedown = false;
});
progressContainer.addEventListener("mousemove", (e) => {
  if (mousedown) handleSeek(e);
});

function handleSeek(event) {
  const clickPosition =
    event.clientX - progressContainer.getBoundingClientRect().left;
  const progressContainerWidth = progressContainer.clientWidth;
  const percentageClicked = (clickPosition / progressContainerWidth) * 100;
  const newTime = (percentageClicked / 100) * video.duration;

  video.currentTime = newTime;
}
