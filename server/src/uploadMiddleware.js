
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

const storage = multer.diskStorage({
  destination: '../imgsDen',
  filename: function (req, file, cb) {
    const arquivoUnico = uuid.v4() + path.extname(file.originalname);
    cb(null, arquivoUnico);
  },
});

const upload = multer({ storage });

module.exports = upload;