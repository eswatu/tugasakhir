const config = require('../config.json');

const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
};

async function getAll() {
    return await db.Butir.findAll();
}

async function getById(id) {
    return await getButir(id);
}

// helper functions

async function getButir(id) {
    const butir = await db.Butir.findByPk(id, {include: [db.SubUnsur, db.Aktivitas]});
    if (!butir) throw 'Butir Kegiatan tidak ditemukan';
    return butir;
}
