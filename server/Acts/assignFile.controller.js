const express = require('express');
const router = express.Router();
const upload = require('../_helpers/upload');
const uploadService = require("./assignFile.service");
const authorize = require('../_middleware/authorize');


router.post('/post/:id', authorize(), upload.uploadFile.single("assignFile"), uploadService.uploadFiles);
router.get('/:id', authorize(), uploadService.downloadFile );
router.get('/getFileInfo/:id', authorize(), uploadService.getFiles);

module.exports = router;