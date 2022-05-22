const express = require('express');
const router = express.Router();
const Joi = require('joi').extend(require('@joi/date'));
const validateRequest = require('../_middleware/validate-request');
const alservice = require('./assignLetter.service');
const authorize = require('../_middleware/authorize');

//router
router.post('/', createSchema, createAssignLetter);
router.get('/', getAllAL);
router.get('/:id', getByIdAL);
router.put('/:id', createSchema, updateAL);
router.delete('/:id',deleteAL );

module.exports = router;

function createSchema(req, res, next) {
    console.log(req.body);
    const schema = Joi.object({
        ltNumber: Joi.string().required(),
        ltDate  : Joi.date().required(),
        ltDateStart : Joi.date().required(),
        ltDateEnd   : Joi.date().required(),
        ltShare: Joi.boolean(),
        ltNote: Joi.string().allow(null,'')
    });
    validateRequest(req, next, schema);
}
function createAssignLetter(req, res, next) {
    alservice.createAL(req.body)
        .then(() => res.json({message : "Sukses menambahkan data"}))
        .catch(next);
}
function getAllAL(req, res,next) {
    alservice.getAllAL(req.query)
        .then(al => res.json(al))
        .catch(next);
}
function getByIdAL(req,res,next) {
    alservice.getALById(req.params.id)
        .then(al => res.json(al))
        .catch(next);
}
function updateAL(req, res, next) {
    alservice.updateAL(req.params.id, req.body)
        .then(al => res.json(al))
        .catch(next);
}
function deleteAL(req, res, next) {
    alservice.deleteAL(req.params.id)
        .then(al => res.json(al))
        .catch(next);
}