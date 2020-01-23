const express = require('express');
const router = express.Router();
const db = require('../config/database');
const TipVoda = require('../models/TipVoda');

router.get('/tip_voda', (req, res) => {
    if (id = req.query.id) {
       getSingleTipVoda(id, req, res);
    } else {
       getAllTipVoda(req,res);
    }
});

const getSingleTipVoda = (id, req, res) => {
    console.log(id);
    TipVoda.findOne({
        where: {
            id: id
        }
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

const getAllTipVoda = (req, res) => {
    TipVoda.findAll()
    .then( tipVoda => {
        res.send(
            {data: tipVoda}
        )
    })
}

router.post('/tip_voda', (req, res) => {
    let { naziv } = req.body
    console.log(req.body)
    console.log(naziv)
    if (naziv === undefined) {
      res.sendStatus(400);
      return;
    }

    TipVoda.create({
        naziv: naziv
    })
        . then( state => res.redirect('/tip_voda'))
        .catch( err => console.log(err))
})


module.exports = router