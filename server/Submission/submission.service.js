const db = require('../_helpers/db');
const paginate = require('../_helpers/pagination');

module.exports = {
    getAll,
    getById,
    getByDate,
    createSubmission,
    updateSubmission,
    deleteAct: _delete
};


async function getAll(req) {
    var pageIndex = req.pageIndex;
    var pageSize = req.pageSize;
    var sortColumn = req.sortColumn;
    var sortOrder = req.sortOrder;
    var filterColumn = req.filterColumn;
    var filterQuery = req.filterQuery;
    var model = db.Submission;
    return await paginate(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
}

async function getById(id) {
    return await getActById(id);
}

async function getByDate(ds, de) { 
    return await getSubmissionByDate(ds, de);
}

async function createSubmission(params) {
    // validate
    let result;
    if (await db.Submission.findOne({
        where: {isActive : true}
    })) {
        throw 'Sudah ada Pengajuan Aktif';
    }
    // save Act
    await db.Submission.create({
        //required
        subName : params.subName,
        subDate: params.subDate,
        dateApproved: params.dateApproved ?? null,
        subScore: params.subScore ?? 0,
        subNote: params.subNote
    }).then(us => {
        result = us; 
        console.log("Pengajuan " + us + "berhasil dibuat");
    });
    return result;
}

async function updateSubmission(id, params) {
    const sub = await getSubmissionById(id);
    // copy params to user and save
    Object.assign(sub, params);
    await sub.save();
    return sub;
}

async function _delete(id) {
    const sub = await getSubmissionById(id);
    await sub.destroy();
}

// helper functions
async function getSubmissionById(id) {
    const sub = await db.Submission.findByPk(id, {
        include: [{all: true}]
    });
    if (!sub) throw 'Pengajuan tidak ditemukan';
    return sub;
}
async function getSubmissionByDate(ds,de) {
    const sub = await db.Submission.findAll({ where: { createdAt: q >= ds & q <= de}});
    if (!sub) throw 'Pengajuan tidak ditemukan';
    return sub;
}

