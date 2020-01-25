const express = require('express')
const hbs = require('hbs')
const router = express.Router()


router.get('/potrosac/add', (req, res) => {
    console.log("pozvan")
    let sirina = 42.77524;
    let duzina = 19.42383;
    let zoom = 9;
    if (req.query.sirina !== undefined) sirina = req.query.sirina
    if (req.query.duzina !== undefined) duzina = req.query.duzina
    if (req.query.zoom !== undefined) zoom = req.query.zoom

    res.render('stubAdd', {
        title: 'Elektro sistem',
        sirina: sirina,
        duzina: duzina,
        zoom: zoom,
        name: 'Dosljak Velibor'
    })
})


module.exports = router