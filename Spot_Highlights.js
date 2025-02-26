//Menü Grundlage
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', function () {
    nav.classList.toggle('nav-open');
});


let map_spots = L.map("map_spots", { fullscreenControl: true }).setView([47.2683, 11.3933], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map_spots);


// thematische Layer
let themaLayer = {
    gastronomie: L.featureGroup().addTo(map_spots),
    restaurant: L.featureGroup(),
    sightseeing: L.featureGroup(),
    freizeit: L.featureGroup(),
    shops: L.featureGroup(),
    skigebiete: L.featureGroup().addTo(map_spots),
}

// Hintergrundlayer
let layerControl = L.control.layers({
    "Luftbild": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }),
    "Karte": L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map_spots)
}, {
    "Gastronomie": themaLayer.gastronomie,
    "Sightseeing": themaLayer.restaurant,
    "Freizeit": themaLayer.freizeit,
    "Shops": themaLayer.freizeit,
    "Skigebiete (Freizeiticket)": themaLayer.skigebiete,
}).addTo(map_spots);


var lc = L.control
    .locate({
        position: "topright",
        drawCircle: true,
        strings: {
            title: "GPS-Location"
        },
        markerClass: L.circleMarker,
        circleStyle: { fillColor: "#1f65b4;" }

    })
    .addTo(map_spots);


// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map_spots);


//CAFÈS
var icon_cafe = L.icon({
    iconUrl: 'icons/coffee.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});

//Café Momo
L.marker([47.267207, 11.395057], { icon: icon_cafe }).bindPopup(`<h4>Café Momo</h4><p>Gemütliches und schönes Café.<br> Man sitzt im Hinterhof, dadurch kein Lärm.</p> <a href="https://www.cafe-momo.at/" target="_blanc">Link zur Website</a>`, { className: 'popup_cafe' }).addTo(themaLayer.gastronomie)



//BARS
var icon_bar = L.icon({
    iconUrl: 'icons/bar.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});

//Liquid Diary
L.marker([47.266433, 11.392113], { icon: icon_bar }).bindPopup(`<h4>Liquid Diary</h4><p>Beste Premiumbar in Innsbruck<br> Sehr guter Service, einzigartige Cocktails.</p> <a href="https://www.liquiddiary.com/" target="_blanc">Link zur Website</a>`, { className: 'popup_bar' }).addTo(themaLayer.gastronomie)

//Wohnzimmer
L.marker([47.265979, 11.383225], { icon: icon_bar }).bindPopup(`<h4>Wohnzimmer</h4><p>Gemütliche Bar<br> Schönes Ambiente, ideal für Cocktails</p> <a href="https://www.wohnzimmer-bar.at/" target="_blanc">Link zur Website</a>`, { className: 'popup_bar' }).addTo(themaLayer.gastronomie)


//RESTAURANTS
var icon_restaurant = L.icon({
    iconUrl: 'icons/restaurant.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});

//Grieche Akropolis
L.marker([47.266648, 11.391015], { icon: icon_restaurant }).bindPopup(`<h4>Akropolis (Griechisch)</h4><p>Lieblingsrestaurant in Innsbruck<br> Sehr gute & leckere Portionen, schönes Ambiente und guter Service</p> <a href="https://akropolis-innsbruck.com/" target="_blanc">Link zur Website</a>`, { className: 'popup_restaurant' }).addTo(themaLayer.gastronomie)


//SKIGEBIETE
var icon_ski = L.icon({
    iconUrl: 'icons/Ski.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});


api_url_ski_marker = "https://docs.google.com/spreadsheets/d/1bUfRmWMyEoJu6NsKS87Ijs7f6vgyiZ0uaj-xaeQCkZ8/gviz/tq?tqx=out:json"
let ski_area_data = {}

async function ski_marker_data() {
    try {
        const response = await fetch(api_url_ski_marker);
        const text = await response.text();
        const json = JSON.parse(text.substring(47, text.length - 2)); // Bereinigt Google Sheets JSON-Format


        json.table.rows.slice(1).forEach(row => {
            const key = row.c[0]?.v; // Name des Ortes
            const titel = row.c[1]?.v; // Titel
            const koordinaten = row.c[2]?.v ? row.c[2].v.split(",").map(img => img.trim()) : []; 
            const gesamtnote = row.c[3]?.v;
            const freunde = row.c[4]?.v;
            const link = row.c[5]?.v;
            const beschreibung = row.c[6]?.v;
            const bilder = row.c[7]?.v ? row.c[7].v.split(",").map(img => img.trim()) : []; // Bilder als Array

            L.marker([koordinaten[0], koordinaten[1]], {key: key, icon: icon_ski}).bindPopup(`<h3>${titel}</h3><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski' }).addTo(themaLayer.skigebiete).on('click', ClickOnFeature); 
       
            ski_area_data[key] = {
                titel,
                koordinaten,
                gesamtnote,
                freunde,
                link,
                beschreibung,
                bilder
            };
        });
    }
    catch (error) {
        console.error("Fehler beim Abrufen der Google Sheets Daten:", error);
    }
}

ski_marker_data()



//Datenquelle Skiinfos 
const sheetUrl_table = "https://docs.google.com/spreadsheets/d/1mtgpiOVRSSfRYGdLBXG-J2nlSOekhlSkhQROb9hhwj0/gviz/tq?tqx=out:json";
const sheetUrl_sidebar = "https://docs.google.com/spreadsheets/d/1lPbVtRDdLdUb_fgVczcIkqFB8hqiFbddM6yRPRbaOEg/gviz/tq?tqx=out:json";

//Tabelle Google Charts 
google.charts.load('current', { 'packages': ['table'] });
google.charts.setOnLoadCallback(loadData_table);


async function loadData_table() {
    try {
        const response = await fetch(sheetUrl_table);
        const text = await response.text();
        const json = JSON.parse(text.substring(47, text.length - 2)); // Google Sheets JSON fix

        const rows = json.table.rows.map(row => row.c.map(cell => cell ? cell.v : ""));
        headers_table = json.table.cols.map(col => col.label);

        allData_table = rows.map(row => ({
            skigebiet: row[0],
            kategorie: row[1],
            note: row[2],
            bemerkung: row[3]
        }));


    } catch (error) {
        console.error("Fehler beim Laden der Daten", error);
    }
}

// async function loadData_sidebar() {
//     try {
//         const response = await fetch(sheetUrl_sidebar);
//         const text = await response.text();
//         const json = JSON.parse(text.substring(47, text.length - 2)); // Google Sheets JSON fix

//         const rows = json.table.rows.map(row => row.c.map(cell => cell ? cell.v : ""));
//         headers_sidebar = json.table.cols.map(col => col.label);

//         allData_sidebar = rows.map(row => ({
//             key: row[0],
//             name: row[1],
//             gesamtnote: row[2],
//             freunde: row[3],
//             link: row[4],
//             beschreibung: row[5]
//         }));

//     } catch (error) {
//         console.error("Fehler beim Laden der Daten", error);
//     }
// }



//SIDEBAR


let sidebar = L.control.sidebar('sidebar', {
    position: 'right',
    closeButton: true,
});

map_spots.addControl(sidebar);

function ClickOnFeature(e) {
    let marker = e.target;
    let key = marker.options.key;

    // Individuelle Sidebarinfos je Skigebiet

    sidebar.setContent(`<button id="b1"><i class="fa-regular fa-circle-xmark" font-size="50px"></i></button> <br> <div style="font-size: 1.6vw; font-family: Verdana, sans-serif;">${ski_area_data[key].titel} <i class="fa-solid fa-person-skiing"></i></div><p>${ski_area_data[key].beschreibung} Gesamtnote: <b>${ski_area_data[key].gesamtnote}</b></p><br><p>Bisher unterwegs mit ${ski_area_data[key].freunde}</p><br><img src="data/Skigebiete/${ski_area_data[key].bilder[0]}" alt="Noch kein Bild vorhanden!" style="height:50%;border:2px solid rgb(60, 123, 179); border-radius: 6px 6px 6px 6px;"><br><br><button id="b2">Weitere Infos</button>`);
    sidebar.show();

    document.getElementById('b1').addEventListener('click', function () {
        sidebar.hide();
    })

    document.getElementById('b2').addEventListener('click', function () {
        document.getElementById("tabelle_ski").scrollIntoView({ behavior: "smooth" });
    })


    // Individuelle Tabelle je Skigebiet
    let filteredData_table = allData_table.filter(row => row.skigebiet === key);

    drawTable(filteredData_table);

}


// [AL, S2, SG, KT, PK, SA, IG, KA, RS, SP, BA, EB, EB, GB, OG, HK, IN, KL, KJ, MA, BO, SB].forEach(el => el.on('click', ClickOnFeature));


//SLIDESHOW


let HA = document.getElementById("HA");


let slideIndex = 1;
showSlides(slideIndex);

// Vorwärts/Rückwärts Steuerung
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Aktuelles Bild anzeigen
function showSlides(n) {
    let i;
    let slides;

    if (HA.style.display === "block") {
        slides = document.querySelectorAll("#HA .mySlides");
    }

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}




function drawTable(dataArray) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Kategorie');
    data.addColumn('string', 'Note');
    data.addColumn('string', 'Bemerkung');
    data.addRows(dataArray.map(row => [row.kategorie, row.note, row.bemerkung]));

    var table = new google.visualization.Table(document.getElementById('tabelle_ski'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}




