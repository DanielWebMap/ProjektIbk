
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

//Pulldown Menü

let pulldown = document.querySelector("#pulldown"); //Styling PullDown Menu
let inhalt_pd = ["Seefeld", "Achensee", "Test1", "Test2"];


console.log(inhalt_pd);

for (i=0; i<inhalt_pd.length; i++) {
    let status = "";
    if (inhalt_pd[i] == "Seefeld"){
        status = " selected ";   //Anzeige der aktuellen Etappe
    }
    pulldown.innerHTML += `<option ${status} value="${inhalt_pd[i]}">${inhalt_pd[i]}</option>`;
}



//SLIDESHOW

let Seefeld = document.getElementById("Seefeld");
let Achensee = document.getElementById("Achensee");


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

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

pulldown.onchange = function (evt) {
    
    let abfrage = evt.target.value;
    
    if (abfrage == "Seefeld") {
        Seefeld.style.display = "block";
        Achensee.style.display = "none";
        showSlides(slideIndex);
    }

    else if (abfrage == "Achensee") {
        Seefeld.style.display = "none";
        Achensee.style.display = "block";
        showSlides(slideIndex);
    }

    //window.location.href = url;
}




//FUNKTION FÜR ÄNDERUNG DES INHALTS
/*
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
}*/