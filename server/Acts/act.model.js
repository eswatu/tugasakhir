const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        butirVolume: { type: DataTypes.INTEGER, allowNull: false},
        actNote: {type: DataTypes.STRING, allowNull: true},
        //bawah ini untuk server
        actMain: {type: DataTypes.BOOLEAN, allowNull: false},
        isCalculated: { type: DataTypes.BOOLEAN, allowNull: false},
        proposeDate:{type: DataTypes.DATE, allowNull: true},
        calculatedDate: {type: DataTypes.DATE, allowNull: true},
        actDate: {type:DataTypes.DATE, allowNull: true}
        //besok tambahin file upload
    };
    return sequelize.define('Act', attributes);
}