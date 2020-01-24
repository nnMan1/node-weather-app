function addStub (data) {
    $.ajax('/api/stub', {
            method: 'POST',
            data: data
        })
        .then(
            function success() {
                alert("Stub je uspjesno dodat");
                window.open("/");
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


map.on('zoomend', function (e) {
    zoom_based_layerchange();
});


function zoom_based_layerchange() {
    //console.log(map.getZoom());

var currentZoom = map.getZoom();
    if (currentZoom < 17) {
        map.removeLayer(stuboviMarkers);
    } else {
        map.addLayer(stuboviMarkers);
    }
}


document.getElementById("map").style.cursor = "crosshair";
