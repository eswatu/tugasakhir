const config = require('../config.json');
const { Sequelize } = require('../models');
const db = require('../_helpers/db');
const paginate = require('../_helpers/pagination');
const Op = Sequelize.Op;

module.exports = {
    getAll,
    getByLevel,
    getById,
    getSubNById,
    getAktNameById
};

async function getAll(req) {
    var pageIndex = req.pageIndex;
    var pageSize = req.pageSize;
    var sortColumn = req.sortColumn;
    var sortOrder = req.sortOrder;
    var filterColumn = req.filterColumn;
    var filterQuery = req.filterQuery;
    var model = db.Butir;
    return await paginate(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn , filterQuery);
}
/*level
terampil                  = 1
mahir                     = 2
terampil + mahir          = 3
penyelia                  = 4
penyelia + mahir          = 6
terampil, mahir, penyelia = 7
 */
async function getByLevel(params) {
    level = parseInt(params.level);
    jenis = parseInt(params.jenis);
    var akt = [];
    if (jenis != 1) {
        akt = await db.Aktivitas.findAll({
        attributes: ['id'],
        where: {
            "kodeAkt": 'G'
        }});
    } else {
        akt = await db.Aktivitas.findAll({
        attributes: ['id'],
        where: {
            "kodeAkt": {
                [Op.ne]: 'G'
            }
        }});
    }

    const selJenis = akt.map(a => a.id);
   
    var availJob = [];
    if (level == 1) {
        availJob = [1, 2, 3, 7];
    } else if (level == 2) {
        availJob = [1, 2, 3, 4, 6, 7]
    } else if (level == 4) { 
        availJob = [2,3,4,6,7]
    }
    let result =  await db.Butir.findAll(
        {
            include:[{all:true}],
            where: {
                "AktivitaId": {
                    [Op.or]: selJenis
                },
                "levelReq": {
                [Op.or]: availJob
            } },
            order: [['SubUnsurId','ASC'],['AktivitaId', 'ASC'],['id','ASC']]
        }
    );

    return result;
}

async function getById(id) {
    return await getButir(id);
}
async function getSubNById(id) {
    return await getSUName(id);
}
async function getAktNameById(id) {
    return await getAkName(id);
}

// helper functions

async function getButir(id) {
    const butir = await db.Butir.findByPk(id, {include: [db.SubUnsur, db.Aktivitas]});
    if (!butir) throw 'Butir Kegiatan tidak ditemukan';
    return butir;
}
async function getSUName(id) {
    const subUnsur = await db.SubUnsur.findByPk(id);
    if (!subUnsur) throw new 'Invalid id subunsur';
    return subUnsur;
}
async function getAkName(id) {
    const akt = await db.Aktivitas.findByPk(id);
    if (!akt) throw new 'invalid id aktivitas';
    return akt;
}



