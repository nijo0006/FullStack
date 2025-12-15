
// Objekter med navn, kønsfordeling og adgangkvotient - det er et stort objekt med under-objekter

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

let genderChart; // Variabel til et kønsdiagram


// Funktion der viser data for den valgte uddannelse

function showCharts(key) { // Slår den valgte uddannelsesnøgle op i dataobjektet.
    const data = uddannelser[key];  // key er eksempelvis "datamatiker", og data bliver hele objektet for den uddannelse.

    function renderGenderGrid(percentage) {   // Funktion der bygger et grid med i alt 20 kønsikoner
        const grid = document.getElementById('genderGrid');
        grid.innerHTML = ""; // Fjerner tidligere ikoner, så grid gendannes fra bunden

        const totalIcons = 20;  // Et fast antal ikoner for at gøre visualiseringen ensartet

        // Beregner hvor mange kvindeikoner der skal vises:
        // percentage (fx 28%) omregnes til hvor stor en del af de 20 ikoner det svarer til.
        const femaleCount = Math.round(totalIcons * (percentage / 100));

        // Resterende ikoner bliver mandeikoner.
        const maleCount = totalIcons - femaleCount;

        // Tekstfelt opdateres, så det viser fx "28% kvinder".
        document.getElementById("femalePercentage").textContent =
            Math.round(percentage) + "% kvinder";

        // Opretter et DOM-element for hvert kvindeikon.
        // Ikonerne får klasser, der kan styles via CSS (female = lyserød, male = grå osv.)
        for (let i = 0; i < femaleCount; i++) {
            const icon = document.createElement("div");
            icon.classList.add("gender-icon", "female");
            grid.appendChild(icon);
        }

        // Samme princip for mandeikoner.
        for (let i = 0; i < maleCount; i++) {
            const icon = document.createElement("div");
            icon.classList.add("gender-icon", "male");
            grid.appendChild(icon);
        }
    }

    // Kalder funktionen med procentdelen for kvinder.
    // Mandeprocenten kræver ikke givet input, da den er implicit.
    renderGenderGrid(data.gender.Kvinder);

    // ----------------------------------------
    // Viser sektionen med diagrammer (hvis den evt. er skjult fra start)
    // ----------------------------------------
    document.getElementById("charts").style.display = "block";

    // Opdaterer overskriften på visningsboksen
    document.getElementById("chart-title").textContent = data.name;

    // ----------------------------------------
    // Adgangskvotient
    // ----------------------------------------
    const kvotient = data.adgang[0].kvotient;

    // If-sætningen afgør, hvad der skal vises:
    // Hvis kvotienten er større end 0 → vis tallet.
    // Hvis kvotient = 0 → fortolkningen er "Alle optaget", og denne tekst vises i stedet.
    document.getElementById("admissionValue").textContent =
        kvotient > 0
            ? kvotient               // Udtryk A: vis det faktiske kvotienttal
            : "Alle optaget";        // Udtryk B: fallback-tekst, når 0 bruges som markering for åbent optag

    // ----------------------------------------
    // Her kan Chart.js-opsætning indsættes, hvis der ønskes grafer.
    // genderChart-variablen ovenfor er reserveret til formålet.
    // ----------------------------------------
}

// -----------------------------
// Event-binding efter DOM er indlæst
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {

    // Finder alle bobler i .circle-container.
    // Hver boble antages at have en position, der matcher rækkefølgen i Object.keys(uddannelser).
    document.querySelectorAll(".circle-container div").forEach((el, i) => {

        // Henter alle nøglerne fra uddannelsesdataene, fx:
        // ["itArkitektur", "datamatiker", "cybersikkerhed", ...]
        const keys = Object.keys(uddannelser);

        // Bind klik-event:
        // Når boblen nummer i klikkes, kaldes showCharts med nøgle nummer i.
        // Eksempel: klik på boble 1 → showCharts("datamatiker")
        el.addEventListener("click", () => showCharts(keys[i]));
    });
});
