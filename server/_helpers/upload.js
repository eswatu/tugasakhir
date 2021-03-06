const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-aspen-${file.originalname}`);
  },
});
const maxImageSize = 2 * 1024 * 1024;
const maxSize = maxImageSize * 5;
var uploadImage = multer({ storage: storage, fileFilter: imageFilter, limits: {fileSize : maxImageSize} });
var uploadFile = multer({ storage: storage, limits: {fileSize : maxSize} });

module.exports = {
  uploadFile,
  uploadImage
};