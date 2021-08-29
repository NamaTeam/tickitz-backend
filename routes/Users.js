const route=require('express').Router()
const userController= require('../controllers/User')
const fromUpload = require('../helpers/fromUpload')
// const verifyToken = require('../helpers/verifyToken')

route.post('/',fromUpload.uploadImage, userController.addNewUsers)

route.patch('/:id',fromUpload.uploadImage, userController.updateUser) 

route.get('/:id', userController.getUsersById)

route.get('/',  userController.getAllusers)

route.delete('/:id', userController.deleteUserById)


module.exports=route