const express = require('express');
const router = express.Router();
const upload = require('../_helpers/upload');
const uploadService = require("./actFile.service");

router.post('/post/:id', upload.uploadFile.single("actFile"), uploadService.uploadFiles);
router.get('/:id', uploadService.downloadFile );
router.get('/getFileInfo/:id', uploadService.getFiles);
router.delete('/:id', uploadService.deleteFile);

module.exports = router;