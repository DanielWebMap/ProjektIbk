//Karte für bisherige Reiseziele

let D_map = L.map('D_map');

if (window.innerWidth < 768) {
    D_map.setView([21.633053, 22.623649], 1);
}

else {
    D_map.setView([21.633053, 22.623649], 3);
}


var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
}).addTo(D_map);

L.control.scale({
    imperial: false,
}).addTo(D_map);



//DATENIMPORT GEOJSON

async function showGeojsonWelt(url) {
    let response = await fetch(url);
    let geojson = await response.json();

    //Erstellung GeoJSON Objekt 
    L.geoJSON(geojson, {
        style: style
    }).addTo(D_map);

}




//STYLE FUNKTION

function style(feature) {
    return {
        opacity: 1,
        weight: 2,
        color: "black",
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.name)
    };
}


//GETCOLOR 

//Hier Länder eintragen (Tschechien)
let Laender_Europa = ['Germany', 'Austria', 'France', 'Italy', 'Spain', 'Portugal', 'Iceland', 'Sweden', 'Norway', 'Belgium', 'Netherlands', 'United Kingdom', 'Hungary', 'Switzerland', 'Slovenia', 'Romania', 'Serbia', 'Montenegro', 'Albania', 'Denmark', 'Czechia', 'Slovakia']
let Laender_Welt = ['Canada', 'New Zealand', 'Japan', 'China'];


function getColor(name) {
    while (Laender_Europa.includes(name)) {
        return "#fabd71";
    }

    while (Laender_Welt.includes(name)) {
        return "#e2e058";
    }

    return "white";
}


showGeojsonWelt("/data/Laender_Welt.json");
