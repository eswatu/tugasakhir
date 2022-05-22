const fs = require("fs");
const db = require("../_helpers/db");
//need update
const uploadFiles = async (req, res) => {
    try {
          if (req.file == undefined) {
            return res.send(`You must select a file.`);
          }
          let upldFile = fs.readFileSync(__basedir + "/resources/static/st/uploads/" + req.file.filename);
          let uid = parseInt(req.body.assignLetterId);
          let assignLetter = await db.AssignLetter.findByPk(uid);      
          if (assignLetter.AssignFileId) {
            //update exist
             db.AssignFile.update({
                data : upldFile,
                updatedAt: new Date(),
                type: req.file.mimetype,
                name: req.file.originalname
              },{where: {id : assignletter.AssignFileId} });
              return "Sukses update file";
            } else {
                db.AssignFile.create({
                type: req.file.mimetype,
                name: req.file.originalname,
                data: upldFile,
                createdAt: new Date(),
                updatedAt: new Date()
                }).then((af) => {
                  console.log();
                  db.AssignLetter.update({ AssignFileId: af.id}, {
                    where: {
                      id: uid
                    }
                  });
                  fs.writeFileSync(__basedir + "/resources/static/st/tmp/" + af.name, af.data
                    );
                  return `Sukses menambahkan File.`;
                });
          }
        
      } catch (error) {
      if (error.code == "LIMIT_FILE_SIZE") {
        return res.send('file terlalu besar');
      }
      console.log(error);
      return res.send(`Error when trying upload File ST: ${error}`);
    }
  }

const downloadFile = async (req, res) => {
  let file = await db.AssignFile.findByPk(req.params.id);
  if (file) {
      var base64data = Buffer.from(file.data).toString('base64');
      let result = {typename: file.type, data: base64data}
      res.send(result);
  } else {
    res.send('file tidak ada');
  }
}

module.exports = {
    uploadFiles,
    downloadFile
  };