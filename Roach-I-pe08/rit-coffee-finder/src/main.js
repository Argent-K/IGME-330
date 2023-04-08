import * as map from "./map.js";
import * as ajax from "./ajax.js";

let poi;

function init() {
    map.initMap();
    map.loadMarkers();
    map.addMarkersToMap();
    setupUi();
    
}

const loadPOI = () => {
    const url = "https://people.rit.edu/~acjvks/shared/330/igm-points-of-interest.php";

    const poiLoaded = (jsonString) => {
        poi = JSON.parse(jsonString);
        console.log(poi);

        for (let p of poi) {
            map.addMarker(p.coordinates, p.title, "A POI!", "poi");
        }
    }

    ajax.downloadFile(url, poiLoaded);
}

const setupUi = () => {
    const lnglatRIT = [-77.67454147338866, 43.08484339838443];
    const lnglatIGM = [-77.67990589141846, 43.08447511795301];

    btn1.onclick = () => {
        map.setZoomLevel(15.5);
        map.setPitchAndBearing(0, 0);
        map.flyTo(lnglatRIT);
    }

    btn2.onclick = () => {
        map.setZoomLevel(15.5);
        map.setPitchAndBearing(45,0);
        map.flyTo(lnglatRIT);
    }

    btn3.onclick = () => {
        map.setZoomLevel();
        map.setPitchAndBearing(0,0);
        map.flyTo();
    }

    btn4.onclick = () => {
        map.setZoomLevel(18);
        map.setPitchAndBearing(0,0);
        map.flyTo(lnglatIGM);
    }

    btn5.onclick = () => {
        if (!poi) {
            loadPOI();
        }
    }
}

export {init};
