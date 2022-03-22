const mysql = require('mysql2/promise');
const config = require('../config.json');
const { Sequelize } = require('sequelize');

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
    db.User = require('../Users/user.model')(sequelize);

    //sync model dengan database
    await sequelize.sync();
}
