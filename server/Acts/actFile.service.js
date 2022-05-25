const fs = require("fs");
const db = require("../_helpers/db");
//need update
const uploadFiles = async (req, res) => {
    try {
          if (req.file == undefined) {
            return res.send(`You must select a file.`);
          }
          console.log('isi dari assign file' + JSON.stringify(req.params.id));
          let upldFile = fs.readFileSync(__basedir + "/resources/static/assets/uploads/" + req.file.filename);
          let uid = parseInt(req.params.id);
            //Tambah File
            db.ActFile.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: upldFile,
            notes: req.body.notes,
            createdAt: new Date(),
            updatedAt: new Date(),
            ActId: uid
            });
            fs.writeFileSync(__basedir + "/resources/static/assets/tmp/" + af.name, af.data);
            return `Sukses menambahkan File.`;
      } catch (error) {
      if (error.code == "LIMIT_FILE_SIZE") {
        return res.send('file terlalu besar');
      }
      console.log(error);
      return res.send(`Error when trying upload File ST: ${error}`);
    }
  }
const deleteFile = async(req,res) => {
  let uid = parseInt(req.params.id);
  let file = await db.ActFile.findByPk(uid);
  file.destroy();
  await db.ActFile.save();
  return "Berhasil menghapus file";
}
const downloadFile = async (req, res) => {
  let uid = parseInt(req.params.id);
  const file = await db.ActFile.scope('withData').findByPk(uid);
  console.log(file.name);
  if (file) {
    let pathQ = String(__basedir + "/resources/static/assets/download/" + file.name);
    fs.writeFileSync(pathQ, file.data);
    let dwnFile = pathQ;
    res.download(dwnFile, file.name);
    fs.rm(pathQ, {force: true}, (err) => {
      if(err){
          // File deletion failed
          console.error(err.message);
          return;
      }
      console.log("File deleted successfully");
  });
  } else {
    res.send('file tidak ada');
  }
}
const getdocument = async (req, res) => {
  let uid = parseInt(req.params.id);
  const datadoc = await db.ActFile.unscoped().findOne({ where: {id: uid}});
  console.log(datadoc);
  if (datadoc) {
    res.type('application/octet-stream').send(datadoc.data);
  }
}

const getFiles = async (req, res) => {
  const filelist = await db.ActFile.findOne({where: { ActId: req.params.id}});
  res.send(filelist);
}

module.exports = {
    uploadFiles,
    getdocument,
    downloadFile,
    getFiles,
    deleteFile
  };