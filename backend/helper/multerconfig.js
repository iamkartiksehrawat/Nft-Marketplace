const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads/");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only images are allowed"));
  }
};

module.exports = multer({
  storage: imgconfig,
  fileFilter: isImage,
});
