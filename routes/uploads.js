const multer = require('multer')

var storage = multer.diskStorage({
                destination: config.UPLOAD_DIRECTORY,
                filename: function ( req, file, cb ) {
                    cb( null, file.originalname );
                }
            });

const uploading = multer({ storage: storage });

exports = {};

exports.uploadFile = {options: uploading.single('media'),
                      method: function(req, res, next){
                        res.status(204).end()}
                      }


module.exports = exports;