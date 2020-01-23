const Sequelize = require('sequelize');
const db = require('../config/database');
const Stanje = require('./Stanje');
const TipVoda = require('./TipVoda')

const Vod = db.define('vod', {
    id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    geometry: {
        type: Sequelize.GEOMETRY('LINESTRING'),
        allowNull: false
    },
    stanje_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'stanje',
            key: 'id'
        }
    },
    vod_tip_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'vod_tip',
            key: 'id'
        }
    },
    napon: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    otpor: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    underscored: true
});

Vod.belongsTo(Stanje)
Vod.belongsTo(TipVoda)

module.exports = Vod