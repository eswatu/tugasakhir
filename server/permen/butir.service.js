const config = require('../config.json');
const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
};

async function getAll(req) {
    var pageIndex = req.pageIndex;
    var pageSize = req.pageSize;
    var sortColumn = req.sortColumn;
    var sortOrder = req.sortOrder;
    var filterColumn = req.filterColumn;
    var filterQuery = req.filterQuery;
    var model = db.Butir;
    return await paginate(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
}

async function getById(id) {
    return await getButir(id);
}

// helper functions

async function getButir(id) {
    const butir = await db.Butir.findByPk(id, {include: [db.SubUnsur, db.Aktivitas]});
    if (!butir) throw 'Butir Kegiatan tidak ditemukan';
    return butir;
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
        include: [db.Aktivitas, db.SubUnsur],
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
