const express = require('express')
const hbs = require('hbs')
const router = express.Router()


router.get('/stub/add', (req, res) => {
    console.log("pozvan")
    res.render('stubAdd', {
        title: 'Elektro sistem',
        name: 'Dosljak Velibor'
    })
})


module.exports = router