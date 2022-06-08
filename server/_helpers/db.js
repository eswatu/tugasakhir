const mysql = require('mysql2/promise');
const config = require('../config.json');
const { Sequelize, DataTypes } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() { 
    //create db kalau belum ada
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${database};`);

    //connect ke database
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    //init model dan tambah ke obyek db
    db.User          = require('../Users/user.model')(sequelize);
    db.Avatar        = require('../Users/avatar.model')(sequelize, DataTypes);
    //ini database permen
    db.Aktivitas     = require('../permen/aktivitas.model')(sequelize);
    db.SubUnsur      = require('../permen/subUnsur.model')(sequelize);
    db.Butir         = require('../permen/butir.model')(sequelize);
    //ini database untuk Kerja
    db.Act           = require('../Acts/act.model')(sequelize);
    db.ActFile       = require('../Acts/actFile.model')(sequelize, DataTypes);
    db.AssignLetter  = require('../Acts/assignLetter.model')(sequelize);
    db.AssignFile    = require('../Acts/assignFile.model')(sequelize, DataTypes);
    db.Submission    = require('../Submission/submission.model')(sequelize);
    //relasi khusus - mandatory
    db.Butir.belongsTo(db.SubUnsur, {foreignKey: "SubUnsurId"});
    db.Butir.belongsTo(db.Aktivitas, {foreignKey: "AktivitaId"});
    //relasi user dan avatar
    db.User.belongsTo(db.Avatar, {foreignKey: "AvatarId"});
    //relasi untuk Act
    db.Act.belongsTo(db.Butir, {foreignKey: "ButirId"});
    db.Act.belongsTo(db.User, {foreignKey: "UserId"});
    db.Act.belongsTo(db.AssignLetter, {foreignKey: "AssignLetterId"});
    db.Act.hasMany(db.ActFile, {foreignKey: "ActId"});
    //db.ActFile.belongsTo(db.Act, {foreignKey: "ActId"});
    //relasi AssignLetter
    db.AssignLetter.belongsTo(db.User, {foreignKey:"UserId"});
    db.AssignFile.belongsTo(db.AssignLetter, {foreignKey: "AssignLetterId"});
    //relasi submission
    db.Submission.belongsTo(db.User, {foreignKey: "UserId"});
    db.Submission.hasMany(db.Act, {foreignKey: 'SubId'});
    db.Submission.belongsToMany(db.AssignLetter, {through: 'SubAssign', timestamps: false });

    //sync model dengan database
    await sequelize.sync({alter: true});
}
