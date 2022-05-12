module.exports = (sequelize, DataTypes) => {
    const Avatar = sequelize.define("avatar", {
        type    : { type: DataTypes.STRING},
        name    : { type: DataTypes.STRING},
        data    : { type: DataTypes.BLOB("long") }
    });
    return Avatar;
}
