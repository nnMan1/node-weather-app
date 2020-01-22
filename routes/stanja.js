const express = require('express');
const router = express.Router();
const db = require('../config/database');
const State = require('../models/Stanje');

router.get('/stanje', (req, res) => {
    if (id = req.query.id) {
        console.log(id);
        State.findOne({
            where: {
                id: id
            }
        })
            .then (
                state => {
                    res.send(
                        {data: state}
                    )
                }
            )
            .catch(err => console.log(err))
    } else {
        State.findAll()
            .then( states => {
                console.log(states)
                res.send(
                {data: states}
                )
                res.sendStatus(200)
            })
        }
    });


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