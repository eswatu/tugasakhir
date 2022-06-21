const fs = require("fs");
const sharp = require("sharp");
const db = require("../_helpers/db");

const uploadFiles = async (req, res) => {
    try {
          if (req.file == undefined) {
            return res.send(`You must select a file.`);
          }
          await sharp(req.file.path).resize({width: 300})
                    .jpeg({quality:90})
                    .toFile(__basedir + "/resources/static/assets/uploads/resize-" + req.file.filename);

          let upldFile = fs.readFileSync(__basedir + "/resources/static/assets/uploads/resize-" + req.file.filename);
          let uid = parseInt(req.headers.userid);
          let user = await db.User.findByPk(uid);      
          if (user.AvatarId) {
            console.log('ava id: ' + user.AvatarId);
            //update exist
             db.Avatar.update({
                data : upldFile,
                updatedAt: new Date(),
                type: req.file.mimetype,
                name: req.file.originalname
              },{where: {id : user.AvatarId} });
              return "Sukses update file";
            } else {
                db.Avatar.create({
                type: req.file.mimetype,
                name: req.file.originalname,
                data: upldFile,
                createdAt: new Date(),
                updatedAt: new Date()
                }).then((ava) => {
                  user.update({AvatarId: ava.id});
                  fs.writeFileSync(__basedir + "/resources/static/assets/tmp/" + ava.name, ava.data
                  );
                  return `Sukses menambahkan profil.`;
                });
                await user.save();
          }
        
      } catch (error) {
      if (error.code == "LIMIT_FILE_SIZE") {
        return res.send('file terlalu besar');
      }
      console.log(error);
      return res.send(`Error when trying upload images: ${error}`);
    }
  }

const downloadImage = async (req, res) => {
  let image = await db.Avatar.findByPk(req.params.id);
  if (image) {
      //var base64data = Buffer.from(image.data).toString('base64');
      res.type('application/octet-stream').send(image.data);
  } else {
    res.send('file tidak ada');
  }
}

  module.exports = {
      uploadFiles,
      downloadImage
    };