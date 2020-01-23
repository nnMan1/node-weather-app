const Sequelize = require('sequelize');
const db = require('../config/database');
const Stanje = require('./Stanje');

const Trafostanica = db.define('trafostanica', {
    id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    geometry: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false
    },
    naziv: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    opis: {
        type: Sequelize.TEXT,
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

Trafostanica.belongsTo(Stanje)

module.exports = Trafostanica