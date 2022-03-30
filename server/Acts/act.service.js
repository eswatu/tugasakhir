const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');


module.exports = {
    getAll,
    getById,
    getByDate,
    createAct,
    updateAct,
    deleteAct: _delete
};


async function getAll() {
    return await db.Act.findAll();
}

async function getById(id) {
    return await getActById(id);
}
async function getByDate(ds, de) { 
    return await getActByDate(ds, de);
}

async function createAct(params) {
    // validate
    if (await db.Act.findOne({
        where: {
            actId: params.actId,
            date: params.date,
            actVolume: params.actVolume
        }
    })) {
        throw 'Act itu "' + params.id + '" sudah terdaftar';
    }
   
    // save Act
    await db.Act.create(params);
}

async function updateAct(id, params) {
    const act = await getActById(id);

    // copy params to user and save
    Object.assign(act, params);
    await act.save();

    return omitHash(act.get())
}

async function _delete(id) {
    const act = await getActById(id);
    await act.destroy();
}

// helper functions

async function getActById(id) {
    const act = await db.Act.findByPk(id);
    if (!act) throw 'Aktivitas tidak ditemukan';
    return act;
}
async function getActByDate(ds,de) {
    const act = await db.Act.findAll({ where: { date: q >= ds & q <= de}});
    if (!act) throw 'Aktivitas tidak ditemukan';
    return act;
}

function omitHash(act) { 
    const { hash, ...userWithoutHash } = act;
    return userWithoutHash;
}