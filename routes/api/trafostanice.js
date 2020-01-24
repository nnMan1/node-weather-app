const express = require('express')
const router = express.Router()
const Trafostanica = require('../../models/Trafostanica')
const db = require('../../config/database')
const Stanje = require('../../models/Stanje')


router.get('/trafostanica', (req, res) => {
    if (id = req.query.id) {
        getSingleTrafostanica(id, req, res);
     } else {
        getAllTrafostanica(req,res);
     } 
})

const getAllTrafostanica = (req, res) => {
    Trafostanica.findAll({
        include: Stanje
    })
        .then( trafostanice => {
            res.send(trafostanice)
        })
        .catch(err => console.log(err))
}

const getSingleTrafostanica = (id, req, res) => {
    Trafostanica.findOne({
        where: {
            id: id
        },
        include: Stanje
    })
        .then (
            trafostanica => {
                res.send(
                    {data: trafostanica}
                )
            }
        )
        .catch(err => console.log(err))
}


router.post('/trafostanica', (req, res) => {
    let {  geo_duzina, geo_sirina, stanje_id, naziv, opis } = req.body

    if (geo_duzina === undefined || geo_sirina === undefined || stanje_id === undefined || naziv === undefined) {
      res.sendStatus(400);
      return;
    }

    const point = {
        type: 'Point',
        coordinates: [geo_duzina, geo_sirina]
    }
   
    Trafostanica.create({
        geometry: point,
        stanje_id: stanje_id,
        naziv: naziv,
        opis: opis
    })
        . then( state => res.redirect('/trafostanica'))
        .catch( err => console.log(err))
    
})

module.exports = router