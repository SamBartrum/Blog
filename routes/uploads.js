const multer = require('multer')
      config = require('../config')
      filesystem = require("fs");

var storage = multer.diskStorage({
  destination: config.UPLOAD_DIRECTORY,
  filename: function (req, file, cb) {
    console.log(file)
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
exports.getUploads = function(req, res){
                        var files = [];
                        filesystem.readdirSync(config.UPLOAD_DIRECTORY).forEach(function(file) {
                            if(file[0]!='.'){
                                files.push({URI: 'uploads/'+file, name: file})
                            }
                         })
                        res.json({'files': files});
}



module.exports = exports;