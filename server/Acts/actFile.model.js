module.exports = (sequelize, DataTypes) => {
    const ActFile = sequelize.define("actFile", {
        type    : { type: DataTypes.STRING},
        name    : { type: DataTypes.STRING},
        data    : { type: DataTypes.BLOB("long") },
        notes   : { type: DataTypes.STRING, allowNull: true}
    }, {timestaps: false});
    return ActFile;
}
