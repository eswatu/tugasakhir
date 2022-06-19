const {DataTypes} = require('sequelize');

module.exports = model;
function model(sequelize) {
    const attributes = {
        type    : { type: DataTypes.STRING},
        name    : { type: DataTypes.STRING},
        data    : { type: DataTypes.BLOB("long") },
        notes   : { type: DataTypes.STRING, allowNull: true}
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
