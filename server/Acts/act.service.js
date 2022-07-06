const db = require('../_helpers/db');
const subService = require('../Submission/submission.service');
const pagination = require('../_helpers/pagination');
const actfileService = require('../Acts/actFile.service');
const Op = require('sequelize');
const { DATEONLY } = require('sequelize');

module.exports = {
    getAll,
    getById,
    getByDate,
    createAct,
    propose,
    updateAct,
    deleteAct: _delete,
    getActBySubId,
    calcYear
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
    const usr = db.User.findByPk(parseInt(req.headers.userid));
    const sd = `${targetYear}-01-01`;
    const ed = `${targetYear}-12-31`;
    //ambil semua act dari satu user dalam satu tahun
    const acts = await db.Act.findAll(
        {where: { UserId: usr.id,
                  actDate: {[Op.between]: [sd, ed]}
                 }});
    const specialB = await db.SpecialButir.findAll();
    const sb = specialB.map(function(item) {
        return item["ButirId"];
    });

    let total = 0;
    let totalMain = 0;
    let mainrealized = 0;
    let mainunrealized = 0;
    let totalSide = 0;
    let sideunrealized =0;
    let siderealized = 0;

    for (let ac in acts) {
        const butir = await db.Butir.findByPk(acts[ac].ButirId);
        //cek apakah sudah dihitung atau belum, diajukan atau belum.
        if (!sb.includes(butir.id)) {
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
                if (ac.actMain) {
                    if (ac.isCalculated) {
                        mainrealized += acts[ac].butirVolume * parseFloat(butir.jmlPoin) * modifier;
                    } else {
                        mainunrealized += acts[ac].butirVolume * parseFloat(butir.jmlPoin) * modifier;
                    }
                } else {
                    if (ac.isCalculated) {
                        siderealized += acts[ac].butirVolume * parseFloat(butir.jmlPoin) * modifier;
                    } else {
                        sideunrealized += acts[ac].butirVolume * parseFloat(butir.jmlPoin) * modifier;
                    }
                }
        } else {
            const gap = (level == 1) ? 20  : (level == 2 ) ? 50 : 100;
            console.log("isi gap " + butir.jmlPoin.trim().substring(0,2));
            const gapPoint = parseFloat(butir.jmlPoin.trim().substring(0,2) * 0.01) * gap; 
            total += acts[ac].butirVolume * gapPoint;
        }
        totalMain = mainunrealized + mainrealized;
        totalSide = sideunrealized + siderealized;
    }
    sub.subScore = total;

    console.log('nilai subscore adalah: ' + sub.subScore);
        return mains;
    
}
