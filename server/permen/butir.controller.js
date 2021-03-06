const express = require('express');
const router = express.Router();
const Joi = require('joi');
const butirService = require('./butir.service');
const authorize = require('../_middleware/authorize');
//routes
router.get('/', authorize(), getAll);
router.get('/jenis/:jenis/forLevel/:level',authorize(),  getByLevel);
router.get('/SUBName/:id',authorize(),  getSubNById);
router.get('/AKName/:id',authorize(),  getAktNameId);
router.get('/:id', authorize(), getById);

module.exports = router;

//function route

function getAll(req, res, next) {
    butirService.getAll(req.query)
        .then(butirs => res.json(butirs))
        .catch(next);
}
function getById(req, res, next) {
    butirService.getById(req.params)
        .then(butir => res.json(butir))
        .catch(next);
}
function getByLevel(req, res, next) {
    butirService.getByLevel(req.params)
        .then(butir => res.json(butir))
        .catch(next);
}
function getSubNById(req, res, next) {
    butirService.getSubNById(req.params.id)
        .then(su => res.json(su))
        .catch(next);
}
function getAktNameId(req, res, next) {
    butirService.getAktNameById(req.params.id)
        .then(akt => res.json(akt))
        .catch(next);
}

//schema
