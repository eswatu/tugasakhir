const express = require('express');
const router = express.Router();
const upload = require('../_helpers/upload');
const uploadService = require("./avatar.service");
const authorize = require('../_middleware/authorize');


router.post('/post',authorize(),  upload.uploadImage.single("avatar"), uploadService.uploadFiles);
router.get('/:id',authorize(),  uploadService.downloadImage);

module.exports = router;

