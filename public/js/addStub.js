function addStub (data) {
    $.ajax('/api/stub', {
            method: 'POST',
            data: data
        })
        .then(
            function success(stub) {
                let marker = L.marker(stub.geometry.coordinates).addTo(map)
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
    window.open("/","_self")
}