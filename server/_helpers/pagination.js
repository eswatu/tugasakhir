const { Op } = require("sequelize");

module.exports =  {
    paginate,
    paging
}
async function paginate(model, pageIndex, pageSize,
    sortColumn = 'id', sortOrder = "ASC" ,
    filterColumn, filterQuery, uid)
{
    const page = parseInt(pageIndex) || 0;
    const take = parseInt(pageSize) || 10;
    const skip = page  * take;
    let options = {};
    let filter = { UserId: uid};
    if (sortOrder.length < 1) { 
        sortOrder = "ASC";
    }
    if (sortOrder.toUpperCase() == 'ASC') {
        options = { order: [[sortColumn, 'ASC']] }
    } else if (sortOrder.toUpperCase() == 'DESC') {
        options = { order: [[sortColumn, 'DESC']] }
    } 
    let myOrder;
    if (sortColumn.includes('.')) {
        const splitedcolumn = sortColumn.split('.');
        myOrder = [{model: 'db.'+ splitedcolumn[0], as: splitedcolumn[0]}, splitedcolumn[1], sortOrder.toUpperCase()];
    } else {
        myOrder = [sortColumn, sortOrder.toUpperCase()];
    }
   if (filterColumn && filterQuery) {
        if (filterQuery != "" && filterColumn != "") {                
                if (!isNaN(filterQuery)) {
                    filter[filterColumn] = parseInt(filterQuery);
                } else if (filterQuery === 'true' || filterQuery === 'false') {
                    if (filterQuery === 'true') {
                        filter[filterColumn] = true;
                    } else {
                        filter[filterColumn] = false;
                    }
                } else {
                    filter[filterColumn] = {[Op.substring] : filterQuery };
                }
        }
    }

    const { count, rows } = await model.findAndCountAll({
        where: filter,
        include: {all: true},
        subQuery: false,
        offset: skip,
        limit: take,
        order: [myOrder]
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

async function paging(model, pageIndex, pageSize,
    sortColumn = 'id', sortOrder = "ASC" ,
    filterColumn, filterQuery)
{
    const page = parseInt(pageIndex) || 0;
    const take = parseInt(pageSize) || 10;
    const skip = page  * take;
    let options = {};
    let filter = {};

    if (sortOrder.length < 1) { 
        sortOrder = "ASC";
    }
    if (sortOrder.toUpperCase() == 'ASC') {
        options = { order: [[sortColumn, 'ASC']] }
    } else if (sortOrder.toUpperCase() == 'DESC') {
        options = { order: [[sortColumn, 'DESC']] }
    } 
    
    let myOrder;
    if (sortColumn.includes('.')) {
        const splitedcolumn = sortColumn.split('.');
        myOrder = [{model: 'db.'+ splitedcolumn[0], as: splitedcolumn[0]}, splitedcolumn[1], sortOrder.toUpperCase()];
    } else {
        myOrder = [sortColumn, sortOrder.toUpperCase()];
    }
    if (filterColumn && filterQuery) {
        if (filterQuery != "" && filterColumn != "") {                
                if (!isNaN(filterQuery)) {
                    filter[filterColumn] = parseInt(filterQuery);
                } else if (filterQuery === 'true' || filterQuery === 'false') {
                    if (filterQuery === 'true') {
                        filter[filterColumn] = true;
                    } else {
                        filter[filterColumn] = false;
                    }
                } else {
                    filter[filterColumn] = {[Op.substring] : filterQuery };
                }
        }
    }

    const { count, rows } = await model.findAndCountAll({
        where: filter,
        include: {all: true},
        subQuery: false,
        offset: skip,
        limit: take,
        order: [myOrder]
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