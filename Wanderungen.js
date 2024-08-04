//WANDERUNGEN Leitfaden

let inhalt_pd = ["Seefeld", "Achensee", "Kranebitten"]; //Array um Bezeichnung für die Wanderungen festzulegen

let Seefeld = document.getElementById("Seefeld");  //Abfrage der Div-Elemente für die entsprechende Slideshow (Werden in Variable gespeichert)
let Achensee = document.getElementById("Achensee");
let Kranebitten = document.getElementById("Kranebitten");

/*Innerhalb ShowSlides eine weitere ELSE IF-Anweisung
Innerhalb pulldownOnCHange eine weitere ELSE IF-Anweisung*/


//Erstellung der Leaflet Karte

let w_map = L.map("w_map").setView([47.2683, 11.3933], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
    
    elements.forEach(function(element) {
        if (window.getComputedStyle(element).display === 'block') {
            element.style.display = "none";
        }  });
    

    if (abfrage == "Seefeld") {
        Seefeld.style.display = "block";
        showSlides(slideIndex);
        controlElevation.clear();
        controlElevation.load("Wanderungen/Seefeld.gpx");
    }

    else if (abfrage == "Achensee") {
        Achensee.style.display = "block";
        showSlides(slideIndex);
        controlElevation.clear();
        controlElevation.load("Wanderungen/Achensee.gpx");
    }

    else if (abfrage == "Kranebitten") {
        Kranebitten.style.display = "block";  //Umstellen
        showSlides(slideIndex);
        controlElevation.clear();
        controlElevation.load("Wanderungen/Kranebitten.gpx");
    }

}



