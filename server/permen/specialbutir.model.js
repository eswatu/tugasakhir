const { DataTypes } = require('sequelize');

module.exports = model;
//ini untuk menampung daftar special butir yang perhitungan menggunakan persentase
function model(sequelize) { 
    const attributes = {
        //catatan Khusus
        noteButir: { type: DataTypes.STRING, allowNull: false }
    };
    return sequelize.define("SpecialButir",attributes, {timestamps: false, freezeTableName: true});
}