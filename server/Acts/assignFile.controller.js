const express = require('express');
const router = express.Router();
const upload = require('../_helpers/upload');
const uploadService = require("./assignFile.service");

router.post('/post/:id', upload.uploadFile.single("assignFile"), uploadService.uploadFiles);
router.get('/:id', uploadService.downloadFile );
router.get('/getFileInfo/:id', uploadService.getFiles);

module.exports = router;