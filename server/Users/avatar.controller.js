const express = require('express');
const router = express.Router();
const upload = require('../_helpers/upload');
const uploadService = require("./avatar.service");

router.post('/post', upload.single("avatar"), uploadService.uploadFiles);

module.exports = router;

