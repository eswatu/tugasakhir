const express = require('express');
const router = express.Router();
const upload = require('../_helpers/upload');
const uploadService = require("./assignFile.service");

router.post('/post', upload.uploadFile.single("assignFile"), uploadService.uploadFiles);
router.get('/:id', uploadService.downloadFile);

module.exports = router;