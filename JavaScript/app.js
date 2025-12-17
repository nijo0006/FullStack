//opretter map. ("map") forbindes til html elementet <div id="map"></div> + koordinaterne over Danmark
const map = L.map("map").setView([56, 11], 6.5);

//layoutet
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19, //maxzoom ind på selvekortet
    attribution: '&copy; OpenStreetMap'
}).addTo(map); //Tilføjer tile-layeret til map

// Add standard Leaflet markers
educationLocations.forEach(institution => { //Gennemgå alle uddannelsessteder
    L.marker([institution.lat, institution.lng]) //Opret en marker
        .bindPopup( //note* bindPopup tilføjer en lille infoboks, <strong> gør skolens navn fed, <br> laver linjeskift og city viser byen
            "<strong>" + institution.school + "</strong><br>" +
            institution.city)
        .addTo(map); //Tilføj markøren til kortet
});
