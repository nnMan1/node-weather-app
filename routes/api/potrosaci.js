const express = require('express')
const router = express.Router()
const Potrosac = require('../../models/Potrosac')
const db = require('../../config/database')
const Stanje = require('../../models/Stanje')
const Sequelize = require('sequelize');
const Op = Sequelize.Op


router.get('/api/potrosac', (req, res) => {
    let where = { [Op.and]: [] };
    let attributes = Object.keys(Potrosac.rawAttributes);
    let order = []
    let {  coordinates, rastojanje, id, vodovi } = req.query

    console.log(coordinates)

    if (coordinates && coordinates.length === 2 && rastojanje) {     
        var location = Sequelize.literal(`ST_GeomFromText('POINT(${coordinates[0]} ${coordinates[1]})', 4326)`) ;
        var distance = Sequelize.fn('ST_DistanceSphere',Sequelize.literal('"potrosac"."geometry"'), location); 
        attributes.push([distance, 'distance']);
        whereTmp = Sequelize.where(distance,  {[Op.lt]: rastojanje})
        where[Op.and].push(whereTmp)
    }  
    
    if (id) { where.id = id }

    Potrosac.findAll({
        attributes: attributes,
        include: Stanje,
        where: where
        })
        .then( potrosaci => {
            res.send(potrosaci)
        })
        .catch(err => console.log(err))
})

router.post('/api/potrosac', (req, res) => {
    let {  coordinates, stanje_id, ime, potrosnja } = req.body
    console.log(req.body)
    if (coordinates && coordinates.length === 2) {} else {res.sendStatus(400); return}
    
    if (  stanje_id === undefined || ime === undefined) {
      res.sendStatus(400);
      return;
    }

    const point = {
        type: 'Point',
        coordinates: coordinates
    }
   
    Potrosac.create({
        geometry: point,
        stanje_id: stanje_id,
        ime: ime,
        potrosnja: potrosnja
    })
        . then( potrosac => res.send(potrosac))
        .catch( err => console.log(err))
    
})

module.exports = router