const fromResponse = require("../helpers/fromResponse")
const UserModel = require("../models/User")

const userController = {
    getUsersById:(req, res) =>{
        UserModel
        .getUserById(req.params.id)
        .then((result)=>{
            fromResponse(result, res)
        })
        .catch((err)=>{
            fromResponse(err)
        })
    }
}

module.exports=userController