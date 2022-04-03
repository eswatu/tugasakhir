module.exports = async function paginate(
    db, pageIndex, pageSize,
    sortColumn, sortOrder,
    filterColumn, filterQuery)
{
    let PageIndex = pageIndex ?? 1;
    let PageSize = pageSize ?? 10;
    let SortColumn = sortColumn ? sortColumn : 'id';
    let SortOrder = sortOrder == 'ASC' ? 'ASC' : 'DESC';
    let FilterColumn = filterColumn;
    let FilterQuery = filterQuery;
    let result;
    let totalPages;
    let totalCount;

    if (FilterQuery) {
        result = await db.findAllAndCount({
            where: {
                FilterColumn: FilterQuery
            },
            order: [SortColumn, SortOrder],
            limit: PageSize,
            offset: PageIndex * PageSize,
            include: [Aktivitas]
        }).then(result => { 
            totalPages = result.count;
        });
    } else {
        result = await db.findAll({
            order: [SortColumn, sortOrder],
            limit: PageSize,
            offset: PageIndex * PageSize
        }).then(result => { 
            totalPages = result.count;
        })
    };
    let HasPreviousPage = PageIndex > 0 ? true : false;
    let HasNextPage = PageIndex == (totalPages - 1) ? false : true;

    totalPages = Math.ceil(totalCount / PageSize);
    
    return {
        data: result,
        pageIndex: pageIndex,
        pageSize: PageSize,
        totalCount: totalCount,
        totalPages: totalPages,
        hasPreviousPage: HasPreviousPage,
        hasNextPage: HasNextPage,
        sortColumn: SortColumn,
        sortOrder: SortOrder,
        filterColumn: FilterColumn,
        filterQuery: FilterQuery
    };
}