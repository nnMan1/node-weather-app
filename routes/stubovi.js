const express = require('express')
const router = express.Router()
const Stub = require('../models/Stub')
const db = require('../config/database')
const Stanje = require('../models/Stanje')

router.get('/stub', (req, res) => {
    Stub.findAll({
        include: Stanje
    })
        .then( stubovi => {
            res.send(stubovi)
        })
        .catch(err => console.log(err))
})

router.get('/stub/id', (req, res) => {
    
})

module.exports = router