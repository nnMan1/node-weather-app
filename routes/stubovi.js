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

router.post('/stub', (req, res) => {
    let {  geo_duzina, geo_sirina, stanje_id } = req.body

    if (geo_duzina === undefined || geo_sirina === undefined || stanje_id === undefined) {
      res.sendStatus(400);
      return;
    }

    console.log(stanje_id)

    const point = {
        type: 'Point',
        coordinates: [geo_duzina, geo_sirina]
    }
   
    Stub.create({
        geometry: point,
        stanje_id: stanje_id
    })
        . then( state => res.redirect('/stub'))
        .catch( err => console.log(err))
    
})

module.exports = router