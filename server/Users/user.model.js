const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        name        : { type: DataTypes.STRING, allowNull: false },
        username    : { type: DataTypes.STRING, allowNull: false },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        role        : { type: DataTypes.STRING, allowNull: false },
        level       : { type: DataTypes.STRING, allowNull: false }
    };
    const options = {
        defaultScope: {
            //exclude password hash
            attributes: { exclude: ['passwordHash'] }
        }, scopes: {
            //include hash dalam scope ini
            withPasswordHash: { attributes: {}, }
        }
    };
    return sequelize.define('User', attributes, options);
}