const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        //nomor/nama surat
        ltNumber: { type: DataTypes.STRING(40), allowNull: false },
        //tanggal surat
        ltDate: { type: DataTypes.DATE, allowNull: false },
        //tanggal mulai - default sama dengan tgl surat 
        ltDateStart : { type: DataTypes.DATE, allowNull: false },
        //tanggal selesai
        ltDateEnd: { type: DataTypes.DATE, allowNull: false },
        //sambungkan ke file
        ltNote: {type: DataTypes.STRING(100), allowNull: true},
        //set aktif
        ltActive: {type: DataTypes.BOOLEAN, allowNull: false}
    };
    return sequelize.define('AssignmentLetter',attributes);
}