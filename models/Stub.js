const Sequelize = require('sequelize');
const db = require('../config/database');
const Stanje = require('./Stanje');

const Stub = db.define('stub', {
    id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    geometry: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    underscored: true
});

Stub.belongsTo(Stanje, {targetKey: 'id'});

module.exports = Stub