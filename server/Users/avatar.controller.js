const express = require('express');
const router = express.Router();
const upload = require('../_helpers/upload');
const fs = require("fs");
const db = require("../_helpers/db");
const Image = db.avatar;

router.post('/post', upload.single('avatar'), uploadFiles);

module.exports = router;

async function uploadFiles(req, res) {
    try {
      console.log(req.file);
      if (req.file == undefined) {
        return res.send(`You must select a file.`);
      }
      Image.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        data: fs.readFileSync(
          __basedir + "/resources/static/assets/uploads/" + req.file.filename
        ),
      }).then((image) => {
        fs.writeFileSync(
          __basedir + "/resources/static/assets/tmp/" + image.name,
          image.data
        );
        return res.send(`File has been uploaded.`);
      });
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying upload images: ${error}`);
    }
  }