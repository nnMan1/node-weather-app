const Sequelize = require('sequelize');
const db = require('../config/database');
const Stanje = require('./Stanje');

const Potrosac = db.define('potrosac', {
    id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    geometry: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false
    },
    ime: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    potrosnja:{
        type: Sequelize.FLOAT,
        allowNull: true
    },
    stanje_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'stanje',
            key: 'id'
        }
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    underscored: true
});

Potrosac.belongsTo(Stanje)

module.exports = Potrosac