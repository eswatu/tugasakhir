const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        subName: {type: DataTypes.STRING, allowNull: false},
        subDate: {type: DataTypes.DATE, allowNull: true},
        dateApproved: {type: DataTypes.DATE, allowNull: true},
        subScore: {type: DataTypes.INTEGER, allowNull: true},
        subNote: {type: DataTypes.STRING, allowNull: true},
        isActive: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true}
    };
    return sequelize.define('Submission', attributes);
}