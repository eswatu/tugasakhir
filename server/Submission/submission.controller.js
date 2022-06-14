const express = require('express');
const router = express.Router();
const Joi = require('joi').extend(require('@joi/date'));
const validateRequest = require('../_middleware/validate-request');
const subService = require('./submission.service');
const authorize = require('../_middleware/authorize');

//routes
router.post('/', authorize(), createSchema, create);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.post('/submit/:id', authorize(), submitSub);
router.delete('/:id', authorize(), _delete);

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
    subService.createSubmission(req)
        .then(result => res.json(result))
        .catch(next);
}

function getAll(req, res, next) {
    subService.getAll(req)
        .then(subs => res.json(subs))
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
    subService.updateSubmission(req.params.id, req.body, req.headers)
        .then(() => res.json({ message: 'Pengajuan Berhasil Diubah' }))
        .catch(next);
}

function _delete(req, res, next) {
    subService.delete(req.params.id)
        .then(() => res.json({ message: 'Pengajuan Sudah Terhapus' }))
        .catch(next);
}
function submitSub(req, res, next) {
    subService.submitSub(req.params.id)
        .then(result => res.json(result))
        .catch(next);
}

