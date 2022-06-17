const db = require('../_helpers/db');
const pagination = require('../_helpers/pagination');

module.exports = {
getAllAL,
getALById,
createAL,
updateAL,
deleteAL
};

async function getAllAL(req) {
    var pageIndex = req.pageIndex;
    var pageSize = req.pageSize;
    var sortColumn = req.sortColumn;
    var sortOrder = req.sortOrder;
    var filterColumn = req.filterColumn;
    var filterQuery = req.filterQuery;
    var model = db.AssignLetter;
    console.log(' isi kolom ' + filterColumn + ' dan query '+ filterQuery);
    console.log('jenis ' + typeof(filterColumn) + ' dan ' + typeof(filterQuery));
    return await pagination.paging(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn , filterQuery);
}
async function getALById(id) {
    return await db.AssignLetter.findByPk(id);
}
async function createAL(req) {
    const body = req.body;
    const uid = req.headers.userid;
    let result;
    if (await db.AssignLetter.findOne({
        where: {  ltNumber: body.ltNumber,
                ltDate: body.ltDate
        }})) {
        throw "sudah ada entry "+ body.ltNumber + " dengan tanggal " + body.ltDate;
    } else {
        db.AssignLetter.create({
            ltNumber: body.ltNumber,
            ltDate  : body.ltDate,
            ltShare : body.ltShare,
            ltDateStart : body.ltDateStart,
            ltDateEnd   : body.ltDateEnd,
            ltNote: body.ltNote,
            createdAt: new Date(),
            updatedAt: new Date(),
            ltActive: body.ltActive,
            UserId: uid
        }).then(r => {
            result = r;
        });
        return result;
    }
}
async function updateAL(id, body, headers) {
    const st = await db.AssignLetter.findByPk(id);
    if (headers.userrole === "Admin" || st.UserId == headers.userid) {
        body.updatedAt = new Date();
        Object.assign(st, body);
        await st.save();
        return st;
    } else {
        return 'anda tidak berhak melakukan edit';
    }
}
async function deleteAL(id) {
    let st = await db.AssignLetter.findByPk(id);
    if (st) {
        st.destroy();
        return "sukses delete st";
    } else {
        return "invalid st id"
    }
}