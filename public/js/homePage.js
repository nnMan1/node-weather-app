
var selectedValue = undefined
var addElementTypeRadioButtons = document.getElementsByName('elementToAdd') 

addElementTypeRadioButtons.forEach(radioButton => {
    radioButton.onclick = (e) => {
        selectedValue = e.target.value
        console.log(e.target.value)
        addElementButton.disabled = false;
    }
});

var addElementButton = document.getElementById("addElementButton");
addElementButton.disabled = true;
addElementButton.onclick = () => {
    let center = map.getCenter()
    let zoom = map.getZoom()
    switch (selectedValue) {
        case "Stub":
            window.open(`/stub/add?sirina=${center.lat}&duzina=${center.lng}&zoom=${zoom}`,"_self")
            break
        case "Vod": 
            window.open(`/vod/add?sirina=${center.lat}&duzina=${center.lng}&zoom=${zoom}`,"_self")
            break
    }
}

function oznaciPovezaneVodove(marker) {
    let coordinates = marker.data.geometry.coordinates

    $.ajax('/api/vod/connected', {
        method: 'GET',
        data: {coordinates: coordinates}
    })
    .then(
        function success(ids) {
            var realIds = []
            for (i = 0; i< ids.length; i++) { realIds.push(parseInt(ids[i].id)); }
            for (i=0; i<sviVodovi.length; i++) {
                let vod = sviVodovi[i];
                if (realIds.includes(vod.vod.id)) {
                    map.removeLayer(vod.vodLine)
                    vod.vodLine = L.polyline(vod.vod.geometry.coordinates, { className: 'uIstojMrezi'}).addTo(map)
                }
            }
        },
    
        function fail(data, status) {
            alert('Request failed.  Returned status of ');
        }
    );
}

showAllStubovi();
showAllVodovi();