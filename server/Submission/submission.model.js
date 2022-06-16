const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        subName: {type: DataTypes.STRING, allowNull: false},
        subDate: {type: DataTypes.DATE, allowNull: true},
        dateApproved: {type: DataTypes.DATE, allowNull: true},
        //untuk nilai yang diajukan, dihitung oleh jumlah ACT
        subScore: {type: DataTypes.FLOAT, allowNull: true},
        subNote: {type: DataTypes.STRING, allowNull: true},
        isActive: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
        isSubmitted: {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false},
    };
    return sequelize.define('Submission', attributes);
}
