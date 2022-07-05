const db = require('../_helpers/db');
const subService = require('../Submission/submission.service');
const pagination = require('../_helpers/pagination');
const actfileService = require('../Acts/actFile.service');

module.exports = {
    getAll,
    getById,
    getByDate,
    createAct,
    propose,
    updateAct,
    deleteAct: _delete,
    getActBySubId
};

async function getAll(rq) {
    const req = rq.query;
    const role = rq.headers.userrole;
    let uid = parseInt(rq.headers.userid);

    var pageIndex = req.pageIndex;
    var pageSize = req.pageSize;
    var sortColumn = req.sortColumn;
    var sortOrder = req.sortOrder;
    var filterColumn = req.filterColumn;
    var filterQuery = req.filterQuery;
    var model = db.Act; 
    if (role === "Admin") {
        return await pagination.paging(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
    } else {
        return await pagination.paginate(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery, uid);
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
            AssignLetterId: params.AssignLetterId
        }
    })) {
        throw 'Entry data sudah ada, ';
    }
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
    });
    return 'Berhasil Input data, refresh halaman untuk melihat hasil';
}
async function propose(req) {
    let act = await getActById(parseInt(req.params.id));
    let sub = await subService.getActiveSubmission(parseInt(req.headers.userid));

    let result;
    if (act != null && sub != null) {
        let msg;
        if (act.isProposed) {
            act.proposeDate = null;
            act.isProposed = false;
            msg = 'sukses menolak';
        } else {
            act.proposeDate = new Date();
            act.isProposed = true;
            //ini ganti nanti ke user
            act.SubId = sub.id;
            msg = 'sukses mengajukan';
        }
        subService.calcSubScore(sub.id);
        await act.save();
        result = msg;
    } else {
        result = 'Gagal: Tidak ada pengajuan, silakan buat di menu Pengajuan';
    }
    return result;
}


async function updateAct(req) {
    const uid = parseInt(req.headers.userid);
    const act = await getActById(req.params.id);
    let body = req.body;
    body.updatedAt = new Date();
    console.log(body);
    //cek duplikasi
    if (await db.Act.findOne({
        where: {
            UserId : uid,
            ButirId: body.ButirId,
            butirVolume: body.butirVolume,
            actDate: body.actDate,
            AssignLetterId: body.AssignLetterId
        }
    })) {
        throw 'Entry data sudah ada, ubah nilai input ke yang lain';
    }
    // copy params to user and save
    Object.assign(act, body);
    await act.save();
    return 'Sukses mengubah data';
}

async function _delete(id) {
    const act = await getActById(id);
    console.log(act);
    if (act) {
        await act.destroy();
        return 'Berhasil menghapus data';
    } else {
        throw 'id tidak valid';
    }
}

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
async function getActBySubId(sid) {
    const acts = await db.Act.findAll(
        {   where: { SubId: sid, isProposed: true},
            include: [{model: db.AssignLetter}, {model: db.Butir} ]
        });
    if (acts) {
        return acts;
    } else {
        throw 'act tidak ada';
    }
}

async function calcYear(req) {
    const targetYear = req.params.year;
    const mains = await db.Act.findAll({where: { actMain: true, actDate: {[Op.between]: [new Date(01,01,targetYear), new Date(31,12,targetYear)]}}, include: db.Butir});
    const sides = await db.Act.findAll({where: { actMain: false, actDate: {[Op.between]: [new Date(01,01,targetYear), new Date(31,12,targetYear)]}}, include: db.Butir});
    let totalmain;
    let realized = 0;
    let unrealized = 0;
    mains.forEach(act => {
        if (act.isCalculated) {
            realized += act.butirVolume * parseFloat(act.Butir.jmlPoin); 
        } else {
            unrealized += act.butirVolume * parseFloat(act.Butir.jmlPoin);
        }
    });
    totalmain = realized + unrealized;

    const specialB = await db.SpecialButir.findAll();
    const sb = specialB.map(function(item) {
        return item["ButirId"];
    });
    
    let totalSides;
    let siderealized = 0;
    let sideunrealized = 0;
    sides.forEach(act => {
        if (act.isCalculated) {
            realized += act.butirVolume * parseFloat(act.Butir.jmlPoin); 
        } else {
            unrealized += act.butirVolume * parseFloat(act.Butir.jmlPoin);
        }
    });
    
    
}
