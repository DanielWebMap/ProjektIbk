//WANDERUNGEN Leitfaden

let inhalt_pd = ["Von Innsbruck nach Seefeld", "Einmal um den Achensee", "Runde bei Kranebitten"]; //Array um Bezeichnung für die Wanderungen festzulegen

let Seefeld = document.getElementById("Seefeld");  //Abfrage der Div-Elemente für die entsprechende Slideshow (Werden in Variable gespeichert)
let Achensee = document.getElementById("Achensee");
let Kranebitten = document.getElementById("Kranebitten");

/*Innerhalb ShowSlides eine weitere ELSE IF-Anweisung
Innerhalb pulldownOnCHange eine weitere ELSE IF-Anweisung*/


//Erstellung der Leaflet Karte

let w_map = L.map("w_map", {fullscreenControl: true}).setView([47.2683, 11.3933], 13);

L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
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

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}


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

    }

    else if (abfrage == "Einmal um den Achensee") {
        Achensee.style.display = "block";
        achensee_daten.style.display = "flex";
        showSlides(slideIndex);
        controlElevation.clear();
        controlElevation.load("Wanderungen/Achensee.gpx");
    }

    else if (abfrage == "Runde bei Kranebitten") {
        Kranebitten.style.display = "block";  //Umstellen
        kranebitten_daten.style.display = "flex";
        showSlides(slideIndex);
        controlElevation.clear();
        controlElevation.load("Wanderungen/Kranebitten.gpx");
    }

}



