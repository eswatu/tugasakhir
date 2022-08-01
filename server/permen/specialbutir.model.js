const { DataTypes } = require('sequelize');

module.exports = model;
//ini untuk menampung daftar special butir yang perhitungan menggunakan persentase
function model(sequelize) { 
    const attributes = {
        //catatan Khusus
        noteButir: { type: DataTypes.STRING(100), allowNull: false }
    };
    return sequelize.define("SpecialButir",attributes, {timestamps: false, freezeTableName: true});
}