const playPauseButton = document.getElementById("playPauseButton");
const audioStatus = document.getElementById("audioStatus");

let audio = new Audio();
let isPlaying = false;
let currentAudio = null;
let audioTitles = [
  { title: "Naturaleza", src: "https://sound-effects-media.bbcrewind.co.uk/mp3/NHU05104275.mp3" },
  { title: "Industria", src: "https://sound-effects-media.bbcrewind.co.uk/mp3/07076051.mp3" },
  { title: "Base Aérea", src: "https://sound-effects-media.bbcrewind.co.uk/mp3/07001043.mp3" }
];

// Función para iniciar o detener el sonido ambiente
function toggleAudio() {
  if (isPlaying) {
    audio.pause();
    playPauseButton.textContent = "Iniciar sonido ambiente";
    audioStatus.textContent = "";
  } else {
    // Selección aleatoria de sonido
    const randomIndex = Math.floor(Math.random() * audioTitles.length);
    currentAudio = audioTitles[randomIndex];
    audio.src = currentAudio.src;
    audio.play();
    playPauseButton.textContent = "Detener sonido ambiente";
    audioStatus.innerHTML = `<p>Reproduciendo: <span>${currentAudio.title}</span></p>`;
  }
  isPlaying = !isPlaying;
}

// Asignamos el evento al botón
playPauseButton.addEventListener("click", toggleAudio);
