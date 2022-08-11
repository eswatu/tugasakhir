const db = require('../_helpers/db');
const pagination = require('../_helpers/pagination');
const uservice = require('../Users/user.service');

module.exports = {
    getAll,
    getById,
    getSubByUserId,
    getByDate,
    createSubmission,
    updateSubmission,
    deleteAct: _delete,
    getActiveSubmission,
    submitSub,
    calcSubScore,
    approveSubmission
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
    var fStatus = req.filterStatus;
    var fsDate = req.filterSDate;
    var feDate = req.filterEDate;
    var fId = req.filterId;
    
    if (role === "Penilai" && uservice.isTrueAdmin(uid)) {
        return await pagination.paginateSubNew(model, pageIndex, pageSize,
            sortColumn, sortOrder, filterColumn, filterQuery, fId,
            fStatus, fsDate, feDate);
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
        //console.log("Pengajuan " + us + "berhasil dibuat");
    });
    }
    return result;
}

async function updateSubmission(id, params, headers) {
    const userid = headers.userid;
    const role = headers.userrole;
    const sub = await getSubmissionById(id);
    if (parseInt(userid) == sub.UserId || role === 'Penilai' && uservice.isTrueAdmin(userid)) {
        // copy params to user and save
        Object.assign(sub, params);
        await sub.save();
        return 'Sukses mengubah pengajuan';
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
    const sub = await db.Submission.findByPk(id);
    if (sub) {
        await sub.update({isSubmitted : true});
        await sub.save();
        return 'Berhasil mengajukan penilaian';
    } else {
        throw 'pengajuan tidak valid id';
    }
}

async function approveSubmission(id, params, headers) {
    const adm = headers.userrole;
    const sub = await getSubmissionById(id);
    if (sub && adm === 'Penilai' && uservice.isTrueAdmin(parseInt(headers.userid))) {
        Object.assign(sub, params);
        await sub.update({dateApproved: new Date(), isActive: false, isSubmitted: false});
        await db.Act.update(
            {isCalculated: true, calculatedDate: new Date(), updatedAt: new Date()},
             { where: {SubId: id}});
        await sub.save();
        return 'berhasil menerima pengajuan';
    } else {
        throw 'gagal terima pengajuan';
    }
}

//id untuk id submission, level untuk jenjang user.
async function calcSubScore(id){
    let sub = await db.Submission.findByPk(id);
    const usr = await db.User.findByPk(sub.UserId);
    const level = parseInt(usr.level);
    if (sub)
    {
        //ambil act yang sudah propose, belum diperhitungkan, dengan subId sama
        const acts = await db.Act.findAll({where: {SubId: id, calculatedDate: null, isProposed: true }});
        const specialB = await db.SpecialButir.findAll();
        const sb = specialB.map(function(item) {
            return item["ButirId"];
        });
        let total = 0;
        for (let ac in acts) {
            const butir = await db.Butir.findByPk(acts[ac].ButirId);
            //cek apakah sudah dihitung atau belum, diajukan atau belum.
            if (!sb.includes(butir.id)) {
                //ini sisipkan perhitungan berdasarkan level angka kredit poin
                /*level
                terampil                  = 1
                mahir                     = 2
                terampil + mahir          = 3
                penyelia                  = 4
                penyelia + mahir          = 6
                terampil, mahir, penyelia = 7
                */
                    let modifier = 0;
                    switch (butir.levelReq) {
                        case 1:
                        modifier = (level == 1 ) ? 1 : (level == 2 ) ? 0.8 : 0 ;     
                            break;
                        case 2:
                            modifier = (level == 2 ) ? 1 : 0.8;
                            break;
                        case 3:
                            modifier = (level < 3) ? 1 : 0.8;
                            break;
                        case 4:
                            modifier = (level == 1) ? 0 : (level == 2) ? 0.8 : 1;
                            break;
                        case 6:
                            modifier = (level == 1) ? 0.8 : 1;
                            break;
                        case 7:
                            modifier = 1;
                            break;  
                        default:
                            break;
                    }
                total += acts[ac].butirVolume * parseFloat(butir.jmlPoin) * modifier;
            } else {
                const gap = (level == 1) ? 20  : (level == 2 ) ? 50 : 100;
                //console.log("isi gap " + butir.jmlPoin.trim().substring(0,2));
                const gapPoint = parseFloat(butir.jmlPoin.trim().substring(0,2) * 0.01) * gap; 
                total += acts[ac].butirVolume * gapPoint;
            }
            acts[ac].calculatedDate = new Date();
            //console.log('tanggal perhitungan adalah: ' + acts[ac].calculatedDate);
            acts[ac].save();
        }
        sub.subScore = total;

        //console.log('nilai subscore adalah: ' + sub.subScore);
    }
    sub.save();
}
