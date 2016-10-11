const multer = require('multer')

var storage = multer.diskStorage({
                destination: '../public/static/uploads/',
                filename: function ( req, file, cb ) {
                    cb( null, file.originalname );
                }
            });

const uploading = multer({ storage: storage });

module.exports = {

    uploadFile: {options: uploading.single('media'),
                 method: function(req, res, next){
                        res.status(204).end()}
                }
}



