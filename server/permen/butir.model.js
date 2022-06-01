const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        //name diisi butir kegiatan
        namaButir: { type: DataTypes.STRING, allowNull: false },
        //tkButir diisi sub
        tkButir: { type: DataTypes.STRING, allowNull: false },
        //hasil diisi jenis Laporan
        hasilKerja: { type: DataTypes.STRING, allowNull: false },
        //jmlPoin diisi angkre
        jmlPoin: { type: DataTypes.STRING, allowNull: false },
        //levelReq diisi prsiayat jenjang
        levelReq: {type: DataTypes.INTEGER, allowNull: false}
    };
    return sequelize.define('Butir',attributes, {timestamps: false, freezeTableName: true});
}