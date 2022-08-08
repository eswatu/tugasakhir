const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const userService = require('./user.service');
const authorize = require('../_middleware/authorize');

//routes
router.post('/authenticate', authenticationSchema, authenticate);
router.post('/register', registerSchema, register);
router.post('/changepassword/:id',authorize(),  changePassword);
router.get('/',authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

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
        .then(user => user ? res.json(user) : res.status(400).json({message:'kesalahan user/password tidak sesuai'}))
        .catch(err => next(err));
}
function registerSchema(req, res, next) {
    const schema = Joi.object({
        name    : Joi.string().required(),
        username: Joi.string().required(),
        role    : Joi.string().required(),
        password: Joi.string().min(6).required(),
        level   : Joi.string().required(),
        baseAngkre : Joi.number().required(),
    });
    validateRequest(req, next, schema);
}
function register(req, res, next) { 
    userService.create(req.body)
        .then(() => res.json({ message: "Sukses daftar baru" }))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll(req)
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) { 
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function changePassword(req, res, next) {
    userService.changepassword(req.body)
    .then(message => res.json(message))
    .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        baseAngkre: Joi.number().required(),
        role: Joi.string().valid("Admin", "User", "Penilai").required(),
        password: Joi.string().min(6).allow(null,''),
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
