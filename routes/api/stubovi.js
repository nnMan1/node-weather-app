const express = require('express')
const router = express.Router()
const Stub = require('../../models/Stub')
const db = require('../../config/database')
const Stanje = require('../../models/Stanje')
const Sequelize = require('sequelize');
const Op = Sequelize.Op


router.get('/api/stub', (req, res) => {
    let where = { [Op.and]: [] };
    let attributes = Object.keys(Stub.rawAttributes);
    let order = []
    let {  geo_duzina, geo_sirina, rastojanje, id } = req.query
    if (geo_duzina && geo_sirina && rastojanje) {     
        var location = Sequelize.literal(`ST_GeomFromText('POINT(${geo_duzina} ${geo_sirina})', 4326)`) ;
        var distance = Sequelize.fn('ST_DistanceSphere',Sequelize.literal('"stub"."geometry"'), location); 
        attributes.push([distance, 'distance']);
        // others.push('distance');
        whereTmp = Sequelize.where(distance,  {[Op.lt]: rastojanje})
        where[Op.and].push(whereTmp)
    }  
    
    console.log(where)
    
    if (id) { where.id = id }

    Stub.findAll({
        attributes: attributes,
        include: Stanje,
        where: where
    })
        .then( stubovi => {
            res.send(stubovi)
        })
        .catch(err => console.log(err))
})


router.post('/api/stub', (req, res) => {
    let {  geo_duzina, geo_sirina, stanje_id } = req.body

    console.log(req.body)

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
        . then( stub => res.send(stub))
        .catch( err => console.log(err))
    
})

router.delete('/api/stub', (req, res) => {
    let {id} = req.body;
    if (id === undefined) {
        res.sendStatus(400);
        return;
    }
    console.log(id)
    Stub.destroy({
        where: {
            id: id
        }
    })
    .then ( res.send(200))
    .catch( err => console.log(err))
})

module.exports = router