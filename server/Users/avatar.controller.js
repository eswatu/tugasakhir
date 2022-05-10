const express = require('express');
const router = express.Router();
const validateRequest = require('../_middleware/validate-request');
const avService = require('./avatar.service');
const authorize = require('../_middleware/authorize');

router.post('/postAva', uploadAva.single('avatar'), avService.uploadFiles);
