const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        //kode unsur
        kodeUnsur: { type: DataTypes.INTEGER, allowNull: false},
        //nama unsur
        namaUnsur: {type: DataTypes.STRING(150), allowNull: false},
        //name diisi butir kegiatan
        kodeSub: { type: DataTypes.CHAR(1), allowNull: false },
        //level untuk jenjang
        namaSubUnsur: { type: DataTypes.STRING(150), allowNull: false },
    };
    return sequelize.define('SubUnsur', attributes, {timestamps: false, freezeTableName: true});
}