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
    return await paginate(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn , filterQuery);
}
async function getALById(id) {
    return await db.findByPk(id);
}
async function createAL(params) {
    let res;
    if (await db.findOne({
        where: {    Id : params.id,
                    ltNumber: params.ltNumber
        }})) {
        return res.statusCode(400).json({message:"surat tugas sudah ada"});
    } else {
        db.create({
            ltNumber: params.ltNumber,
            ltDate  : params.ltDate,
            ltShare : params.ltShare,
            ltStart : params.ltStart,
            ltEnd   : params.ltEnd,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return res.statusCode(200).json({message: "berhasil input surat tugas"});
    }
}
async function updateAL(id, body) {
    const st = await db.findByPk(id);
    body.updatedAt = new Date();
    Object.assign(st, body);
    await st.save();
    return st;
}
async function deleteAL(id) {
    let st = await db.findByPk(id);
    if (st) {
        st.destroy();
        return "sukses delete st";
    } else {
        return "invalid st id"
    }
}