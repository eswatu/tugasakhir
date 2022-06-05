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
router.get('/propose/:id', propose);
router.delete('/:id',_delete);

module.exports = router;

//function route

function createSchema(req, res, next) {
    const schema = Joi.object({
        userId   : Joi.number().required(),
        butirId : Joi.number().required(),
        AssignLetterId: Joi.number().required(),
        actDate     : Joi.date().required(),
        butirVolume: Joi.number().required(),
        actNote: Joi.string().allow(null,''),
        actMain: Joi.boolean().required()
    });
    validateRequest(req, next, schema);
}
function create(req, res, next) { 
    actService.createAct(req.body)
        .then(() => res.json({ message: "Sukses Input Kegiatan" }))
        .catch(next);
}

function getAll(req, res, next) {
    actService.getAll(req.query)
        .then(acts => res.json(acts))
        .catch(next);
}

function getById(req, res, next) {
    actService.getById(req.params.id)
        .then(act => res.json(act))
        .catch(next);
}
function propose(req, res, next) {
    actService.propose(req.params.id)
    .then(result => res.json(result))
    .catch(next);
}
function updateSchema(req, res, next) {
    const schema = Joi.object({
        userId   : Joi.number().required(),
        butirId : Joi.number().required(),
        AssignLetterId: Joi.number().required(),
        actDate     : Joi.date().required(),
        butirVolume: Joi.number().required(),
        actNote: Joi.string().allow(null,''),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    actService.updateAct(req.params.id, req.body)
        .then(() => res.json({ message: 'Kegiatan Berhasil Diubah' }))
        .catch(next);
}

function _delete(req, res, next) {
    actService.delete(req.params.id)
        .then(() => res.json({ message: 'Kegiatan Sudah Terhapus' }))
        .catch(next);
}

/*
.format(["DD/MM/YYYY","DD-MM-YY"])
*/