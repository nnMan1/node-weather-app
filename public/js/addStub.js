var upravoDodatiStubovi = []

function addStub (data) {
    $.ajax('/api/stub', {
            method: 'POST',
            data: data
        })
        .then(
            function success(stub) {
                upravoDodatiStubovi.push(stub.id);
                let marker = L.marker(stub.geometry.coordinates, {icon: stubEditableIcon}).addTo(map)
                marker.data = stub
                marker.on('click', function(e) {
                    if (ukloniStub) {
                        ukloniStub(e.target)
                    }
                });
                stuboviMarkers.addLayer(marker);
            },
        
            function fail(data, status) {
                alert('Request failed.  Returned status of ');
            }
        );
}


map.on('click', function(e) {   
    var popLocation= e.latlng;     
    addStub({
        geo_duzina: popLocation.lat,
        geo_sirina: popLocation.lng,
        stanje_id: 1
    });    
});

document.getElementById("map").style.cursor = "crosshair";

function ukloniStub (marker) {

    if (!upravoDodatiStubovi.includes(marker.data.id)) { alert('Mozete ukloniti samo stubove koje ste dodali u ovoj sesiji'); return; }

    $.ajax('/api/stub', {
        method: 'DELETE',
        data: {
           id: marker.data.id
        }
    })
    .then(
        function success() {
            map.removeLayer(marker);
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
showAllPotrosaci();
showAllTrafostanice();