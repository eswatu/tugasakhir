const config = require('../config.json');
const {Sequelize} = require('../models');
const db = require('../_helpers/db');
const paginate = require('../_helpers/pagination');


module.exports = {
    getAll,
    getById,
    getByDate,
    createAct,
    updateAct,
    deleteAct: _delete
};


async function getAll(req) {
    var pageIndex = req.pageIndex;
    var pageSize = req.pageSize;
    var sortColumn = req.sortColumn;
    var sortOrder = req.sortOrder;
    var filterColumn = req.filterColumn;
    var filterQuery = req.filterQuery;
    var model = db.Act;
    return await paginate(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
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
            userId : params.userId,
            butirId: params.butirId,
            butirVolume: params.butirVolume,
            actDate: params.actDate,
        }
    })) {
        throw 'Act itu "' + params.id + '" sudah terdaftar';
    }
    let result;
    // save Act
    await db.Act.create({
        //required
        userId : params.userId,
        butirId: params.butirId,
        butirVolume: params.butirVolume,
        actDate: params.actDate,
        actNote: params.actNote,
        //auto
        isCalculated: false,
        calculatedDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(us => {
        result = us; 
        console.log("act " + us + "berhasil dibuat");
    });
    return result;
}

async function updateAct(id, params) {
    const act = await getActById(id);
    params.updatedAt = new Date();
    // copy params to user and save
    Object.assign(act, params);
    await act.save();
    return act;
}

async function _delete(id) {
    const act = await getActById(id);
    await act.destroy();
}

// helper functions
async function getActById(id) {
    const act = await db.Act.findByPk(id, {
        include: [db.User, db.Butir]
    });
    if (!act) throw 'Aktivitas tidak ditemukan';
    return act;
}
async function getActByDate(ds,de) {
    const act = await db.Act.findAll({ where: { createdAt: q >= ds & q <= de}});
    if (!act) throw 'Aktivitas tidak ditemukan';
    return act;
}

