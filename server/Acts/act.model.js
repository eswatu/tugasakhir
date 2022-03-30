const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        userId      : { type: DataTypes.INTEGER, allowNull: false },
        date        : { type: DataTypes.DATE, allowNull: false },
        actId       : { type: DataTypes.INTEGER, allowNull: false },
        actVolume   : { type: DataTypes.INTEGER, allowNull: false },
        //besok tambahin file upload
    };
    const options = {
        defaultScope: {
            //exclude password hash
            attributes: { exclude: ['actFile'] }
        }, scopes: {
            //include hash dalam scope ini
            withActFile: { attributes: {}, }
        }
    };
    return sequelize.define('Act', attributes, options);
}