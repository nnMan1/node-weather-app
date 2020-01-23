const Sequelize = require('sequelize');
const db = require('../config/database');

const TipVoda = db.define('vod_tip', {
    id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    naziv: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false,
    underscored: true
})

 module.exports = TipVoda