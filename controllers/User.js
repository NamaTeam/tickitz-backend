const fromResponse = require("../helpers/fromResponse")
const UserModel = require("../models/User")

const userController = {
    getAllUser:(req,res)=>{
        UserModel
        .getAllUsers(req)
        .then((result)=>{
            fromResponse(result, res)
        })
        .catch((err)=>{
            fromResponse(err, res)
        })
    },

    getUsersById:(req, res) =>{
        UserModel
        .getUserById(req.params.id)
        .then((result)=>{
            fromResponse(result, res)
        })
        .catch((err)=>{
            fromResponse(err)
        })
    },

    deleteUserById:(req, res)=>{
        UserModel
        .deleteUserById(req.params.id)
        .then((result)=>{
            fromResponse(result, res)
        })
        .catch((err)=>{
            fromResponse(err, res)
        })
    },

    addUsers:(req , res)=>{
        console.log(req, 'ini controller')
        UserModel
        .addUsers(req)
        .then((result)=>{
            fromResponse(result, res)
        })
        .catch((err)=>{
            fromResponse(err, res)
        })
    }
}

module.exports=userController