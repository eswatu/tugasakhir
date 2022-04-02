const { DataTypes } = require('sequelize');

exports = model;

function model(sequelize) { 
    const attributes = {
        //name diisi butir kegiatan
        name: { type: DataTypes.STRING, allowNull: false },
        //level untuk jenjang
        level: { type: DataTypes.INTEGER, allowNull: false },
        //credit value untuk nilai 
        creditValue : { type: DataTypes.FLOAT, allowNull: false },
        //proof untuk hasil kerja
        proof: { type: DataTypes.STRING, allowNull: false }
    };
    return sequelize.define('CreditedJob',attributes);
}
/*level
terampil                  = 1
mahir                     = 2
terampil + mahir          = 3
penyelia                  = 4
penyelia + mahir          = 6
terampil, mahir, penyelia = 7
 */