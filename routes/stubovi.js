const express = require('express')
const router = express.Router()
const Stub = require('../models/Stub')
const db = require('../config/database')

router.get('/stub', (req, res) => {
    Stub.findAll()
        .then( stubovi => {
            console.log(stubovi)
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
})

router.get('/stub/id', (req, res) => {
    
})

module.exports = router