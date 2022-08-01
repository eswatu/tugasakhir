const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        //name diisi butir kegiatan
        kodeAkt: { type: DataTypes.CHAR(5), allowNull: false },
        //level untuk jenjang
        namaAkt: { type: DataTypes.STRING(250), allowNull: false },
    };
    return sequelize.define('Aktivitas', attributes, {timestamps: false});
}