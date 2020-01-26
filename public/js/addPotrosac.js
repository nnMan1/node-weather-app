var potrosacData
var potrosacMarker
let imeInputField = document.querySelector("#nameInputField")
imeInputField.value = ""

function addPotrosac (data) {
    $.ajax('/api/potrosac', {
            method: 'POST',
            data: data
        })
        .then(
            function success(potrosac) {
                let marker = L.marker(potrosac.geometry.coordinates, {icon: potrosacIcon}).addTo(map)
                marker.data = potrosac
                marker.on('click', function(e) {
                    if (window.ukloniPotrosac) {
                        ukloniPotrosac(e.target)
                    }
                });
                stuboviMarkers.addLayer(marker);
                imeInputField.value = ""
            },
        
            function fail(data, status) {
                alert('Request failed.  Returned status of ');
            }
        );
}


map.on('click', function(e) {   
    var popLocation= e.latlng; 
    if (imeInputField.value == "") {
        alert("Morate popuniti ime potrosaca")
        return
    }    
    addPotrosac({
        coordinates: [popLocation.lat, popLocation.lng],
        ime: imeInputField.value,
        stanje_id: 1
    });    
});

document.getElementById("map").style.cursor = "crosshair";

// function ukloniStub (marker) {
//     $.ajax('/api/stub', {
//         method: 'DELETE',
//         data: {
//            id: marker.data.id
//         }
//     })
//     .then(
//         function success() {
//             map.removeLayer(marker);
//         },
    
//         function fail(data, status) {
//             alert('Request failed.  Returned status of ');
//         }
//     );
// }

document.getElementById("addElementButton").onclick 
= () => {
    let center = map.getCenter()
    let zoom = map.getZoom()
    window.open(`/?sirina=${center.lat}&duzina=${center.lng}&zoom=${zoom}`,"_self")
}

showAllStubovi();
showAllVodovi();
showAllPotrosaci();