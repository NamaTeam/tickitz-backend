const fromResponse = require("../helpers/fromResponse")
const UserModel = require("../models/User")

const userController = {
    getAllusers: (req, res) => {
        UserModel
          .getAllusers(req)
          .then((result) => {
            res.status(result.statusCode).send(result)
          })
          .catch((err) => {
            res.status(err.statusCode).send(err)
          });
    },

    getUsersById: (req, res) => {
        UserModel
            .getUserById(req.params.id)
            .then((result) => {
                res.status(result.statusCode).send(result)
            })
            .catch((err) => {
                res.status(err.statusCode).send(err)
            })
    },

    deleteUserById: (req, res) => {
        UserModel
            .deleteUserById(req.params.id)
            .then((result) => {
                res.status(result.statusCode).send(result)
            })
            .catch((err) => {
                res.status(err.statusCode).send(err)
            })
    },

    addNewUsers: (req, res) => {
        console.log(req)
        UserModel
            .addNewUsers(req)
            .then((result) => {
                res.status(result.statusCode).send(result)
            })
            .catch((err) => {
                res.status(err.statusCode).send(err)
            })
    },

    updateUser: (req, res) => {
        UserModel
            .updateUser(req)
            .then((result) => {
                res.status(result.statusCode).send(result)
            })
            .catch((err) => {
                res.status(err.statusCode).send(err)
            })
    }
}

module.exports = userController