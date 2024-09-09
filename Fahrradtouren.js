//FAHRRADTOURENLeitfaden

let inhalt_pd = ["Innsbruck-Telfs", "Pfaffenhofen-Innsbruck"]; //Array um Bezeichnung für die Wanderungen festzulegen

let IT = document.getElementById("IT");
let PI = document.getElementById("PI");  //Abfrage der Div-Elemente für die entsprechende Slideshow (Werden in Variable gespeichert)


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
    theme: "ibk_bike",
}).addTo(w_map);
controlElevation.load("Fahrradtouren/Innsbruck_Telfs.gpx"); //Erste Wanderung die bei Start der Seite angezeigt wird

//Pulldown Menü

let pulldown = document.querySelector("#pulldown"); //Styling PullDown Menu

console.log(inhalt_pd);

for (i=0; i<inhalt_pd.length; i++) {
    let status = "";
    if (inhalt_pd[i] == "IT"){
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
    slides = document.querySelectorAll("#IT .mySlides"); }

    else if (PI.style.display === "block") {
    slides = document.querySelectorAll("#PI .mySlides");
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

        
    
    if (abfrage == "Innsbruck-Telfs") {
        IT.style.display = "block";
        IT_daten.style.display = "flex";
        showSlides(slideIndex);
        controlElevation.clear();
        controlElevation.load("Fahrradtouren/Innsbruck_Telfs.gpx");

    }

    else if (abfrage == "Pfaffenhofen-Innsbruck") {
        PI.style.display = "block";
        PI_daten.style.display = "flex";
        showSlides(slideIndex);
        controlElevation.clear();
        controlElevation.load("Fahrradtouren/PAF_Innsbruck.gpx");
    }

}
