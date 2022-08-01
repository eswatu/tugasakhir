const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        butirVolume: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false},
        actNote: {type: DataTypes.STRING(150), allowNull: true},
        //bawah ini untuk server
        actMain: {type: DataTypes.BOOLEAN, allowNull: false},
        isProposed: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
        proposeDate:{type: DataTypes.DATE, allowNull: true},
        isCalculated: { type: DataTypes.BOOLEAN, allowNull: false},
        calculatedDate: {type: DataTypes.DATE, allowNull: true},
        actDate: {type: DataTypes.DATE, allowNull: true}
        //besok tambahin file upload
    };
    return sequelize.define('Act', attributes);
}