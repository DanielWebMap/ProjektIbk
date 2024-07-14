
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