const express = require("express");
const multer = require("multer");
const path = require("path")

let storagePhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/photo");
  },
  filename: function (req, file, cb) {
    let datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
}
});

let storageLogo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/logos");
  },
  filename: function (req, file, cb) {
    let datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
}
});

let storagePoster = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/poster");
  },
  filename: function (req, file, cb) {
    let datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
}
})

let uploadImg =multer({
  storage: storagePhoto,
  fileFilter: function(req,file, cb){
    let ext =pat(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Only images are allowed'))
        }
        cb(null, true)
    },
    limits:{
        fileSize: 5000000,
    }
})

let uploadL =multer({
  storage: storageLogo,
  fileFilter: function(req,file, cb){
    let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Only images are allowed'))
        }
        cb(null, true)
    },
    limits:{
        fileSize: 5000000,
    }
})

let uploadP =multer({
  storage: storagePoster,
  fileFilter: function(req,file, cb){
    let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Only images are allowed'))
        }
        cb(null, true)
    },
    limits:{
        fileSize: 5000000,
    }
})

const fromUpload = {
  uploadImage: (req, res, next) => {
    const uploadImage = uploadImg.single("photo");
    uploadImage(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (err) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (req.file == undefined) {
        next();
      } else {
        next();
      }
    });
  },

  uploadLogo: (req, res, next) => {
    const uploadLogo = uploadL.single("logo");
    uploadLogo(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (err) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (req.file === undefined) {
        next();
      } else {
        next();
      }
    });
  },

  uploadPoster: (req, res, next) => {
    const uploadPoster = uploadP.single("poster")
    uploadPoster(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (err) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (req.file === undefined) {
        next();
      } else {
        next();
      }
    });
  },
};

module.exports = fromUpload;
