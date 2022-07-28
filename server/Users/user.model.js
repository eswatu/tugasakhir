const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        name        : { type: DataTypes.STRING(60), allowNull: false },
        username    : { type: DataTypes.STRING(20), allowNull: false },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        role        : { type: DataTypes.STRING, allowNull: false },
        level       : { type: DataTypes.STRING, allowNull: false },
        baseAngkre  : { type: DataTypes.INTEGER, allowNull: false }
    };
    const options = {
        defaultScope: {
            //exclude password hash
            attributes: { exclude: ['passwordHash'] }
        }, scopes: {
            //include hash dalam scope ini
            withPasswordHash: { attributes: {}, }
        },
    };
    return sequelize.define('User', attributes, options);
}