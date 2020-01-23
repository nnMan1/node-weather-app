const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Vod = require('../models/Vod');
const Stanje = require('../models/Stanje');
const TipVoda = require('../models/TipVoda');

router.get('/vod', (req, res) => {
    if (id = req.query.id) {
       getSingleVod(id, req, res);
    } else {
       getAllVod(req,res);
    }
});

const getSingleVod = (id, req, res) => {
    Vod.findOne({
        where: {
            id: id
        },
        include: [TipVoda,Stanje]
    })
        .then (
            tipVoda => {
                res.send(
                    {data: tipVoda}
                )
            }
        )
        .catch(err => console.log(err))
}

const getAllVod = (req, res) => {
    Vod.findAll({
        include: [TipVoda,Stanje]
    })
    .then( vodovi => {
        res.send(
            {data: vodovi}
        )
    })
}

router.post('/vod', (req, res) => {
    let { tacke, otpor, napon, vod_tip_id, stanje_id } = req.body
    console.log(req.body)
    if (tacke === undefined || vod_tip_id === undefined || stanje_id === undefined || napon === undefined || otpor === undefined) {
      res.sendStatus(400);
      return;
    }

    const line = { 
                    type: 'LineString', 
                    'coordinates': tacke };

    Vod.create({
        geometry: line,
        vod_tip_id: vod_tip_id,
        stanje_id: stanje_id,
        napon: napon,
        otpor: otpor
    })
        . then( vod => res.redirect('/vod'))
        .catch( err => console.log(err))
})


module.exports = router