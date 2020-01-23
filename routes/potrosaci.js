const express = require('express')
const router = express.Router()
const Potrosac = require('../models/Potrosac')
const db = require('../config/database')
const Stanje = require('../models/Stanje')


router.get('/potrosac', (req, res) => {
    if (id = req.query.id) {
        getSinglePotrosac(id, req, res);
     } else {
        getAllPotrosac(req,res);
     } 
})

const getAllPotrosac = (req, res) => {
    Potrosac.findAll({
        include: Stanje
    })
        .then( potrosaci => {
            res.send(potrosaci)
        })
        .catch(err => console.log(err))
}

const getSinglePotrosac = (id, req, res) => {
    Potrosac.findOne({
        where: {
            id: id
        },
        include: Stanje
    })
        .then (
            potrosac => {
                res.send(
                    {data: potrosac}
                )
            }
        )
        .catch(err => console.log(err))
}


router.post('/potrosac', (req, res) => {
    let {  geo_duzina, geo_sirina, stanje_id, ime, potrosnja } = req.body

    console.log(req.body);

    if (geo_duzina === undefined || geo_sirina === undefined || stanje_id === undefined || ime === undefined) {
      res.sendStatus(400);
      return;
    }

    const point = {
        type: 'Point',
        coordinates: [geo_duzina, geo_sirina]
    }
   
    Potrosac.create({
        geometry: point,
        stanje_id: stanje_id,
        ime: ime,
        potrosnja: potrosnja
    })
        . then( state => res.redirect('/potrosac'))
        .catch( err => console.log(err))
    
})

module.exports = router