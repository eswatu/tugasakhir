const {DataTypes} = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        type    : { type: DataTypes.STRING(30)},
        name    : { type: DataTypes.STRING(40)},
        data    : { type: DataTypes.BLOB("long")},
        notes   : {type: DataTypes.STRING(100), allowNull: true}
    };
    const options = {
        defaultScope: {
            attributes: { exclude: ["data"] }
            }, scopes: {
                //untuk expose data
                withData: {}
                }
        };
        
    return sequelize.define("AssignFile", attributes, options);
}
