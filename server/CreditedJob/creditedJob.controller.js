const express = require('express');
const router = express.Router();
const validateRequest = require('../_middleware/validate-request');
const cjService = require('./creditedJob.service');
const authorize = require('../_middleware/authorize');

//routes
router.post('/create', createSchema, create);
router.get('/', getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id',authorize(), _delete);

module.exports = router;

//function route

function createSchema(req, res, next) {
    const schema = Joi.object({
        name        : Joi.string().required(),
        level       : Joi.number().required(),
        creditValue : Joi.number().precision(4).required(),
        proof       : Joi.string().required(),
    });
    validateRequest(req, next, schema);
}
function create(req, res, next) { 
    cjService.createCreditedJob(req.body)
        .then(() => res.json({ message: "Sukses Input Poin pekerjaan baru" }))
        .catch(next);
}

function getAll(req, res, next) {
    cjService.getAll()
        .then(acts => res.json(acts))
        .catch(next);
}

function getById(req, res, next) {
    cjService.getById(req,params.id)
        .then(act => res.json(act))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name        : Joi.string().required(),
        level       : Joi.number().required(),
        creditValue : Joi.number().precision(4).required(),
        proof       : Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    cjService.updateCreditedJob(req.params.id, req.body)
        .then(() => res.json({ message: 'Poin pekerjaan updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    cjService.delete(req.params.id)
        .then(() => res.json({ message: 'Poin terhapus' }))
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

