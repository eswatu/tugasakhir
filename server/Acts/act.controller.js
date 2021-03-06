const express = require('express');
const router = express.Router();
const Joi = require('joi').extend(require('@joi/date'));
const validateRequest = require('../_middleware/validate-request');
const actService = require('./act.service');
const authorize = require('../_middleware/authorize');

//routes
router.post('/', authorize(), createSchema, create);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.get('/propose/:id', authorize(), propose);
router.delete('/:id', authorize(), _delete);
router.get('/sub/:id', authorize(), getBySubId);
router.get('/calcYear/:year/forUser/:id', authorize(), calculateYear);

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
    actService.createAct(req)
        .then((r) => { 
            res.json(r)
        })
        .catch(next);       
}

function getAll(req, res, next) {
    actService.getAll(req)
        .then(acts => res.json(acts))
        .catch(next);
}

function getById(req, res, next) {
    actService.getById(req.params.id)
        .then(act => res.json(act))
        .catch(next);
}
function propose(req, res, next) {
    actService.propose(req)
    .then(result => res.json(result))
    .catch(next);
}
function updateSchema(req, res, next) {
    const schema = Joi.object({
        userId   : Joi.number().required(),
        ButirId : Joi.number().required(),
        AssignLetterId: Joi.number().required(),
        actDate     : Joi.date().required(),
        butirVolume: Joi.number().required(),
        actNote: Joi.string().allow(null,''),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    actService.updateAct(req)
        .then((r) => res.json(r))
        .catch(next);
}

function _delete(req, res, next) {
    actService.deleteAct(req.params.id)
        .then(r => res.json(r))
        .catch(next);
}
function getBySubId(req, res, next){
    actService.getActBySubId(req.params.id)
    .then(result => res.json(result))
    .catch(next);
}
function calculateYear(req, res, next){
    actService.calcPerUser(req.params.year, req.params.id)
    .then(result => res.json(result))
    .catch(next);
}