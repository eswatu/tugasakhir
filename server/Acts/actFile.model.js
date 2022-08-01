const {DataTypes} = require('sequelize');

module.exports = model;
function model(sequelize) {
    const attributes = {
        type    : { type: DataTypes.STRING(30), allowNull: false},
        name    : { type: DataTypes.STRING(120), allowNull: false},
        data    : { type: DataTypes.BLOB("long"), allowNull: false},
        notes   : { type: DataTypes.STRING(150), allowNull: true}
    };
    const options = {
        defaultScope: {
        attributes: { exclude: ["data"] }
        }, scopes: {
            //untuk expose data
            withData: {}
        },
    };
    
    return sequelize.define("ActFile", attributes, options);
}
