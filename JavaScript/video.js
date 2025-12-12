/* Find alle video-containere */
const videoContainers = document.querySelectorAll(".video-container");

videoContainers.forEach(function (container) {

    const video = container.querySelector(".video");       // selve videoen
    const button = container.querySelector(".play-button"); // play-knappen

    if (!video || !button) return; // sikkerhed

    // Skjul videokontroller indtil man klikker
    video.controls = false;

    function startVideo() {
        video.controls = true;      // vis kontroller
        video.play();               // start video
        button.style.display = "none"; // skjul knappen
    }

    // Klik på både container og knap → start video
    container.addEventListener("click", startVideo);
    button.addEventListener("click", startVideo);
});