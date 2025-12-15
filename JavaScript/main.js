document.addEventListener("DOMContentLoaded", async function () {

    const response = await fetch("../json/uddannelser.json");
    const allData = await response.json();

    const cards = document.querySelectorAll(".square-wrapper");

    cards.forEach(card => {
        const skoleNavn = card.getAttribute("data-skole");
        const liste = card.querySelector(".uddannelser-liste");

        if (!skoleNavn || !liste) return;

        // find uddannelser til denne skole
        const resultater = allData.filter(item =>
            item.skolenavn.toLowerCase().includes(skoleNavn.toLowerCase())
        );

        resultater.forEach(item => {
            let navn = item.uddannelsesnavn;
            const sidsteKomma = navn.lastIndexOf(",");
            if (sidsteKomma !== -1) {
                navn = navn.substring(0, sidsteKomma);
            }

            const li = document.createElement("li");
            li.textContent = navn.trim();
            liste.appendChild(li);
        });
    });
});
