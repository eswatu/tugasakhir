const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const userService = require('./user.service');
const authorize = require('../_middleware/authorize');

//routes
router.post('/authenticate', authenticationSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id',authorize(), _delete);

module.exports = router;

//function route
function authenticationSchema(req, res, next) { 
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}
function authenticate(req, res, next) { 
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}
function registerSchema(req, res, next) {
    const schema = Joi.object({
        name    : Joi.string().required(),
        username: Joi.string().required(),
        role    : Joi.string().required(),
        password: Joi.string().min(6).required(),
        level   : Joi.string().required()
    });
    validateRequest(req, next, schema);
}
function register(req, res, next) { 
    userService.create(req.body)
        .then(() => res.json({ message: "Sukses daftar baru" }))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}
function getCurrent(req, res, next) { 
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.User).required(),
        password: Joi.string().min(6).required(),
        level: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}

//schema
