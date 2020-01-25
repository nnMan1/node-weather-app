function addTrafostanica (data) {
    $.ajax('/api/trafostanica', {
            method: 'POST',
            data: data
        })
        .then(
            function success(trafostanica) {
                let marker = L.marker(trafostanica.geometry.coordinates).addTo(map)
                marker.data = stub
                marker.on('click', function(e) {
                    if (ukloniStub) {
                        ukloniStub(e.target)
                    }
                });
                trafostaniceMarkers.addLayer(marker);
            },
        
            function fail(data, status) {
                alert('Request failed.  Returned status of ');
            }
        );
}


map.on('click', function(e) {   
    var popLocation= e.latlng;     
    addTrafostanica({
        coordinates: [popLocation.lat, popLocation.lng],
        stanje_id: 1,
        naziv: "Trafostanica test naziv"
    });    
});

document.getElementById("map").style.cursor = "crosshair";

function ukloniStub (marker) {
    // $.ajax('/api/stub', {
    //     method: 'DELETE',
    //     data: {
    //        id: marker.data.id
    //     }
    // })
    // .then(
    //     function success() {
    //         map.removeLayer(marker);
    //     },
    
    //     function fail(data, status) {
    //         alert('Request failed.  Returned status of ');
    //     }
    // );
}

document.getElementById("addElementButton").onclick 
= () => {
    let center = map.getCenter()
    let zoom = map.getZoom()
    window.open(`/?sirina=${center.lat}&duzina=${center.lng}&zoom=${zoom}`,"_self")
}

showAllStubovi();
showAllVodovi();
showAllTrafostanice();