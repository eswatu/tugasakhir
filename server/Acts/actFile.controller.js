const express = require('express');
const router = express.Router();
const upload = require('../_helpers/upload');
const uploadService = require("./actFile.service");
const authorize = require('../_middleware/authorize');


router.post('/post/:id', authorize(), upload.uploadFile.single("actFile"), uploadService.uploadFiles);
router.get('/:id', authorize(), uploadService.downloadFile );
router.get('/getFileInfo/:id', authorize(), uploadService.getFiles);
router.delete('/:id', authorize(), uploadService.deleteFile);

module.exports = router;