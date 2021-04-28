const route=require('express').Router()
const userController= require('../controllers/User')

route.get('/:id', userController.getUsersById)

module.exports=route