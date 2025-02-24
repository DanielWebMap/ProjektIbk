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


//AXAMER LIZUM
let AL = L.marker([47.195429, 11.302501], {key: "AL", icon: icon_ski, image: "data/Skigebiete/AL.JPEG"}).bindPopup(`<h3>Axamer Lizum</h3><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//SCHLICK 2000
let S2 = L.marker([47.154682, 11.302501], {key: "S2", icon: icon_ski, image: "data/Skigebiete/S2.JPEG" }).bindPopup(`<h3>Skizentrum Schlick 2000</h3><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//STUBAI
let SG = L.marker([46.996596, 11.118947], {key: "SG", icon: icon_ski }).bindPopup(`<h4>Stubaier Gletscher</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//KÜHTAI
let KT = L.marker([47.213590, 11.023375], {key: "KT", icon: icon_ski, image: "data/Skigebiete/KT.JPEG" }).bindPopup(`<h4>Kühtai</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//PATSCHERKOFEL
let PK = L.marker([47.221966, 11.426739], {key: "PK", icon: icon_ski, image: "data/Skigebiete/PK.JPEG" }).bindPopup(`<h4>Patscherkofel</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//SKI ARLBERG: ST.ANTON
let SA = L.marker([47.128561, 10.263253], { key: "SA", icon: icon_ski, image: "data/Skigebiete/SA.JPEG" }).bindPopup(`<h4>St. Anton am Arlberg</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//ISCHGL
let IG = L.marker([47.011374, 10.291282], {key: "IG",  icon: icon_ski }).bindPopup(`<h4>Ischgl</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//KAPPL (PAZNAUN-ISCHGL)
let KA = L.marker([47.060366, 10.374178], {key: "KA",  icon: icon_ski }).bindPopup(`<h4>Kappl (Paznau-Ischgl)</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//Bergbahnen Rosshütte Seefeld
let RS = L.marker([47.331510, 11.200189], { key: "RS", icon: icon_ski }).bindPopup(`<h4>Bergbahnen Seefeld</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//SILVAPARK
let SP = L.marker([46.965516, 10.162335], { key: "SP", icon: icon_ski }).bindPopup(`<h4>Silvapark</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//BERGERALM
let BA = L.marker([47.086812, 11.459722], { key: "BA", icon: icon_ski }).bindPopup(`<h4>Freizeitarena Bergeralm/h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//ELFER BAHNEN
let EB = L.marker([47.110958, 11.312333], { key: "EB", icon: icon_ski }).bindPopup(`<h4>Elferbahnen</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//GLUNGEZER BAHN
let GB = L.marker([47.256345, 11.535316], { key: "GB", icon: icon_ski, image: "data/Skigebiete/GB.JPEG" }).bindPopup(`<h4>Glungezerbahn</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//ÖTZTAL: GURGL
let OG = L.marker([46.899989, 11.051444], { key: "OG", icon: icon_ski }).bindPopup(`<h4>Obergurgl-Hochgurgl</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//HOCHKÖSSEN
let HK = L.marker([47.653269, 12.421043], { key: "HK", icon: icon_ski }).bindPopup(`<h4>Skigebiet Hochkössen</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//NORDKETTE
let IN = L.marker([47.306428, 11.379797], {key: "IN",  icon: icon_ski }).bindPopup(`<h4>Nordkette</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//KATZENKOPF LEUTASCH
let KL = L.marker([47.363705, 11.165772], {key: "KL", icon: icon_ski }).bindPopup(`<h4>Katzenkopf Leutasch</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//KELLERJOCHBAHN
let KJ = L.marker([47.320860, 11.719789], {key: "KJ",icon: icon_ski }).bindPopup(`<h4>Kellerjochbahn</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//MUTTERER ALM
let MA = L.marker([47.222450, 11.366550], { key: "MA", icon: icon_ski, image: "data/Skigebiete/MA.JPEG" }).bindPopup(`<h4>Mutterer Alm</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//BERGBAHNEN OBERPERFUSS
let BO = L.marker([47.245694, 11.237492], { key: "BO", icon: icon_ski }).bindPopup(`<h4>Bergbahnen Oberperfuss</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)

//SERLES
let SB = L.marker([47.163648, 11.380017], { key: "SB",icon: icon_ski }).bindPopup(`<h4>Serlesbahnen</h4><hr style="border: none; height: 1px; background-color:white;">`, { className: 'popup_ski' }).addTo(themaLayer.skigebiete)




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

 async function loadData_sidebar() {
    try {
        const response = await fetch(sheetUrl_sidebar);
        const text = await response.text();
        const json = JSON.parse(text.substring(47, text.length - 2)); // Google Sheets JSON fix
        
        const rows = json.table.rows.map(row => row.c.map(cell => cell ? cell.v : ""));
        headers_sidebar = json.table.cols.map(col => col.label);

        allData_sidebar = rows.map(row => ({
            key: row[0],
            name: row[1],
            gesamtnote: row[2],
            freunde: row[3],
            link: row[4],
            beschreibung: row[5]
        }));

     } catch (error) {
         console.error("Fehler beim Laden der Daten", error);
     }
 }



//SIDEBAR

loadData_sidebar()

let sidebar = L.control.sidebar('sidebar', {
    position: 'right',
    closeButton: true,
});

map_spots.addControl(sidebar);

function ClickOnFeature(e) {
    let marker = e.target;
    let image = marker.options.image;
    let key = marker.options.key;

    // Individuelle Sidebarinfos je Skigebiet
    let row_data = allData_sidebar.find(row => row.key === key);

    sidebar.setContent(`<button id="b1"><i class="fa-regular fa-circle-xmark" font-size="50px"></i></button> <br> <div style="font-size: 1.6vw; font-family: Verdana, sans-serif;">${row_data.name} <i class="fa-solid fa-person-skiing"></i></div><p>${row_data.beschreibung} Gesamtnote: <b>${row_data.gesamtnote}</b></p><br><p>Bisher unterwegs mit ${row_data.freunde}</p><br><img src="${image}" alt="Noch kein Bild vorhanden!" style="height:50%;border:2px solid rgb(60, 123, 179); border-radius: 6px 6px 6px 6px;"><br><br><button id="b2">Weitere Infos</button>`);
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


[AL, S2, SG, KT, PK, SA, IG, KA, RS, SP, BA, EB, EB, GB, OG, HK, IN, KL, KJ, MA, BO, SB].forEach(el => el.on('click', ClickOnFeature));


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




