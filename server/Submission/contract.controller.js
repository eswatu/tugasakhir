const express = require('express');
const router = express.Router();
const Joi = require('joi').extend(require('@joi/date'));
const validateRequest = require('../_middleware/validate-request');
const contractService = require('./contract.service');
const authorize = require('../_middleware/authorize');

//routes
router.post('/', authorize(), createSchema, create);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.put('/toggle/:id', authorize(), toggleContract);
router.delete('/:id', authorize(), _delete);
router.get('/ctrByYear/:year', authorize(), contractByYear);
router.get('/yearlist/:year', getYearList);

module.exports = router;

//function route

function createSchema(req, res, next) {
    const schema = Joi.object({
        contractName   : Joi.string().required(),
        contractDate : Joi.date().required(),
        contractYear : Joi.number().required(),
        contractValue: Joi.number().required(),
        contractNote: Joi.string().allow(null,''),
        isActive: Joi.boolean().required()
    });
    validateRequest(req, next, schema);
}
function create(req, res, next) { 
    contractService.createContract(req)
        .then(result => res.json(result))
        .catch(next);
}

function getAll(req, res, next) {
    contractService.getAll(req)
        .then(ctrs => res.json(ctrs))
        .catch(next);
}

function getById(req, res, next) {
    contractService.getById(req.params.id)
        .then(ctr => res.json(ctr))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        contractName   : Joi.string().required(),
        contractDate : Joi.date().required(),
        contractYear : Joi.number().required(),
        contractValue: Joi.number().required(),
        contractNote: Joi.string().allow(null,''),
        isActive: Joi.boolean().required()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    contractService.updateContract(req.params.id, req.body, req.headers)
        .then(() => res.json({ message: 'Kontrak Berhasil Diubah' }))
        .catch(next);
}

function _delete(req, res, next) {
    contractService.delete(req.params.id)
        .then(() => res.json({ message: 'Kontrak Sudah Terhapus' }))
        .catch(next);
}
function toggleContract(req, res, next) {
    contractService.toggleContract(req.params.id)
        .then(result => res.json(result))
        .catch(next);
}
function contractByYear(req, res, next) {
    contractService.getContractByYear(req)
    .then(result => res.json(result))
    .catch(next);
}

function getYearList(req, res, next) {
    contractService.getYears(req)
        .then(result => res.send(result))
        .catch(next);
}

