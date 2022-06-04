const config = require('../config.json');
const {Sequelize} = require('../models');
const db = require('../_helpers/db');
const paginate = require('../_helpers/pagination');


module.exports = {
    getAll,
    getById,
    getByDate,
    createAct,
    propose,
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
            UserId : params.userId,
            ButirId: params.butirId,
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
        UserId : params.userId,
        ButirId: params.butirId,
        butirVolume: params.butirVolume,
        actDate: params.actDate,
        actNote: params.actNote,
        AssignLetterId: params.AssignLetterId,
        actMain: params.actMain,
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
async function propose(id) {
    let act = await getActById(id);
    console.log('isi dari act ' + JSON.stringify(act));
    let result;
    if (act) {
        if (act.proposeDate) {
            act.proposeDate = null;
        } else {
            act.proposeDate = new Date();
            //ini ganti nanti ke user
            act.SubId = 1;
        }
        await act.save();
        result = 'sukses mengajukan';
    } else {
        result = 'gagal mengajukan';
    }
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
/*ini untuk cek yg status saja, pilihannya
 - proposeDate: untuk cek status sudah pengajuan
 - 
*/
// helper functions
async function getActById(id) {
    const act = await db.Act.findByPk(id, {
        include: [{all: true}]
    });
    if (!act) throw 'Aktivitas tidak ditemukan';
    return act;
}
async function getActByDate(ds,de) {
    const act = await db.Act.findAll({ where: { createdAt: q >= ds & q <= de}});
    if (!act) throw 'Aktivitas tidak ditemukan';
    return act;
}

