const express = require('express');
const router = express.Router();
const Joi = require('joi').extend(require('@joi/date'));
const validateRequest = require('../_middleware/validate-request');
const subService = require('./submission.service');
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
        subName   : Joi.string().required(),
        subDate : Joi.date().required(),
        subNote: Joi.string().allow(null,'')
    });
    validateRequest(req, next, schema);
}
function create(req, res, next) { 
    subService.createSubmission(req.body)
        .then(() => res.json({ message: "Sukses Membuat Pengajuan" }))
        .catch(next);
}

function getAll(req, res, next) {
    subService.getAll(req.query)
        .then(acts => res.json(acts))
        .catch(next);
}

function getById(req, res, next) {
    subService.getById(req.params.id)
        .then(act => res.json(act))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        subName   : Joi.string().required(),
        subDate : Joi.date().required(),
        subScore: Joi.number().min(0).max(100).allow(null,''),
        subNote: Joi.string().allow(null,'')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    subService.updateSubmission(req.params.id, req.body)
        .then(() => res.json({ message: 'Pengajuan Berhasil Diubah' }))
        .catch(next);
}

function _delete(req, res, next) {
    subService.delete(req.params.id)
        .then(() => res.json({ message: 'Pengajuan Sudah Terhapus' }))
        .catch(next);
}
