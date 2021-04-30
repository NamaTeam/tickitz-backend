const route=require('express').Router()
const userController= require('../controllers/User')
const fromUpload = require('../helpers/fromUpload')

route.post('/',fromUpload.uploadImage, userController.addNewUsers)

route.get('/', userController.getAllUsers)

route.get('/:id', userController.getUsersById)

route.delete('/:id', userController.deleteUserById)


module.exports=route