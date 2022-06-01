const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        //kode unsur
        kodeUnsur: { type: DataTypes.INTEGER, allowNull: false},
        //nama unsur
        namaUnsur: {type: DataTypes.STRING, allowNull: false},
        //name diisi butir kegiatan
        kodeSub: { type: DataTypes.CHAR, allowNull: false },
        //level untuk jenjang
        namaSubUnsur: { type: DataTypes.STRING, allowNull: false },
    };
    return sequelize.define('SubUnsur', attributes, {timestamps: false, freezeTableName: true});
}