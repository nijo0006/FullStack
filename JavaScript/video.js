/*Note: Find alle elementer med klassen .role-video-wrapper*/

const roleVideoWrappers = document.querySelectorAll(".role-video-wrapper");

roleVideoWrappers.forEach(function (wrapper) { /*Note: Gå igennem (forEach) hver enkelt wrapper (én video ad gangen)*/
    const video = wrapper.querySelector(".role-video"); /*Note: Find video-elementet og play-knappen inde i kortet*/
    const button = wrapper.querySelector(".play-button");

    if (!video || !button) return; /*Note: (for sikkerhed) --> Hvis video eller knap mangler → spring over*/

    video.controls = false; /*Note: Slå kontroller fra i starten --> Videoen viser ikke pause/play før man klikker, men den store hvide cirkel-play-knap*/

    function startVideo() {
        video.controls = true; // Vis kontroller
        video.play(); // Start videoen
        button.style.display = "none"; // Skjul play-knappen
    }

    wrapper.addEventListener("click", startVideo); /*Når du klikker på kortet eller knappen --> kør startVideo()*/
    button.addEventListener("click", startVideo);
});
