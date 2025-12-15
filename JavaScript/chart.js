
// Objekter med navn, kønsfordeling og adgangkvotient - det er ét stort objekt med under-objekter

const uddannelser = {
    itArkitektur: {
        name: "IT-Arkitektur - EK",
        gender: { Mænd: 72, Kvinder: 28 },
        adgang: [{ year: 2025, kvotient: 4.8 }],
    },
    datamatiker: {
        name: "Datamatiker - Zealand",
        gender: { Mænd: 82, Kvinder: 18 },
        adgang: [{ year: 2025, kvotient: 0 }], // Kvotient = 0 bruges som indikator for "Alle optaget"
    },
    cybersikkerhed: {
        name: "Cybersikkerhed - Erhvervsakademi Aarhus",
        gender: { Mænd: 87.5, Kvinder: 12.5 },
        adgang: [{ year: 2025, kvotient: 6.5 }],
    },
    softwareudvikling: {
        name: "Softwareudvikling - Aalborg Universitet",
        gender: { Mænd: 73, Kvinder: 27 },
        adgang: [{ year: 2025, kvotient: 0 }],
    },
    mechatronics: {
        name: "Bachelor of Engineering in Mechatronics - SDU",
        gender: { Mænd: 79, Kvinder: 21 },
        adgang: [{ year: 2025, kvotient: 7.9 }],
    },
};

// Variabel til et kønsdiagram
let genderChart;


// Hovedfunktion der opdaterer visningen, baseret på hvilken uddannelse brugeren klikker på
function showCharts(key) {

    // Slår den valgte uddannelses nøgle op i data-objektet
    // fx key = "datamatiker"
    const data = uddannelser[key];

    // ----------------------------------------
    // Funktion der visualiserer kønsfordeling
    // ----------------------------------------
    function renderGenderGrid(percentage) {

        // Finder HTML-elementet med id="genderGrid"
        // Dette er containeren, som ikonerne indsættes i
        const grid = document.getElementById('genderGrid');

        // Rydder indholdet i containeren,
        // så tidligere ikoner fjernes før nye tilføjes
        grid.innerHTML = "";

        // Fast antal ikoner for ensartet visualisering
        const totalIcons = 20;

        // Beregner hvor mange af ikonerne der skal være kvinder
        // percentage (fx 28) omregnes til en andel af de 20 ikoner
        const femaleCount = Math.round(totalIcons * (percentage / 100));

        // Resten af ikonerne repræsenterer mænd
        const maleCount = totalIcons - femaleCount;

        // Opdaterer tekstfeltet i DOM’en,
        // så brugeren kan se den præcise procent
        document.getElementById("femalePercentage").textContent =
            Math.round(percentage) + "% kvinder";

        // Opretter ét DOM-element for hvert kvindeikon
        // Elementerne får CSS-klasser, som styrer udseende og farve
        for (let i = 0; i < femaleCount; i++) {
            const icon = document.createElement("div"); // Opretter nyt <div>-element
            icon.classList.add("gender-icon", "female"); // Tilføjer CSS-klasser
            grid.appendChild(icon); // Indsætter elementet i genderGrid
        }

        // Opretter mandeikoner på samme måde
        for (let i = 0; i < maleCount; i++) {
            const icon = document.createElement("div");
            icon.classList.add("gender-icon", "male");
            grid.appendChild(icon);
        }
    }

    // Kalder funktionen og sender kvindeprocenten med
    // Mandeprocenten udregnes automatisk ud fra resten
    renderGenderGrid(data.gender.Kvinder);

    // ----------------------------------------
    // Gør diagram-sektionen synlig
    // ----------------------------------------
    document.getElementById("charts").style.display = "block";

    // Opdaterer overskriften, så den matcher den valgte uddannelse
    document.getElementById("chart-title").textContent = data.name;

    // ----------------------------------------
    // Adgangskvotient
    // ----------------------------------------

    // Henter adgangskvotienten fra data
    const kvotient = data.adgang[0].kvotient;

    // Opdaterer DOM-elementet med enten:
    // - kvotienttallet, hvis det findes
    // - teksten "Alle optaget", hvis kvotienten er 0
    document.getElementById("admissionValue").textContent =
        kvotient > 0
            ? kvotient
            : "Alle optaget";

    // ----------------------------------------
    // Her kan evt. Chart.js-diagrammer tilføjes senere
    // ----------------------------------------
}

// -----------------------------
// Event-binding efter DOM er indlæst
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {

    // Finder alle klikbare bobler i circle-container
    document.querySelectorAll(".circle-container div").forEach((el, i) => {

        // Henter alle nøgler fra uddannelses-objektet
        // Rækkefølgen svarer til boblernes rækkefølge i HTML
        const keys = Object.keys(uddannelser);

        // Binder et klik-event til hver boble
        // Når brugeren klikker, kaldes showCharts
        // med den tilhørende uddannelses-nøgle
        el.addEventListener("click", () => showCharts(keys[i]));
    });
});
