const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        contractName: {type: DataTypes.STRING, allowNull: false},
        contractDate: {type: DataTypes.DATE, allowNull: false},
        contractYear: {type: DataTypes.SMALLINT, allowNull: false},
        contractValue: {type: DataTypes.TINYINT, allowNull: false},
        isActive: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue:true}
    };
    return sequelize.define('Contract', attributes);
}
