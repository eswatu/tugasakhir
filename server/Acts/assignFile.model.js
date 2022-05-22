module.exports = (sequelize, DataTypes) => {
    const AssignFile = sequelize.define("assignFile", {
        type    : { type: DataTypes.STRING},
        name    : { type: DataTypes.STRING},
        data    : { type: DataTypes.BLOB("long") }
    });
    return AssignFile;
}
