const express = require('express')
const router = express.Router()
const Stub = require('../models/Stub')
const db = require('../config/database')
const Stanje = require('../models/Stanje')

router.get('/stub', (req, res) => {
    if (id = req.query.id) {
        getSingleStub(id, req, res);
     } else {
        getAllStub(req,res);
     } 
})

const getAllStub = (req, res) => {
    Stub.findAll({
        include: Stanje
    })
        .then( stubovi => {
            res.send(stubovi)
        })
        .catch(err => console.log(err))
}

const getSingleStub = (id, req, res) => {
    Stub.findOne({
        where: {
            id: id
        },
        include: Stanje
    })
        .then (
            stub => {
                res.send(
                    {data: stub}
                )
            }
        )
        .catch(err => console.log(err))
}

router.get('/stub/id', (req, res) => {
    
})

// router.push('/stub', (req, res) => {

// })

module.exports = router