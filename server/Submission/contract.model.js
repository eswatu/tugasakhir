const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        contractName: {type: DataTypes.STRING(40), allowNull: false},
        contractDate: {type: DataTypes.DATE, allowNull: false},
        contractYear: {type: DataTypes.SMALLINT.UNSIGNED, allowNull: false},
        contractValue: {type: DataTypes.TINYINT.UNSIGNED, allowNull: false},
        contractNote: {type: DataTypes.STRING(100), allowNull: true},
        isActive: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue:true}
    };
    return sequelize.define('Contract', attributes);
}
