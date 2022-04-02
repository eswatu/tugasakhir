const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        //name diisi butir kegiatan
        kodeSub: { type: DataTypes.CHAR, allowNull: false },
        //level untuk jenjang
        namaSubUnsur: { type: DataTypes.STRING, allowNull: false },
    };
    return sequelize.define('SubUnsur', attributes, {timestamps: false, freezeTableName: true});
}