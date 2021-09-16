var canvas,
  ctx,
  source,
  context,
  analyser,
  fbc_array,
  bar_count,
  bar_pos,
  bar_width,
  bar_height;
let cIndex = 0;
let step = 21;
const colors = [
  "#ff0000",
  // "#ff1e00",
  "#ff7300",
  "#fffb00",
  "#48ff00",
  "#00ffd5",
  // "#0051ff",
  "#002bff",
  "#7a00ff",
  // "#ff00c8",
  // "#ff0062",
  // "#ff0000",
];

let audio = document.querySelector("#audio");
audio.crossOrigin = "anonymous";

document.addEventListener("click", validateAudioContext);

function validateAudioContext() {
  if (context.state === "suspended") {
    context.resume();
    document.removeEventListener("click", validateAudioContext);
  }
  // setTimeout(() => {
  //   if (context.state === "running") {
  //     document.removeEventListener("click", validateAudioContext);
  //   }
  // }, 10000);
}

window.addEventListener(
  "load",
  function () {
    context = new AudioContext();

    analyser = context.createAnalyser();
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    if (source == undefined) {
      source = context.createMediaElementSource(audio);
    }

    source.connect(analyser);
    analyser.connect(context.destination);

    FrameLooper();
  },
  false
);

function FrameLooper() {
  window.RequestAnimationFrame =
    window.requestAnimationFrame(FrameLooper) ||
    window.msRequestAnimationFrame(FrameLooper) ||
    window.mozRequestAnimationFrame(FrameLooper) ||
    window.webkitRequestAnimationFrame(FrameLooper);

  fbc_array = new Uint8Array(analyser.frequencyBinCount);

  // bar_count = window.innerWidth;
  bar_count = colors.length * step;

  analyser.getByteFrequencyData(fbc_array);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //for mobile devices (less colors)
  // if (window.innerWidth < 700) {
  //   step = 22;
  // }

  // ctx.fillStyle = "white";
  for (let i = 0; i < bar_count; i++) {
    bar_pos = i * 2;
    bar_width = 1;
    bar_height = -(fbc_array[i] / 2);

    cIndex = (i / step) % colors.length;
    ctx.fillStyle = colors[cIndex];

    // ctx.fillStyle = getRandomColor();

    ctx.fillRect(bar_pos, canvas.height, bar_width, bar_height);
  }
}

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
