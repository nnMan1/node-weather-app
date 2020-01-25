const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Vod = require('../../models/Vod');
const Stanje = require('../../models/Stanje');
const TipVoda = require('../../models/TipVoda');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

router.get('/api/vod', (req, res) => {
    let where = { [Op.and]: [] };
    let attributes = Object.keys(Vod.rawAttributes);

    let { id } = req.query

    if (id) { where.id = id } 

    Vod.findAll({
        where: where,
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
    
});

router.post('/api/vod', (req, res) => {
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

router.get('/api/vod/connected', (req, res) => {
    let where = { [Op.and]: [] };
    let attributes = Object.keys(Vod.rawAttributes);

    let {  coordinates } = req.query

    ret = db.query(`WITH RECURSIVE t(id, mreza) AS (
                            VALUES (0, ST_GeomFromText('POINT(:geo_sirina :geo_duzina)', 4326))
                            UNION
                                SELECT vod.id,geometry FROM vod, t WHERE ST_DistanceSphere(mreza, geometry) < 0.5)
                            SELECT id FROM t;`, { replacements: {geo_sirina: parseFloat(coordinates[0]), geo_duzina: parseFloat(coordinates[1])},
                                                    type: Sequelize.QueryTypes.SELECT})
                                                    .then( data => res.send(data))
                                                    .catch(err => res.status(400))

})


module.exports = router