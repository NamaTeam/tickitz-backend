const multer = require('multer')

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
                res.status(400).send({
                    message:err.message,
                    statusCode:400,
                })
            }else if(err){
                res.status(400).send({
                    message:err.message,
                    statusCode:400,
                })
            }else{
                next()
            }
        })
    }
}

module.exports=fromUpload