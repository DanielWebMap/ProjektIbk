//WANDERUNGEN Leitfaden

let inhalt_pd = ["Von Innsbruck nach Seefeld", "Einmal um den Achensee", "Runde bei Kranebitten", "Durch die Sillschlucht"]; //Array um Bezeichnung für die Wanderungen festzulegen

let Seefeld = document.getElementById("Seefeld");  //Abfrage der Div-Elemente für die entsprechende Slideshow (Werden in Variable gespeichert)
let Achensee = document.getElementById("Achensee");
let Kranebitten = document.getElementById("Kranebitten");
let Sillschlucht = document.getElementById("Sillschlucht");

/*Innerhalb ShowSlides eine weitere ELSE IF-Anweisung
Innerhalb pulldownOnCHange eine weitere ELSE IF-Anweisung*/


//Erstellung der Leaflet Karte

let w_map = L.map("w_map", {fullscreenControl: true}).setView([47.2683, 11.3933], 13);

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
controlElevation.load("Wanderungen/Seefeld.gpx"); //Erste Wanderung die bei Start der Seite angezeigt wird

//Pulldown Menü

let pulldown = document.querySelector("#pulldown"); //Styling PullDown Menu

console.log(inhalt_pd);

for (i=0; i<inhalt_pd.length; i++) {
    let status = "";
    if (inhalt_pd[i] == "Seefeld"){
        status = " selected ";   //Anzeige der aktuellen Etappe
    }
    pulldown.innerHTML += `<option ${status} value="${inhalt_pd[i]}">${inhalt_pd[i]}</option>`;
}



//SLIDESHOW

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
    
    if (Seefeld.style.display === "block") {
    slides = document.querySelectorAll("#Seefeld .mySlides"); }

    else if (Achensee.style.display === "block") {
    slides = document.querySelectorAll("#Achensee .mySlides");
    }

    else if (Kranebitten.style.display === "block") {
    slides = document.querySelectorAll("#Kranebitten .mySlides");
    }

    else if (Sillschlucht.style.display === "block") {
        slides = document.querySelectorAll("#Sillschlucht .mySlides");
        }

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}


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
L.marker([47.265052, 11.340374], { icon: marker }).addTo(markerGroup).bindPopup(`<b>START</b> Innsbruck <br> 47.265052 | 11.340374`, {className: 'Popup_map_w' });
L.marker([47.328882, 11.189220], { icon: marker }).addTo(markerGroup).bindPopup(`<b>ZIEL:</b> Seefeld in Tirol <br> 47.328882 | 11.189220`, {className: 'Popup_map_w' });




//Funkion welche regelt, wass bei KLick auf das Pulldown Menü passiert

pulldown.onchange = function (evt) {
    let abfrage = evt.target.value;
    var elements = document.querySelectorAll('.Bilder');
    var informationen = document.querySelectorAll('.informationen');
    
    elements.forEach(function(element) {
        if (window.getComputedStyle(element).display === 'block') {
            element.style.display = "none";
        } 
     });

     informationen.forEach(function(element) {
        if (window.getComputedStyle(element).display === 'flex') {
            element.style.display = "none";
        } 
     });   
    
    if (abfrage == "Von Innsbruck nach Seefeld") {
        Seefeld.style.display = "block";
        seefeld_daten.style.display = "flex";
        showSlides(slideIndex);
        controlElevation.clear();
        controlElevation.load("Wanderungen/Seefeld.gpx");

        markerGroup.clearLayers();
        L.marker([47.265052, 11.340374], { icon: marker }).addTo(markerGroup).bindPopup(`<b>START:</b> Innsbruck <br> 47.265052 | 11.340374`, {className: 'Popup_map_w' });
        L.marker([47.328882, 11.189220], { icon: marker }).addTo(markerGroup).bindPopup(`<b>Ziel:</b> Seefeld in Tirol <br> 47.328882 | 11.189220`, {className: 'Popup_map_w' });
    }

    else if (abfrage == "Einmal um den Achensee") {
        Achensee.style.display = "block";
        achensee_daten.style.display = "flex";
        showSlides(slideIndex);
        controlElevation.clear();
        controlElevation.load("Wanderungen/Achensee.gpx");

        markerGroup.clearLayers();
        L.marker([47.424384, 11.748980], { icon: marker }).addTo(markerGroup).bindPopup(`<b>START / ZIEL:</b> Maurach (Busstation) <br> 47.424384 | 11.748980`, {className: 'Popup_map_w' });
    }

    else if (abfrage == "Runde bei Kranebitten") {
        Kranebitten.style.display = "block";  //Umstellen
        kranebitten_daten.style.display = "flex";
        showSlides(slideIndex);
        controlElevation.clear();
        controlElevation.load("Wanderungen/Kranebitten.gpx");

        markerGroup.clearLayers();
        L.marker([47.269562, 11.328365], { icon: marker }).addTo(markerGroup).bindPopup(`<b>START / ZIEL: </b> Kranebitten Bahnhof <br> 47.269562 | 11.328365`, {className: 'Popup_map_w' });
    }

    else if (abfrage == "Durch die Sillschlucht") {
        Sillschlucht.style.display = "block";  //Umstellen
        Sillschlucht_daten.style.display = "flex";
        showSlides(slideIndex);
        controlElevation.clear();
        controlElevation.load("Wanderungen/Sillschlucht.gpx");

        markerGroup.clearLayers();
        L.marker([47.246534, 11.393656], { icon: marker }).addTo(markerGroup).bindPopup(`<b>START: </b> Bahnhof Innsbruck Sonnenburgerhof <br> 47.246534 | 11.393656`, {className: 'Popup_map_w' });
        L.marker([47.252817, 11.399659], { icon: marker }).addTo(markerGroup).bindPopup(`<b>Ziel: </b> Bahnhof Bergisel<br> 47.252817 | 11.399659`, {className: 'Popup_map_w' });
    }

}



