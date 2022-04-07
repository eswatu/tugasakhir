const config = require('../config.json');
const { Sequelize } = require('../models');
const db = require('../_helpers/db');
const paginate = require('../_helpers/pagination');
const Op = Sequelize.Op;
const SubUnsur = require('./subUnsur.model');

module.exports = {
    getAll,
    getByLevel,
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
    return await paginate(model, pageIndex, pageSize, sortColumn, sortOrder, filterColumn = "", filterQuery = "");
}
/*level
terampil                  = 1
mahir                     = 2
terampil + mahir          = 3
penyelia                  = 4
penyelia + mahir          = 6
terampil, mahir, penyelia = 7
 */
async function getByLevel(level) {
    level = parseInt(level);
    const availJob = [];
    if (level == 1) {
        availJob = [1, 2, 3, 7];
    } else if (level == 2) {
        availJob = [1, 2, 3, 4, 6, 7]
    } else if (level == 4) { 
        availJob = [2,3,4,6,7]
    }
    let result =  await db.Butir.findAll(
        {
            include: [{all:true}],
            where: {
                "levelReq": {
                [Op.or]: availJob
            } },
            order: [['SubUnsurId','ASC'],['AktivitaId', 'ASC']]
        }
    );
    result = groupItemBy(result, "SubUnsur.namaSubUnsur");
    //result.forEach(value => groupItemBy(value,"Aktivita.namaAkt"));
    return result;
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

function groupSubItemBy(array, {property}) {
    var group = {};
    for (var i = 0; i < array.length; i++) {
      if (!group[array[i][{property}]]) {
        group[array[i][{property}]] = [];
      }
      group[array[i][{property}]].push(array[i]);
    }
    return group;
  }
function groupItemBy(array, property) {
    var hash = {},
        props = property.split('.');
    for (var i = 0; i < array.length; i++) {
        var key = props.reduce(function(acc, prop) {
            return acc && acc[prop];
        }, array[i]);
        if (!hash[key]) hash[key] = [];
        hash[key].push(array[i]);
    }
    return hash;
}


