const db = require('../_helpers/db');
const subService = require('../Submission/submission.service');
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

async function getAll(rq) {
    const req = rq.query;
    const role = rq.headers.userrole;
    const uid = parseInt(rq.headers.userId);

    var pageIndex = req.pageIndex;
    var pageSize = req.pageSize;
    var sortColumn = req.sortColumn;
    var sortOrder = req.sortOrder;
    var filterColumn = req.filterColumn;
    var filterQuery = req.filterQuery;
    var model = db.Act;
    if (role === "Admin") {
        return await paginate(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
    } else if (role === "User") {
        return await paginate(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery, uid);
    }
}

async function getById(id) {
    return await getActById(id);
}
async function getByDate(ds, de) { 
    return await getActByDate(ds, de);
}

async function createAct(req) {
    const params = req.body;
    const uid = parseInt(req.headers.userid);
    // validate
    if (await db.Act.findOne({
        where: {
            UserId : uid,
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
        UserId : uid,
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
    let sub = await subService.getSubByUserId(act.UserId);
    let result;
    if (act && sub) {
        if (act.proposeDate) {
            act.proposeDate = null;
            act.isProposed = false;
        } else {
            act.proposeDate = new Date();
            act.isProposed = true;
            //ini ganti nanti ke user
            act.SubId = sub.UserId;
        }
        await act.save();
        result = 'sukses mengajukan';
    } else {
        result = 'gagal mengajukan. tidak ada pengajuan';
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

