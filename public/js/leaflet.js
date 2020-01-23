var map = L.map('map').setView([42.77524, 19.42383], 8.2);
      var gl = L.mapboxGL({
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
        accessToken: 'not-needed',
        style: 'https://api.maptiler.com/maps/b70c705e-6b80-4cc6-8718-0e061c056073/style.json?key=fuDms8pP4WajMwiCl9A9'
      }).addTo(map);


var popLocation= new L.LatLng(42.77524, 19.42383);
var popup = L.popup()
    .setLatLng(popLocation)
    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    .openOn(map);

map.on('click', function(e) {        
        var popLocation= e.latlng;
        $.ajax('http://localhost:3001/stub', {
            method: 'POST',
            data: {
                geo_duzina: popLocation.lat,
                geo_sirina: popLocation.lng,
                stanje_id: 1
            }
        })
        .then(
            function success(name) {
                if (name !== newName) {
                    alert('Something went wrong.  Name is now ' + name);
                }
            },
        
            function fail(data, status) {
                alert('Request failed.  Returned status of ' + status);
            }
        );      
    });