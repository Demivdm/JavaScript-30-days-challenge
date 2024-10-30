/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreen = player.querySelector(".fullscreen");


function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
  //bovenstaande code is de korte versie van onderstaande
  //persoonlijk vind ik het onleesbaar omdat het op een array lijkt
  // if(video.paused){
  //     video.play();

  // }else{
  //     video.pause();
  // }
}
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";

  toggle.textContent = icon;
}

function skip() {
  console.log("skip");
  //moet gewrapt worden in parsefloat om er een true number van te maken
  // wat is een true number?
  //voeg de hoeveelheid skip van het attribuut toe
  //waarom werkt het ook met achteruit gaan?
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  console.log(this.value);
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  console.log(e);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip));

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));

ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));

progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);


// add fullscreen button

// function bigScreen(){
//     player.style.maxWidth = '100vw'
//     player.style.height = '100vh'
//     video.style.width = '100vw'
//     video.style.height = '100vh'

// }
// fullscreen.addEventListener("click", bigScreen);


  // Function to toggle fullscreen
  function toggleFullscreen() {
    const isFullscreen = player.style.maxWidth === '100vw' && player.style.height === '100vh';

    if (isFullscreen) {
        // Revert to maximum width
        player.style.maxWidth = '750px';
        player.style.height = 'auto';
        video.style.width = '750px';
        video.style.height = 'auto';
    } else {
        // Set fullscreen dimensions
        player.style.maxWidth = '100vw';
        player.style.height = '100vh';
        video.style.width = '100vw';
        video.style.height = '100vh';
    }
}

fullscreen.addEventListener("click", toggleFullscreen);

  
  fullscreen.addEventListener("click", toggleFullscreen);
  