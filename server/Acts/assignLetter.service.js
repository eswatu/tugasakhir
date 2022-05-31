const config = require('../config.json');
const { Sequelize } = require('../models');
const db = require('../_helpers/db');
const paginate = require('../_helpers/pagination');

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
    console.log(pageIndex, pageSize, sortColumn, sortOrder, filterColumn , filterQuery);
    return await paginate(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn , filterQuery);
}
async function getALById(id) {
    return await db.AssignLetter.findByPk(id);
}
async function createAL(body) {
    console.log(body);
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
            ltActive: body.ltActive
        }).then(r => {
            result = r;
        });
        return result;
    }
}
async function updateAL(id, body) {
    const st = await db.AssignLetter.findByPk(id);
    body.updatedAt = new Date();
    Object.assign(st, body);
    await st.save();
    return st;
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