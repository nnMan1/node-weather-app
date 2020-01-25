let tacke = []
let oznaceniKrug = undefined
let vod
let circle

function getDistance(origin, destination) {
    // return distance in meters
    var lon1 = toRadian(origin[1]),
        lat1 = toRadian(origin[0]),
        lon2 = toRadian(destination[1]),
        lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
}
function toRadian(degree) {
    return degree*Math.PI/180;
}

function dodajUVod(marker) {
    if (tacke === undefined || tacke.length === 0) {
        
    } else {
        let lastPoint = tacke[tacke.length - 1];
        if (getDistance(lastPoint, marker.data.geometry.coordinates) > 25) {
            alert("Oznacite stub koja je na rastojanju manjem od 25m od poslednjeg stuba");
            return;
        }

        if(tacke.includes(marker.data.geometry.coordinates)) {
            alert("Oznacite stub koji nije vec povezan u mrezu");
            return;
        }

        map.removeLayer(vod)
        map.removeLayer(circle)
    }
    tacke.push(marker.data.geometry.coordinates)
    circle = L.circle(marker.data.geometry.coordinates, 25, {className: 'avalibleStubovi'}).addTo(map);

    vod = L.polyline(tacke, {className: 'vodUObradi'}).addTo(map)
    // }
}

document.getElementById("save").onclick = () => {
    $.ajax('/api/vod', {
        method: 'POST',
        data: {
            tacke: tacke,
            napon: 220,
            otpor: 1,
            vod_tip_id: 4,
            stanje_id: 1
        }
    })
    .then(
        function success(vod) {
            alert("Uspjesno ste dodali vod")
            addVodToMap(tacke)
            map.removeLayer(circle)
            map.removeLayer(vod)
            tacke = []
        },
    
        function fail(data, status) {
            alert('Request failed.  Returned status of ');
        }
    );
}

document.getElementById("addElementButton").onclick 
= () => {
    let center = map.getCenter()
    let zoom = map.getZoom()
    window.open(`/?sirina=${center.lat}&duzina=${center.lng}&zoom=${zoom}`,"_self")
}

showAllStubovi();
showAllVodovi();