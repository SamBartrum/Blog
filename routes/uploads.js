const multer = require('multer')
      config = require('../config')

var storage = multer.diskStorage({
  destination: config.UPLOAD_DIRECTORY,
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage});

exports = {};

exports.uploadFile = {options: upload.single('media'),
                      method: function(req, res, next){
                        res.json({'success': true})
                        }
                      }


module.exports = exports;