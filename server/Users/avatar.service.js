const fs = require("fs");
const db = require("../_helpers/db");

const uploadFiles = async (req, res) => {
    try {
              console.log(JSON.stringify(req.body.userId));
              if (req.file == undefined) {
                return res.send(`You must select a file.`);
              }
          let upldFile = fs.readFileSync(__basedir + "/resources/static/assets/uploads/" + req.file.filename);
          let uid = parseInt(req.body.userId);
          let user = db.User.findByPk(uid);
          console.log("ava user berisi "+ JSON.stringify(user));
          if (user.avatarId) {
             db.Avatar.update({
              data : upldFile,
              updatedAt: new Date(),
              type: req.file.mimetype,
              name: req.file.originalname
            },{where: {id : user.avatarId} });
              return res.send("Sukses update file");
            } else {
                db.Avatar.create({
                type: req.file.mimetype,
                name: req.file.originalname,
                data: upldFile,
                createdAt: new Date(),
                updatedAt: new Date()
                }).then((ava) => {
                fs.writeFileSync(
                  __basedir + "/resources/static/assets/tmp/" + ava.name, ava.data
                  );
                  db.User.update({ AvatarId: ava.id}, {
                    where: {
                      id: uid
                    }
                  });
                  return res.send(`Sukses menambahkan profil.`);
                });
          }
        
      } catch (error) {
      if (error.code == "LIMIT_FILE_SIZE") {
        return res.send('file terlalu besar');
      }
      console.log(error);
      return res.send(`Error when trying upload images: ${error}`);
    }
  }
async function downloadImage(req, res){
  let image = db.Avatar.findByPk(req.id);
  if (image) {
    res.send(image);    
  } else {
    res.send('file tidak ada');
  }
}

  module.exports = {
      uploadFiles,
      downloadImage
    };