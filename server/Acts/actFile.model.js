const {DataTypes} = require('sequelize');

module.exports = model;
function model(sequelize) {
    const attributes = {
        type    : { type: DataTypes.STRING(20)},
        name    : { type: DataTypes.STRING(60)},
        data    : { type: DataTypes.BLOB("long") },
        notes   : { type: DataTypes.STRING(100), allowNull: true}
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
