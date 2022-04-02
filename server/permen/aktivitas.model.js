const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        //name diisi butir kegiatan
        kodeAkt: { type: DataTypes.CHAR, allowNull: false },
        //level untuk jenjang
        namaAkt: { type: DataTypes.STRING, allowNull: false },
    };
    return sequelize.define('Aktivitas', attributes, {timestamps: false});
}