//Find alle video-containere
const videoContainers = document.querySelectorAll(".video-container");

//Gå igennem hver container én ad gangen
videoContainers.forEach(function (container) {

    // Find video og knap inde i containeren
    const video = container.querySelector(".video");       // selve videoen
    const button = container.querySelector(".play-button"); // play-knappen

    if (!video || !button) return; // sikkerhed: Hvis video eller knappen ikke findes --> stop koden for denne container

    //Fjerner play/pause/lyd/fullscreen-knapper
    video.controls = false;

    //Funktion der starter videoen
    function startVideo() {
        video.controls = true;      // viser kontroller
        video.play();               // starter video
        button.style.display = "none"; // skjuler knappen
    }

    // Klik på og knap --> start video
    button.addEventListener("click", startVideo);
});