module.exports = (sequelize, DataTypes) => {
    const ActFile = sequelize.define("actFile", {
        type    : { type: DataTypes.STRING},
        name    : { type: DataTypes.STRING},
        data    : { type: DataTypes.BLOB("long") }
    });
    return ActFile;
}
