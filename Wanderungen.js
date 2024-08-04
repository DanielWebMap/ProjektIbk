
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
controlElevation.load("Wanderungen/Seefeld.gpx");


//SLIDESHOW

let content1 = document.getElementById("Seefeld");
let content2 = document.getElementById("Achensee");


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
    
    if (content1.style.display === "block") {
    slides = document.querySelectorAll("#Seefeld .mySlides"); }

    else if (content2.style.display === "block") {
    slides = document.querySelectorAll("#Achensee .mySlides");
    }

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}



//FUNKTION FÜR ÄNDERUNG DES INHALTS

function InhaltUmschalten() {

    if (content1.style.display === "none") {
        content1.style.display = "block";
        content2.style.display = "none";
        showSlides(slideIndex);

    } else {
        content1.style.display = "none";
        content2.style.display = "block";
        showSlides(slideIndex);
    }
}


let pulldown = document.querySelector("#pulldown"); //Styling PullDown Menu
let inhalt_pd = ["Seefeld", "Achensee", "Test1", "Test2"];

/*
for (i=0; i<inhalt_pd.length; i++) {
    let status = "";
    if (inhalt_pd[i] == "Seefeld"){
        status = " selected ";   //Anzeige der aktuellen Etappe
    }
    
}
*/
pulldown.innerHTML += "Hallo"


pulldown.onchange = function (evt) {
    let abfrage = evt.target.value;
    let url = `https://${username}.github.io/biketirol`;
    window.location.href = url;
}
