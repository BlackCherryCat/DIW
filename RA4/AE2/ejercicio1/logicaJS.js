let video = document.getElementById("video");
let play = document.getElementById("play");
let audio = document.getElementById("audio");
let minvol = document.getElementById("minvol");
let pluvol = document.getElementById("pluvol");

function Play() {
    play.innerHTML = "||"
    play.setAttribute("onclick", "Pause();");
    video.play();
}
function Pause() {
    play.innerHTML = "►"
    play.setAttribute("onclick", "Play();");
    video.pause();
}
function Reset() {
    video.load();
    Play();
}
function Backward() {
    video.currentTime -= 5;
}
function Forward() {
    video.currentTime += 5;
}
function Audio() {
    if (video.muted) {
        video.muted = false;
        audio.innerHTML = "silenciar audio";
    } else {
        video.muted = true;
        audio.innerHTML = "activar audio";
    }
}
function PluVol() {
    if (video.volume == 1) {
        return;
    } else {
        minvol.removeAttribute("disabled");
        video.volume = Math.round((video.volume + 0.1) * 10) / 10;
    }
    if (video.volume == 1) {
        pluvol.setAttribute("disabled", "true");
    }
}
function MinVol() {
    if (video.volume == 0) {
        return;
    } else {
        pluvol.removeAttribute("disabled");;
        video.volume = Math.round((video.volume - 0.1) * 10) / 10;
    }
    if (video.volume == 0) {
        minvol.setAttribute("disabled", "true");
    }
}
if (video.volume == 0) {
    minvol.setAttribute("disabled", "true");
} else if (video.volume == 1) {
    pluvol.setAttribute("disabled", "true");
}