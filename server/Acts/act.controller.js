const express = require('express');
const router = express.Router();
const Joi = require('joi').extend(require('@joi/date'));
const validateRequest = require('../_middleware/validate-request');
const actService = require('./act.service');
const authorize = require('../_middleware/authorize');

//routes
router.post('/', createSchema, create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', updateSchema, update);
router.delete('/:id',_delete);

module.exports = router;

//function route

function createSchema(req, res, next) {
    const schema = Joi.object({
        userId   : Joi.number().required(),
        butirId : Joi.number().required(),
        actDate     : Joi.date().required(),
        butirVolume: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}
function create(req, res, next) { 
    actService.createAct(req.body)
        .then(() => res.json({ message: "Sukses Input Kegiatan" }))
        .catch(next);
}

function getAll(req, res, next) {
    actService.getAll(req)
        .then(acts => res.json(acts))
        .catch(next);
}

function getById(req, res, next) {
    actService.getById(req,params.id)
        .then(act => res.json(act))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        userId   : Joi.number().required(),
        date     : Joi.date().required(),
        actId    : Joi.number().required(),
        actVolume: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    actService.updateAct(req.params.id, req.body)
        .then(() => res.json({ message: 'Act updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    actService.delete(req.params.id)
        .then(() => res.json({ message: 'act terhapus' }))
        .catch(next);
}

//schema
function pagingResult(pageIndex = 1, pageSize = 10, totalCount, sortColumn, sortOrder, filterColumn, filterQuery) { 
    //hitung jumlah halaman
    let totalPages = Math.ceil(totalCount / pageSize);
    //halaman tidak lebih dari range
    if (pageIndex < 1) {
        pageIndex = 1;
    } else if (pageIndex > totalPages) { 
        pageIndex = totalPages;
    }
    
}

/*
.format(["DD/MM/YYYY","DD-MM-YY"])
*/