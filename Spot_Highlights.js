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
    skigebiete: L.featureGroup(),
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
    "Skigebiete": themaLayer.freizeit,
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
L.marker([47.267207, 11.395057], {icon: icon_cafe}).bindPopup(`<h4>Café Momo</h4> <p>Gemütliches und schönes Café.<br> Man sitzt im Hinterhof, dadurch kein Lärm.</p> <a href="https://www.cafe-momo.at/">Link zur Website</a>`, {className: 'popup_cafe'}).addTo(themaLayer.gastronomie)



//BARS

var icon_bar = L.icon({
    iconUrl: 'icons/bar.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});

//Liquid Diary
L.marker([47.266433, 11.392113], {icon: icon_bar}).bindPopup(`<h4>Liquid Diary</h4> <p>Beste Premiumbar in Innsbruck<br> Sehr guter Service, einzigartige Cocktails.</p> <a href="https://www.liquiddiary.com/">Link zur Website</a>`, {className: 'popup_bar'}).addTo(themaLayer.gastronomie)



//RESTAURANTS

var icon_restaurant = L.icon({
    iconUrl: 'icons/restaurant.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});

//Grieche Akropolis
L.marker([47.266648, 11.391015], {icon: icon_restaurant}).bindPopup(`<h4>Akropolis (Griechisch)</h4> <p>Lieblingsrestaurant in Innsbruck<br> Sehr gute & leckere Portionen, schönes Ambiente und guter Service</p> <a href="https://akropolis-innsbruck.com/">Link zur Website</a>`, {className: 'popup_restaurant'}).addTo(themaLayer.gastronomie)