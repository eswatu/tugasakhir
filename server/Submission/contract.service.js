const db = require('../_helpers/db');
const pagination = require('../_helpers/pagination');

module.exports = {
    getAll,
    getById,
    getContractByUserId,
    createContract,
    updateContract,
    deleteAct: _delete,
    getActiveContract,
    toggleContract,
    getContractByYear,
    getYears
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
    var model = db.Contract;
    
    if (role === "Admin") {
        return await pagination.paging(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
    } else {
        return await pagination.paginate(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery, uid);
    }
}

async function getById(id) {
    return await getContractById(id);
}
async function getContractByUserId(id) {
    const ctr = await db.Contract.findOne({
        where: {
            UserId: id
        }
    });
    return ctr ?? null;
}

async function createContract(req) {
    const params = req.body;
    const uid = req.headers.userid;
    // validate
    let result;
    if (await db.Contract.findOne({
        where: {contractYear: params.contractYear,
            UserId: uid
        }
    })) {
        result = 'Sudah ada Target tahun tersebut';
    } else {
    // save Act
    await db.Contract.create({
        //required
        contractName : params.contractName,
        contractDate: params.contractDate,
        contractYear: params.contractYear,
        contractValue: params.contractValue ?? 5,
        contractNote: params.contractNote,
        UserId: uid,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(us => {
        result = 'Berhasil membuat Kontrak Kinerja'; 
        console.log("Kontrak " + us + "berhasil dibuat");
    });
    }
    return result;
}

async function updateContract(id, params, headers) {
    const userid = headers.userid;
    const role = headers.userrole;
    const ctr = await getContractById(id);
    if (parseInt(userid) == ctr.UserId || role === 'Admin') {
        // copy params to user and save
        Object.assign(ctr, params);
        ctr.updatedAt = new Date();
        await ctr.save();
        return 'Berhasil mengubah Kontrak Kinerja';
    } else {
        return "anda tidak berhak melakukan perubahan";
    }
}

async function getContractByYear(req) {
    const year = parseInt(req.params.year);
    const uid = parseInt(req.headers.userid);
    const ctr = await db.Contract.findOne({where: {contractYear:year, UserId: uid}});
    if (ctr) {
        return ctr;
    } else { 
        throw 'Kontrak tidak ditemukan';
    }
}

async function _delete(req) {
    const id = req.params.id;
    const ctr = await getContractById(id);
    await ctr.destroy();
}

// helper functions
async function getContractById(id) {
    console.log('by id called');
    const ctr = await db.Contract.findByPk(id);
    if (!ctr) throw 'Kontrak tidak ditemukan';
    return ctr;
}

async function getActiveContract(userId) {
    const ctr = await db.Contract.findOne({where:
        { UserId: userId,
        isActive: true
        }});
    return sub;
}

async function toggleContract(id) {
    const ctr = await db.Contract.findByPk(id);
    if (ctr) {
        if (ctr.isActive) {
            await ctr.update({isActive : false, updatedAt: new Date()});
            await ctr.save();
            return 'Berhasil Menutup Kontrak';
        } else {
            await ctr.update({isActive : true, updatedAt: new Date()});
            await ctr.save();
            return 'Berhasil Membuka Kontrak';
        }
    } else {
        throw 'Kontrak tidak valid id';
    }
}
async function getYears(req){
    console.log('this is called');
    if (req.headers.userrole === 'Admin') {
        const ctrs = await db.Contract.findAll({attributes: ['contractYear'],
                                                group: ['contractYear']});
        return ctrs;
    } else {
        const uid = parseInt(req.headers.userid);
        const ctrs = await db.Contract.findAll({attributes: ['contractYear'],
                                        group: ['contractYear'], where: {UserId: uid}});
        return ctrs;
    }
}


