module.exports = async function paginate(model, pageIndex, pageSize, sortColumn = 'id', sortOrder = "ASC" , filterColumn, filterQuery)
{
    const page = parseInt(pageIndex) || 0;
    const take = parseInt(pageSize) || 10;
    const skip = page  * take;
    let options = {};
    if (sortOrder.length < 1) { 
        sortOrder = "ASC";
    }
    if (sortOrder.toUpperCase() == 'ASC') {
        options = { order: [[sortColumn, 'ASC']] }
    } else if (sortOrder.toUpperCase() == 'DESC') {
        options = { order: [[sortColumn, 'DESC']] }
    }
    if (filterQuery && filterColumn) {
        if (filterQuery.length > 0 && filterQuery != undefined || filterQuery != "" && filterColumn != "") {
            options = { filterColumn: filterQuery };
        }
    }

    const { count, rows } = await model.findAndCountAll({
        include: {all: true},
        subQuery: false,
        offset: skip,
        limit: take,
        order: [[sortColumn, sortOrder.toUpperCase()]]
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
