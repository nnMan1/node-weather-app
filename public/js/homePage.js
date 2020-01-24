
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
    switch (selectedValue) {
        case "Stub":
            let center = map.getCenter()
            let zoom = map.getZoom()
            window.open(`/stub/add?sirina=${center.lat}&duzina=${center.lng}&zoom=${zoom}`,"_self")
            break
    }
}