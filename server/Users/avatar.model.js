module.exports = (sequelize, DataTypes) => {
    const Avatar = sequelize.define("avatar", {
        type    : { type: DataTypes.STRING(20)},
        name    : { type: DataTypes.STRING(100)},
        data    : { type: DataTypes.BLOB("long") }
    });
    return Avatar;
}
