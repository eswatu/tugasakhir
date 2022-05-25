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
    
    //relasi khusus - mandatory
    db.Butir.belongsTo(db.SubUnsur);
    db.Butir.belongsTo(db.Aktivitas);
    db.SubUnsur.hasMany(db.Butir);
    db.Aktivitas.hasMany(db.Butir);

    //relasi user dan avatar
    db.User.belongsTo(db.Avatar, {foreignKey: "AvatarId", as :"avatar"});
    //relasi untuk Act
    db.Act.belongsTo(db.Butir, {foreignKey: "ButirId", as: "butir"});
    db.Act.belongsTo(db.User, {foreignKey: "UserId", as: "user"});
    db.Act.belongsTo(db.AssignLetter, {foreignKey: "AssignLetterId", as: "assignLetter"});
    db.Act.belongsTo(db.ActFile, {foreignKey: "ActFileId", as: "actfile"});
    db.User.hasMany(db.Act);
    db.Butir.hasMany(db.Act);
    //relasi AssignLetter
    db.AssignLetter.belongsTo(db.User, {foreignKey:"CreatorId", as: "user"});
    db.AssignLetter.hasMany(db.Act);
    db.AssignFile.belongsTo(db.AssignLetter, {foreignKey: "AssignLetterId", as: "assignLetter"});
    //sync model dengan database
    await sequelize.sync({alter: true});
}
