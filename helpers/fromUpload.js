const multer = require('multer')
const fromResponse = require('./fromResponse')

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/upload/photo')
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

let limits= {
    filesize: 5000000
}
let upload = multer({storage, limits})

const fromUpload={
    uploadImage:(req, res, next) =>{
        const uploadImage=upload.single('photo')
        uploadImage(req,res,(err)=>{
            if(err instanceof multer.MulterError){
                fromResponse({
                    message:err.message,
                    statusCode:400,
                }, res)
            }else if(err){
                fromResponse({
                    message:err.message,
                    statusCode:400,
                }, res)
            }else{
                next()
            }
        })
    }
}

module.exports=fromUpload