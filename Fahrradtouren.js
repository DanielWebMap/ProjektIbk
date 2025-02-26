//Menü Grundlage

const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', function () {
    nav.classList.toggle('nav-open');
});

//Erstellung der Leaflet Karte

let w_map = L.map("w_map", { fullscreenControl: true }).setView([47.2683, 11.3933], 13);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(w_map);


//Maßstab

L.control.scale({
    imperial: false,
}).addTo(w_map);


//Höhenprofil 

let controlElevation = L.control.elevation({
    time: false,
    elevationDiv: "#profile",
    height: 300,
    theme: "ibk_hiking",
}).addTo(w_map);
controlElevation.load("Fahrradtouren/PAF_Innsbruck.gpx"); //Erste Wanderung die bei Start der Seite angezeigt wird

//MARKER DEFINITIONEN

var markerGroup = L.layerGroup().addTo(w_map) //Marker Group für Marker erstellen, um diese immer komplett entfernen zu können

//Marker Definition mit Icon 
var marker = L.icon({
    iconUrl: 'data/marker1.png',
    iconSize: [60, 60], // size of the icon
    iconAnchor: [30, 55], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -45], // point from which the popup should open relative to the iconAnchor
});

//Erste Marker beim Starten der Website (In diesem Falle Pfaffenhofen-Innsbruck)
L.marker([47.268136, 11.387890], { icon: marker }).addTo(markerGroup).bindPopup(`<b>ZIEL:</b> Innsbruck <br> 47.268136 | 11.387890`, {className: 'Popup_map_w' });
L.marker([48.538449, 11.515950], { icon: marker }).addTo(markerGroup).bindPopup(`<b>START:</b> Pfaffenhofen a.d.Ilm <br> 48.538449 | 11.515950`, {className: 'Popup_map_w' });


let pulldown = document.querySelector("#pulldown"); // Dropdown-Menü
let Bilder_div = document.querySelector(".Bilder"); // Container für Bilder
let Text_div = document.querySelector(".Text"); // Container für Text
let Daten_div = document.querySelector(".informationen");

// Google Sheets API URL
const api_url = "https://docs.google.com/spreadsheets/d/1SEOb3QmctVIOK5OpH5_D_d4EPFHygRvsjVaNKX6O-gc/gviz/tq?tqx=out:json"; 

async function fetchGoogleSheetsData() {
    try {
        const response = await fetch(api_url);
        const text = await response.text();
        const json = JSON.parse(text.substring(47, text.length - 2)); // Bereinigt Google Sheets JSON-Format

        let inhalt_pd = []; // Liste der Orte
        let locations = {}; // Speichert alle Orte und deren Daten

        json.table.rows.slice(1).forEach(row => {
            const key = row.c[0]?.v; // Name des Ortes
            const titel = row.c[1]?.v; // Titel
            const bilder = row.c[2]?.v ? row.c[2].v.split(",").map(img => img.trim()) : []; // Bilder als Array
            const laenge = row.c[3]?.v;
            const bergauf = row.c[4]?.v;
            const bergab = row.c[5]?.v;
            const hoechsterpunkt = row.c[6]?.v;
            const level = row.c[7]?.v;
            const ranking = row.c[8]?.v;
            const note = row.c[9]?.v;
            const datum = row.c[10]?.v;
            const freunde = row.c[11]?.v;
            const komoot = row.c[12]?.v;
            const gpx = row.c[13]?.v;
            const start = row.c[14]?.v ? row.c[14].v.split(",").map(srt=> srt.trim()) : []; 
            const ziel = row.c[15]?.v ? row.c[15].v.split(",").map(ziel => ziel.trim()) : []; 
            const beschreibung = row.c[16]?.v;

            if (key && bilder.length > 0) { // Nur hinzufügen, wenn Bilder vorhanden sind
                locations[key] = {
                    titel,
                    bilder,
                    laenge,
                    bergauf,
                    bergab,
                    hoechsterpunkt,
                    level,
                    ranking,
                    note,
                    datum,
                    freunde,
                    komoot,
                    gpx,
                    start,
                    ziel,
                    beschreibung
                };
                inhalt_pd.push(key);
            }
        });

        // Dropdown-Optionen erstellen
        pulldown.innerHTML = inhalt_pd.map((ort, index) =>
            `<option value="${ort}" ${index === 0 ? "selected" : ""}>${locations[ort].titel}</option>`
        ).join("");

        // Erste Slideshow laden (erster Dropdown-Wert)
        if (inhalt_pd.length > 0) {
            updateContent(inhalt_pd[0], locations);
        }

        // Event-Listener für Pulldown-Menü (ändert die Anzeige je nach Auswahl)
        pulldown.addEventListener("change", function () {
            updateContent(this.value, locations);
            changeGPX(this.value,locations)
        });
    } catch (error) {
        console.error("Fehler beim Abrufen der Google Sheets Daten:", error);
    }
}


function changeGPX(value,locations) {
    let gpx_path=locations[value].gpx
    start = locations[value].start
    ziel = locations[value].ziel
    
    controlElevation.clear();
    controlElevation.load(`Fahrradtouren/${gpx_path}`);
    markerGroup.clearLayers();

    if (ziel.length===0) {
    L.marker([parseFloat(start[0]), parseFloat(start[1])], { icon: marker }).addTo(markerGroup).bindPopup(`<b>START / ZIEL:</b> ${start[2]} <br> ${start[0]} | ${start[1]}`, {className: 'Popup_map_w' });
    }
    else {
    L.marker([parseFloat(start[0]), parseFloat(start[1])], { icon: marker }).addTo(markerGroup).bindPopup(`<b>START:</b> ${start[2]} <br> ${start[0]} | ${start[1]}`, {className: 'Popup_map_w' });
    L.marker([parseFloat(ziel[0]), parseFloat(ziel[1])], { icon: marker }).addTo(markerGroup).bindPopup(`<b>ZIEL:</b> ${ziel[2]} <br> ${ziel[0]} | ${ziel[1]}`, {className: 'Popup_map_w' });
    }}


// Funktion zum Aktualisieren der Slideshow & des Textes
function updateContent(selectedOrt, locations) {
    let selected_data = locations[selectedOrt];

    if (!selected_data) return;

    // Grunddaten 
    let datenHTML = `
    <div class="item">Tourdaten:</div>
        <div class="item"><i class="fa-solid fa-route"></i> ${selected_data.laenge} </div>
        <div class="item"><i class="fa-solid fa-circle-up"></i> ${selected_data.bergauf} </div>
        <div class="item"><i class="fa-solid fa-circle-down"></i> ${selected_data.bergab} </div>
        <div class="item"><i class="fa-solid fa-mountain"></i> ${selected_data.hoechsterpunkt} </div>
        <div>Level: <div class="${selected_data.level}"></div>
        </div>
         <div class="item">Ranking: <i class="${selected_data.ranking}"></i> </div>
         <div class="item"> <a href="${selected_data.komoot}" alt="Komoot" target="_blanc" style="color:#7ebd32">Link zu Komoot</a></div>
    `;

    // Erstelle die Slideshow
    let slideshowHTML = `
        <div class="slideshow-container">
            ${selected_data.bilder.map(bild => `
                <div class="mySlides fade">
                    <div class="image-container">
                        <img src="data/${bild}" style="width:100%">
                    </div>
                </div>`).join("")}
            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>
        </div>
        <div class="Text">
            <h2><i class="fa-solid fa-person-hiking"></i> ${selected_data.titel}</h2>
            <hr style="border: none; height: 1px; background-color:white;">
            <p>${selected_data.beschreibung}</p><br>
            <p>
            <i class="fa-solid fa-user-group"></i> Unterwegs mit ${selected_data.freunde}<br>
            <i class="fa-solid fa-certificate"></i> Ranking: ${selected_data.note} <br>
            <i class="fa-solid fa-calendar-days"></i> ${selected_data.datum}</p>
        </div>`;

    Bilder_div.innerHTML = slideshowHTML;
    Daten_div.innerHTML = datenHTML;


    // Slideshow neu starten
    slideIndex = 1;
    showSlides(slideIndex);
}

// SLIDESHOW-FUNKTIONEN

let slideIndex = 1;
showSlides(slideIndex);

// Vorwärts/Rückwärts Steuerung
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Aktuelles Bild anzeigen
function showSlides(n) {
    let slides = document.querySelectorAll(".Bilder .mySlides");

    if (slides.length === 0) return; // Falls keine Slides vorhanden sind, abbrechen

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    slides.forEach(slide => slide.style.display = "none");
    slides[slideIndex - 1].style.display = "block";
}

// Daten von Google Sheets abrufen
fetchGoogleSheetsData();
