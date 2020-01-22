const express = require('express');
const router = express.Router();
const db = require('../config/database');
const State = require('../models/Stanje');

router.get('/stanje', (req, res) => 
    State.findAll()
        .then( states => {
            console.log(states)
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
);

router.post('/stanje', (req, res) => {
    let { naziv } = req.body
    console.log(req.body)
    console.log(naziv)
    if (naziv === undefined) {
      res.sendStatus(400);
      return;
    }

    State.create({
        naziv: naziv
    })
        . then( state => res.redirect('/stanje'))
        .catch( err => console.log(err))
    
})


module.exports = router