const db = require('../_helpers/db');
const pagination = require('../_helpers/pagination');

module.exports = {
    getAll,
    getById,
    getSubByUserId,
    getByDate,
    createSubmission,
    updateSubmission,
    deleteAct: _delete,
    getActiveSubmission
};


async function getAll(q) {
    const req = q.query;
    const role = q.headers.userrole;
    let  uid = parseInt(q.headers.userid);

    var pageIndex = req.pageIndex;
    var pageSize = req.pageSize;
    var sortColumn = req.sortColumn;
    var sortOrder = req.sortOrder;
    var filterColumn = req.filterColumn;
    var filterQuery = req.filterQuery;
    var model = db.Submission;
    
    if (role === "Admin") {
        return await pagination.paging(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
    } else {
        return await pagination.paginate(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery, uid);
    }
}

async function getById(id) {
    return await getSubmissionById(id);
}
async function getSubByUserId(id) {
    const sub = await db.Submission.findOne({
        where: {
            UserId: id
        }
    });
    return sub ?? null;
}
async function getByDate(ds, de) { 
    return await getSubmissionByDate(ds, de);
}

async function createSubmission(req) {
    const params = req.body;
    const uid = req.headers.userid;
    // validate
    let result;
    if (await db.Submission.findOne({
        where: {isActive : true,
            UserId: uid
        }
    })) {
        result = 'Sudah ada pengajuan aktif';
    } else {
    // save Act
    await db.Submission.create({
        //required
        subName : params.subName,
        subDate: params.subDate,
        dateApproved: params.dateApproved ?? null,
        subScore: params.subScore ?? 0,
        subNote: params.subNote,
        UserId: uid
    }).then(us => {
        result = 'Berhasil membuat Pengajuan'; 
        console.log("Pengajuan " + us + "berhasil dibuat");
    });
    }
    return result;
}

async function updateSubmission(id, params, headers) {
    const userid = headers.userid;
    const role = headers.userrole;
    const sub = await getSubmissionById(id);
    if (parseInt(userid) == sub.UserId || role === 'Admin') {
        // copy params to user and save
        Object.assign(sub, params);
        await sub.save();
        return 'Berhasil mengubah pengajuan';
    } else {
        return "anda tidak berhak melakukan perubahan";
    }
}

async function _delete(req) {
    const id = req.params.id;
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
async function getActiveSubmission(userId) {
    const sub = await db.Submission.findOne({where:
        { UserId: userId,
        isActive: true
        }});
    return sub;
}
async function submitSub(id) {
    const sub = getSubmissionById(id);
    if (sub) {
        sub.isSubmitted = true;
        return 'Berhasil mengajukan penilaian';
    } else {
        throw 'pengajuan tidak valid id';
    }
}
async function approveSubmission(req) {
    const sub = getSubmissionById(parseInt(req.params.id));
    if (sub) {
        sub.subScore = req.body.score;
        sub.subNote = re.body.subNote;
    }
}
