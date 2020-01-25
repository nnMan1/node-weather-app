
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