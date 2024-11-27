//Menü Grundlage
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', function() {
    nav.classList.toggle('nav-open');
});


let map_spots = L.map("map_spots", { fullscreenControl: true }).setView([47.2683, 11.3933], 13);

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
    "Karte": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    }).addTo(map_spots)
}, {
    "Gastronomie": themaLayer.gastronomie,
    "Sightseeing": themaLayer.restaurant,
    "Freizeit": themaLayer.freizeit,
    "Shops": themaLayer.freizeit,
    "Skigebiete": themaLayer.skigebiete,
}).addTo(map_spots);


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
L.marker([47.267207, 11.395057], {icon: icon_cafe}).bindPopup(`<h4>Café Momo</h4><p>Gemütliches und schönes Café.<br> Man sitzt im Hinterhof, dadurch kein Lärm.</p> <a href="https://www.cafe-momo.at/" target="_blanc">Link zur Website</a>`, {className: 'popup_cafe'}).addTo(themaLayer.gastronomie)



//BARS
var icon_bar = L.icon({
    iconUrl: 'icons/bar.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});

//Liquid Diary
L.marker([47.266433, 11.392113], {icon: icon_bar}).bindPopup(`<h4>Liquid Diary</h4><p>Beste Premiumbar in Innsbruck<br> Sehr guter Service, einzigartige Cocktails.</p> <a href="https://www.liquiddiary.com/" target="_blanc">Link zur Website</a>`, {className: 'popup_bar'}).addTo(themaLayer.gastronomie)

//Wohnzimmer
L.marker([47.265979, 11.383225], {icon: icon_bar}).bindPopup(`<h4>Wohnzimmer</h4><p>Gemütliche Bar<br> Schönes Ambiente, ideal für Cocktails</p> <a href="https://www.wohnzimmer-bar.at/" target="_blanc">Link zur Website</a>`, {className: 'popup_bar'}).addTo(themaLayer.gastronomie)


//RESTAURANTS
var icon_restaurant = L.icon({
    iconUrl: 'icons/restaurant.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});

//Grieche Akropolis
L.marker([47.266648, 11.391015], {icon: icon_restaurant}).bindPopup(`<h4>Akropolis (Griechisch)</h4><p>Lieblingsrestaurant in Innsbruck<br> Sehr gute & leckere Portionen, schönes Ambiente und guter Service</p> <a href="https://akropolis-innsbruck.com/" target="_blanc">Link zur Website</a>`, {className: 'popup_restaurant'}).addTo(themaLayer.gastronomie)


//SKIGEBIETE
var icon_ski = L.icon({
    iconUrl: 'icons/Ski.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});


//AXAMER LIZUM
L.marker([47.195429, 11.302501], {icon: icon_ski}).bindPopup(`<h4>AXAMER LIZUM</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//SCHLICK 2000
L.marker([47.154682, 11.302501], {icon: icon_ski}).bindPopup(`<h4>SCHLICK 2000</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//STUBAI
L.marker([46.996596, 11.118947], {icon: icon_ski}).bindPopup(`<h4>STUBAIER GLETSCHER</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//KÜHTAI
L.marker([47.213590, 11.023375], {icon: icon_ski}).bindPopup(`<h4>KÜHTAI</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//PATSCHERKOFEL
L.marker([47.221966, 11.426739], {icon: icon_ski}).bindPopup(`<h4>PATSCHERKOFEL</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//SKI ARLBERG: ST.ANTON
L.marker([47.128561, 10.263253], {icon: icon_ski}).bindPopup(`<h4>SKI ARLBERG: ST. ANTON</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//ISCHGL
L.marker([47.011374, 10.291282], {icon: icon_ski}).bindPopup(`<h4>ISCHGL</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//KAPPL (PAZNAUN-ISCHGL)
L.marker([47.060366, 10.374178], {icon: icon_ski}).bindPopup(`<h4>KAPPL (PAZNAUN_ISCHGL)</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//Bergbahnen Rosshütte Seefeld
L.marker([47.331510, 11.200189], {icon: icon_ski}).bindPopup(`<h4>Bergbahnen Rosshütte Seefeld</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//SILVAPARK
L.marker([46.965516, 10.162335], {icon: icon_ski}).bindPopup(`<h4>SILVAPARK</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//BERGERALM
L.marker([47.086812, 11.459722], {icon: icon_ski}).bindPopup(`<h4>BERGERALM</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//ELFER BAHNEN
L.marker([47.110958, 11.312333], {icon: icon_ski}).bindPopup(`<h4>ELFER BAHNEN</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//GLUNGEZER BAHN
L.marker([47.256345, 11.535316], {icon: icon_ski}).bindPopup(`<h4>GLUNGEZER BAHN</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//ÖTZTAL: GURGL
L.marker([46.899989, 11.051444], {icon: icon_ski}).bindPopup(`<h4>ÖTZTAL: GURGL</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//HOCHKÖSSEN
L.marker([47.653269, 12.421043], {icon: icon_ski}).bindPopup(`<h4>HOCHKÖSSEN</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//NORDKETTE
L.marker([47.306428, 11.379797], {icon: icon_ski}).bindPopup(`<h4>NORDKETTE</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//KATZENKOPF LEUTASCH
L.marker([47.363705, 11.165772], {icon: icon_ski}).bindPopup(`<h4>KATZENKOPF LEUTASCH</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//KELLERJOCHBAHN
L.marker([47.320860, 11.719789], {icon: icon_ski}).bindPopup(`<h4>KELLERJOCHBAHN</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//MUTTERER ALM
L.marker([47.222450, 11.366550], {icon: icon_ski}).bindPopup(`<h4>MUTTERER ALM</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//BERGBAHNEN OBERPERFUSS
L.marker([47.245694, 11.237492], {icon: icon_ski}).bindPopup(`<h4>BERGBAHNEN OBERPERFUSS</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)

//SERLES
L.marker([47.163648, 11.380017], {icon: icon_ski}).bindPopup(`<h4>BERGBAHNEN SERLES</h4><hr style="border: none; height: 1px; background-color:white;">`, {className: 'popup_ski'}).addTo(themaLayer.skigebiete)