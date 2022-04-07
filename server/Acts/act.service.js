const config = require('../config.json');
const db = require('../_helpers/db');


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
            actVolume: params.actVolume
        }
    })) {
        throw 'Act itu "' + params.id + '" sudah terdaftar';
    }
    // save Act
    await db.Act.create({
        userId : params.userId,
        butirId: params.butirId,
        butirVolume: params.butirVolume,
        isCalculated: false,
        calculatedDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(us => { 
        console.log("act " + us + "berhasil dibuat");
    });
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


async function paginate(model, pageIndex, pageSize, sortColumn = 'id', sortOrder , filterColumn, filterQuery)
{
    const page = parseInt(pageIndex) || 1;
    const take = parseInt(pageSize) || 8;
    const skip = (page - 1) * take;
    let options = {};
    
    if (sortOrder.toUpperCase() == 'ASC') {
        options['order'] = [sortColumn];
    } else if (sortOrder.toUpperCase() == 'DESC') { 
        options['order'] = [sortColumn, 'DESC'];
    }

    if (filterQuery.length > 0 && filterQuery != undefined) {
        options = { filterColumn: filterQuery };
    }

    const { count, rows } = await model.findAndCountAll({
        include: [db.User, db.Butir],
        subQuery: false,
        offset: skip,
        limit: take,
        order: [sortColumn ]
    });
    const totalPages = Math.ceil(count / take);
    const HasPreviousPage = page > 0 ? true : false;
    const HasNextPage = page == (totalPages - 1) ? false : true;
    return {
        data: rows,
        pageIndex: page,
        pageSize: take,
        totalCount: count,
        totalPages: totalPages,
        hasPreviousPage: HasPreviousPage,
        hasNextPage: HasNextPage,
        sortColumn: sortColumn,
        sortOrder: sortOrder,
        filterColumn: filterColumn,
        filterQuery: filterQuery
    };
}