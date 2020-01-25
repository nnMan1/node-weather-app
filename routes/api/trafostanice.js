const express = require('express')
const router = express.Router()
const Trafostanica = require('../../models/Trafostanica')
const db = require('../../config/database')
const Stanje = require('../../models/Stanje')
const Sequelize = require('sequelize');
const Op = Sequelize.Op


router.get('/api/trafostanica', (req, res) => {
    let where = { [Op.and]: [] };
    let attributes = Object.keys(Trafostanica.rawAttributes);
    let order = []
    let {  coordinates, rastojanje, id, vodovi } = req.query

    console.log(coordinates)

    if (coordinates && coordinates.length === 2 && rastojanje) {     
        var location = Sequelize.literal(`ST_GeomFromText('POINT(${coordinates[0]} ${coordinates[1]})', 4326)`) ;
        var distance = Sequelize.fn('ST_DistanceSphere',Sequelize.literal('"trafostanica"."geometry"'), location); 
        attributes.push([distance, 'distance']);
        // others.push('distance');
        whereTmp = Sequelize.where(distance,  {[Op.lt]: rastojanje})
        where[Op.and].push(whereTmp)
    }  
    
    if (vodovi) {
        var isConnected = Sequelize.literal(`exists(select vod.id from vod where ST_Intersects("trafostanica"."geometry", "vod"."geometry") and vod.id in (${vodovi}))`)
        where[Op.and].push(isConnected)
    }
    
    if (id) { where.id = id }

    Trafostanica.findAll({
        attributes: attributes,
        include: Stanje,
        where: where
    })
        .then( trafostanice => {
            res.send(trafostanice)
        })
        .catch(err => console.log(err))
})


router.post('/api/trafostanica', (req, res) => {
    let {  coordinates, stanje_id, naziv, opis } = req.body
    if (coordinates && coordinates.length === 2) {} else {res.sendStatus(400); return}
    
    if (  stanje_id === undefined || naziv === undefined) {
      res.sendStatus(400);
      return;
    }

    const point = {
        type: 'Point',
        coordinates: coordinates
    }
   
    Trafostanica.create({
        geometry: point,
        stanje_id: stanje_id,
        naziv: naziv,
        opis: opis
    })
        . then( trafostanica => res.send(trafostanica))
        .catch( err => console.log(err))
    
})

router.trafostanica
module.exports = router