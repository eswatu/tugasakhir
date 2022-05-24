module.exports = (sequelize, DataTypes) => {
    const AssignFile = sequelize.define("assignFile", {
        type    : { type: DataTypes.STRING},
        name    : { type: DataTypes.STRING},
        data    : { type: DataTypes.BLOB("long") },
        notes   : {type: DataTypes.STRING, allowNull: true}
    }, { defaultScope: {attributes: {exclude: ["data"]}}
    });
    return AssignFile;
}
