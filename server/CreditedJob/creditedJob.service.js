const config = require('../config.json');
const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    createCreditedJob,
    updateCreditedJob,
    deleteCreditedJob: _delete
};


async function getAll() {
    return await db.CreditedJob.findAll();
}

async function getById(id) {
    return await getById(id);
}

async function createCreditedJob(params) {
    // validate
    if (await db.CreditedJob.findOne({
        where: {
            name: params.name,
            level: params.level,
            creditValue: params.creditValue
        }
    })) {
        throw 'Poin Kredit itu "' + params.id + '" sudah terdaftar';
    }
   
    // save CreditedJob
    await db.CreditedJob.create(params);
}

async function updateCreditedJob(id, params) {
    const cj = await getById(id);

    // copy params to user and save
    Object.assign(cj, params);
    await cj.save();

    return cj.get();
}

async function _delete(id) {
    const cj = await getById(id);
    await cj.destroy();
}

// helper functions
async function getById(id) {
    const cj = await db.CreditedJob.findByPk(id);
    if (!cj) throw 'Poin Kegiatan tidak ditemukan';
    return cj;
}
