const fromResponse = require("../helpers/fromResponse")
const UserModel = require("../models/User")

const userController = {
    getAllUsers:(req,res)=>{
        UserModel
        .getAllUsers(req)
        .then((result)=>{
            res.status(result.statusCode).send(result)
        })
        .catch((err)=>{
            res.status(err.statusCode).send(err)
        })
    },

    getUsersById:(req, res) =>{
        UserModel
        .getUserById(req.params.id)
        .then((result)=>{
            res.status(result.statusCode).send(result)
        })
        .catch((err)=>{
            res.status(err.statusCode).send(err)
        })
    },

    deleteUserById:(req, res)=>{
        UserModel
        .deleteUserById(req.params.id)
        .then((result)=>{
            res.status(result.statusCode).send(result)
        })
        .catch((err)=>{
            res.status(err.statusCode).send(err)
        })
    },

    addNewUsers:(request , res)=>{
        UserModel
        .addNewUsers(request)
        .then((result)=>{
            res.status(result.statusCode).send(result)
        })
        .catch((err)=>{
            res.status(err.statusCode).send(err)
        })
    },

    updateUser:(request , res)=>{
        UserModel
        .updateUser(request)
        .then((result)=>{
            res.status(result.statusCode).send(result)
        })
        .catch((err)=>{
            res.status(err.statusCode).send(err)
        })
    }
}

module.exports=userController