const express = require('express');
const router = express.Router();
const Joi = require('joi');
const butirService = require('./butir.service');
const authorize = require('../_middleware/authorize');
//routes
router.get('/',getAll);
router.get('/:id',authorize(), getById);

module.exports = router;

//function route

function getAll(req, res, next) {
    butirService.getAll(req.query)
        .then(butirs => res.json(butirs))
        .catch(next);
}
function getById(req, res, next) {
    butirService.getById(req.params.id)
        .then(butir => res.json(butir))
        .catch(next);
}


//schema
