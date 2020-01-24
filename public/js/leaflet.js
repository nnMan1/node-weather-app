var map = L.map('map').setView([42.77524, 19.42383], 9);
      var gl = L.mapboxGL({
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
        accessToken: 'not-needed',
        style: 'https://api.maptiler.com/maps/b70c705e-6b80-4cc6-8718-0e061c056073/style.json?key=fuDms8pP4WajMwiCl9A9'
      }).addTo(map);

var sviStubovi = [];
var stuboviMarkers = L.layerGroup().addTo(map);

var vodovi = [];
var trafostanice = [];
var gradovi = [];
var selectedValue = undefined


// var popLocation= new L.LatLng(42.77524, 19.42383);
// var popup = L.popup()
//     .setLatLng(popLocation)
//     .setContent('<p>Hello world!<br />This is a nice popup.</p>')
//     .openOn(map);

//show all stubovi
function showAllStubovi () {
    $.ajax('/api/stub', {
        data: {
            
        }
    })
    .then(
        function success(stubovi) {
            sviStubovi = []
            stubovi.forEach(stub => {
                let marker = L.marker(stub.geometry.coordinates).addTo(map)
                sviStubovi.push({
                    marker: marker,
                    stub: stub
                })
                marker.data = stub
                marker.on('click', function(e) {
                    if (ukloniStub) {
                        ukloniStub(e.target)
                    }
                });
                stuboviMarkers.addLayer(marker);
            });
    
            var overlay = {'markers': stuboviMarkers};
            L.control.layers(null, overlay).addTo(map);
            zoom_based_layerchange()
        },
    
        function fail(data, status) {
            alert('Request failed.  Returned status of ' + status);
        }
    );
}


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


var addElementTypeRadioButtons = document.getElementsByName('elementToAdd') 

addElementTypeRadioButtons.forEach(radioButton => {
    radioButton.onclick = (e) => {
        selectedValue = e.target.value
        console.log(e.target.value)
        addElementButton.disabled = false;
    }
});


// var addElementButton = document.getElementById("addElementButton");
// addElementButton.disabled = true;
// addElementButton.onclick = () => {
//     document.getElementById("map").style.cursor = "crosshair";
// }


showAllStubovi()