//Menü Grundlage

const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', function() {
    nav.classList.toggle('nav-open');
});


//FAHRRADTOURENLeitfaden
let inhalt_pd = ["Natterer See & Axams","Abendrunde Ampass","Innsbruck-Telfs","Pfaffenhofen-Innsbruck"]; //Array um Bezeichnung für die Wanderungen festzulegen

let IT = document.getElementById("IT");
let PI = document.getElementById("PI"); 
let AA = document.getElementById("AA");
let NA = document.getElementById("NA");  //Abfrage der Div-Elemente für die entsprechende Slideshow (Werden in Variable gespeichert)


/*Innerhalb ShowSlides eine weitere ELSE IF-Anweisung
Innerhalb pulldownOnCHange eine weitere ELSE IF-Anweisung*/


//ERSTELLUNG DER LEAFLET-MAP
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
    theme: "ibk_bike",
}).addTo(w_map);
controlElevation.load("Fahrradtouren/Fahrradrunde_Natters_Axams.gpx"); //Erste Wanderung die bei Start der Seite angezeigt wird

//Pulldown Menü

let pulldown = document.querySelector("#pulldown"); //Styling PullDown Menu

console.log(inhalt_pd);

for (i = 0; i < inhalt_pd.length; i++) {
    let status = "";
    if (inhalt_pd[i] == "IT") {
        status = " selected ";   //Anzeige der aktuellen Etappe
    }
    pulldown.innerHTML += `<option ${status} value="${inhalt_pd[i]}"> ${inhalt_pd[i]}</option>`;
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

    if (IT.style.display === "block") {
        slides = document.querySelectorAll("#IT .mySlides");
    }

    else if (PI.style.display === "block") {
        slides = document.querySelectorAll("#PI .mySlides");
    }

    else if (AA.style.display === "block") {
        slides = document.querySelectorAll("#AA .mySlides");
    }

    else if (NA.style.display === "block") {
        slides = document.querySelectorAll("#NA .mySlides");
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
L.marker([47.268011, 11.387808], { icon: marker }).addTo(markerGroup).bindPopup(`<b>START / ZIEL:</b> Innsbruck <br> 47.268011 | 11.387808`, {className: 'Popup_map_w' });



//Funkion welche regelt, wass bei KLick auf das Pulldown Menü passiert

pulldown.onchange = function (evt) {
    let abfrage = evt.target.value;
    var elements = document.querySelectorAll('.Bilder');
    var informationen = document.querySelectorAll('.informationen');

    elements.forEach(function (element) {
        if (window.getComputedStyle(element).display === 'block') {
            element.style.display = "none";
        }
    });

    informationen.forEach(function (element) {
        if (window.getComputedStyle(element).display === 'flex') {
            element.style.display = "none";
        }
    });


    if (abfrage == "Innsbruck-Telfs") {
        IT.style.display = "block";
        IT_daten.style.display = "flex";
        showSlides(slideIndex);
        controlElevation.clear();
        controlElevation.load("Fahrradtouren/Innsbruck_Telfs.gpx");

        markerGroup.clearLayers();
        L.marker([47.268039, 11.387847], { icon: marker }).addTo(markerGroup).bindPopup(`<b>START / ZIEL:</b> Innsbruck <br> 47.268039 | 11.387847`, {className: 'Popup_map_w' });;
    }

    else if (abfrage == "Pfaffenhofen-Innsbruck") {
        PI.style.display = "block";
        PI_daten.style.display = "flex";
        showSlides(slideIndex);
        controlElevation.clear();
        controlElevation.load("Fahrradtouren/PAF_Innsbruck.gpx");

        markerGroup.clearLayers();
        L.marker([47.268136, 11.387890], { icon: marker }).addTo(markerGroup).bindPopup(`<b>ZIEL:</b> Innsbruck <br> 47.268136 | 11.387890`, {className: 'Popup_map_w' });
        L.marker([48.538449, 11.515950], { icon: marker }).addTo(markerGroup).bindPopup(`<b>START:</b> Pfaffenhofen a.d.Ilm <br> 48.538449 | 11.515950`, {className: 'Popup_map_w' });
    }

    else if (abfrage == "Abendrunde Ampass") {
        AA.style.display = "block";
        AA_daten.style.display = "flex";
        showSlides(slideIndex);
        controlElevation.clear();
        controlElevation.load("Fahrradtouren/Ampass.gpx");

        markerGroup.clearLayers();
        L.marker([47.267891, 11.387856], { icon: marker }).addTo(markerGroup).bindPopup(`<b>ZIEL:</b> Innsbruck <br> 47.267891 | 11.387856`, {className: 'Popup_map_w' });
        L.marker([47.267091, 11.394003], { icon: marker }).addTo(markerGroup).bindPopup(`<b>START:</b> Innsbruck <br> 47.267091 | 11.394003`, {className: 'Popup_map_w' });
    }

    else if (abfrage == "Natterer See & Axams") {
        NA.style.display = "block";
        NA_daten.style.display = "flex";
        showSlides(slideIndex);
        controlElevation.clear();
        controlElevation.load("Fahrradtouren/Fahrradrunde_Natters_Axams.gpx");

        markerGroup.clearLayers();
        L.marker([47.268011, 11.387808], { icon: marker }).addTo(markerGroup).bindPopup(`<b>START / ZIEL:</b> Innsbruck <br> 47.268011 | 11.387808`, {className: 'Popup_map_w' });
        
    }

}







