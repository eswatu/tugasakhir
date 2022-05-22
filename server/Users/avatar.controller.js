const express = require('express');
const router = express.Router();
const upload = require('../_helpers/upload');
const uploadService = require("./avatar.service");

router.post('/post', upload.uploadImage.single("avatar"), uploadService.uploadFiles);
router.get('/:id', uploadService.downloadImage);

module.exports = router;

