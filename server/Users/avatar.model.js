const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        type        : { type: DataTypes.STRING, allowNull: false },
        name        : { type: DataTypes.STRING, allowNull: false },
        data        : { type: DataTypes.BLOB("long"), allowNull: true }
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
    return sequelize.define('Avatar', attributes, options);
}