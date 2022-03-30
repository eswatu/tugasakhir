const express = require('express');
const router = express.Router();
const Joi = require('joi').extend(require('@joi/date'));
const validateRequest = require('../_middleware/validate-request');
const actService = require('./act.service');
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
        userId   : Joi.number().required(),
        date     : Joi.date().format(["DD/MM/YYYY","DD-MM-YY"]).required(),
        actId    : Joi.number().required(),
        actVolume: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}
function create(req, res, next) { 
    actService.createAct(req.body)
        .then(() => res.json({ message: "Sukses Input Act baru" }))
        .catch(next);
}

function getAll(req, res, next) {
    actService.getAll()
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
        date     : Joi.date().format(["DD/MM/YYYY","DD-MM-YY"]).required(),
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


