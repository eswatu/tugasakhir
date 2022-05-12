const fs = require("fs");
const db = require("../_helpers/db");

const uploadFiles = async (req, res) => {
  console.log(req.file.filename);
    try {
      console.log(req.file.originalname);
      if (req.file == undefined) {
        return res.send(`You must select a file.`);
      }
      let upldFile = fs.readFileSync(__basedir + "/resources/static/assets/uploads/" + req.file.filename);
      console.log(upldFile);
      await db.Avatar.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        data: upldFile
      }).then((avatar) => {
        fs.writeFileSync(
          __basedir + "/resources/static/assets/tmp/" + avatar.name, avatar.data
          );
        return res.send(`File has been uploaded.`);
      });
    } catch (error) {
      if (error.code == "LIMIT_FILE_SIZE") {
        return res.send('file terlalu besar');
      }
      console.log(error);
      return res.send(`Error when trying upload images: ${error}`);
    }
  }

  module.exports = {
      uploadFiles
    };