let mapa = document.getElementById('map')
var map = L.map('map').setView([mapa.dataset.sirina, mapa.dataset.duzina], mapa.dataset.zoom);
      var gl = L.mapboxGL({
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
        accessToken: 'not-needed',
        style: 'https://api.maptiler.com/maps/b70c705e-6b80-4cc6-8718-0e061c056073/style.json?key=fuDms8pP4WajMwiCl9A9'
      }).addTo(map);

var sviStubovi = [];
var stuboviMarkers = L.layerGroup().addTo(map);
var stubIcon = L.icon({iconUrl: '/img/stub.png',  iconSize: [20, 20]})
var stubEditableIcon = L.icon({iconUrl: '/img/stubEditable.png',  iconSize: [20, 20]})


var sviVodovi = [];
var vodoviPolylines = L.layerGroup().addTo(map);

var sveTrafostanice = [];
var trafostaniceMarkers = L.layerGroup().addTo(map);

var sviPotrosaci = [];
var potrosaciMarkers = L.layerGroup().addTo(map);
var potrosacIcon = L.icon({iconUrl: '/img/potrosac.png',  iconSize: [20, 20]})


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
                let marker = L.marker(stub.geometry.coordinates, {icon: stubIcon}).addTo(map)
                sviStubovi.push({
                    marker: marker,
                    stub: stub
                })
                marker.data = stub
                marker.on('click', function(e) {
                    if (window.ukloniStub) {
                        ukloniStub(e.target)
                    }
                    if (window.dodajUVod) {
                        dodajUVod(e.target)
                    }

                    if (window.oznaciPovezaneVodove) {
                        oznaciPovezaneVodove(e.target)
                    }
                });
                stuboviMarkers.addLayer(marker);
            });
            zoom_based_layerchange()
        },
    
        function fail(data, status) {
            alert('Request failed.  Returned status of ' + status);
        }
    );
}

function showAllVodovi () {
    $.ajax('/api/vod', {
        data: {
            
        }
    })
    .then(
        function success(vodovi) {
            vodovi.data.forEach(vod => {
                let vodLine = L.polyline(vod.geometry.coordinates, { className: 'my_polyline'}).addTo(map)
                sviVodovi.push({
                    vodLine: vodLine,
                    vod: vod
                })
                vodLine.data = vod
                // marker.on('click', function(e) {
                //     if (window.ukloniStub) {
                //         ukloniStub(e.target)
                //     }
                //     if (window.dodajUVod) {
                //         dodajUVod(e.target)
                //     }
                // });
                vodoviPolylines.addLayer(vodLine);
            });
      
            zoom_based_layerchange()
        },
    
        function fail(data, status) {
            alert('Request failed.  Returned status of ' + status);
        }
    );
}

function showAllTrafostanice () {
    $.ajax('/api/trafostanica', {
        data: {
            
        }
    })
    .then(
        function success(trafostanice) {
            sveTrafostanice = []
            trafostanice.forEach(trafostanica => {
                // let marker = L.marker(stub.geometry.coordinates, {icon: stubIcon}).addTo(map)
                let marker = L.marker(trafostanica.geometry.coordinates).addTo(map)
                sveTrafostanice.push({
                    marker: marker,
                    trafostanica: trafostanica
                })
                marker.data = trafostanica
                marker.on('click', function(e) {
                    if (window.ukloniTrafostanicu) {
                        ukloniTrafostanicu(e.target)
                    }
                    if (window.dodajUVodTrafostanicu) {
                        dodajUVodTrafostanicu(e.target)
                    }

                    if (window.oznaciPovezaneVodove) {
                        oznaciPovezaneVodove(e.target)
                    }
                });
                trafostaniceMarkers.addLayer(marker);
            });
            zoom_based_layerchange()
        },
    
        function fail(data, status) {
            alert('Request failed.  Returned status of ' + status);
        }
    );
}

function showAllPotrosaci () {
    $.ajax('/api/potrosac', {
        data: {
            
        }
    })
    .then(
        function success(potrosaci) {
            sviPotrosaci = []
            potrosaci.forEach(potrosac => {
                let marker = L.marker(potrosac.geometry.coordinates, {icon: potrosacIcon}).addTo(map).bindPopup(`${potrosac.ime}`)
                // let marker = L.marker(trafostanica.geometry.coordinates).addTo(map)
                sviPotrosaci.push({
                    marker: marker,
                    potrosac: potrosac
                })
                marker.data = potrosac;
                marker.on('click', (e) => {
                    console.log('kliknjuti')
                    if (window.dodajUVodPotrosac) {
                        dodajUVodPotrosac(e.target)
                    }

                    if (window.oznaciPovezaneVodove) {
                        oznaciPovezaneVodove(e.target)
                    }
                });
                marker.on('mouseover', function (e) {
                    e.target.openPopup();
                });
                marker.on('mouseout', function (e) {
                    e.target.closePopup();
                });
                potrosaciMarkers.addLayer(marker);
            });
            zoom_based_layerchange()
        },
    
        function fail(data, status) {
            alert('Request failed.  Returned status of ' + status);
        }
    );
}

map.on('zoom', function (e) {
    zoom_based_layerchange();
});


function zoom_based_layerchange() {
    //console.log(map.getZoom());

var currentZoom = map.getZoom();
    if (currentZoom < 20) {
        map.removeLayer(stuboviMarkers);
    } else {
        map.addLayer(stuboviMarkers);
    }

    if (currentZoom < 18) {
        map.removeLayer(potrosaciMarkers);
    } else {
        map.addLayer(potrosaciMarkers);
    }

    if (currentZoom < 14) {
        map.removeLayer(trafostaniceMarkers);
    } else {
        map.addLayer(trafostaniceMarkers);
    }
}

function addVodToMap(tacke) {
    vod = L.polyline(tacke).addTo(map)
    vodoviPolylines.addLayer(vod)
}

var overlay = {
    'vodovi': vodoviPolylines,
    'stubovi': stuboviMarkers,
    'trafostanice':trafostaniceMarkers,
    'potrosaci': potrosaciMarkers
    };
L.control.layers(null, overlay).addTo(map);
