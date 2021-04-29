const bcrypt = require('bcrypt')
const pg = require("../helpers/connect_db")

const UserModel = {
    getAllUsers: (req) =>{
        return new Promise((resolve, reject)=>{
            pg.query(`SELECT id,email,username,first_name,last_name,phone,photo FROM users `, (err, result)=>{
                if(!err){
                    resolve({
                        message:`get all users succsess`,
                        statusCode:200,
                        data:result.rows[0]
                    });
                }else{
                    reject({
                        message:`get all users failed`,
                        statusCode:500,
                        data:{},
                    })
                }
            })
        })
    },

    getUserById: (req) =>{
        console.log(req)
        return new Promise((resolve, reject)=>{
            pg.query(`SELECT id,email,username,first_name,last_name,phone,photo FROM users WHERE id=${parseInt(req)}`, (err, result)=>{
                console.log(err,"ini errornya ")
                if(!err){
                    resolve({
                        message:`get users succsess`,
                        statusCode:200,
                        data:result.rows[0]
                    });
                }else{
                    reject({
                        message:`get users failed`,
                        statusCode:500,
                        data:{},
                    })
                }
            })
        })
    },

    deleteUserById: (req) => {
        return new Promise((resolve, reject)=>{
            pg.query(`DELETE FROM users WHERE id='${parseInt(req)}'` , (err)=>{
                if(!err) {
                    resolve({
                        message:`Delete users failed`,
                        statusCode:200,
                    })
                }else{
                    reject({
                        message:`Delete users failed`,
                        statusCode: 400,
                    })
                }
                })
            })
        },

        addUsers: (req)=>{
            console.log(req.body,'ini dari model')
            return new Promise((resolve, reject)=>{
                const {email, password, first_name, last_name, username, phone,role} = req.body
                const photo =req.file.filename
                pg.query(`SELECT * FROM users WHERE email='${email}'`,(err, result)=>{
                    console.log(err,'ini error dari model')
                    if(!err){
                        if(email == result.rows[0]?.email) { 
                            reject({
                                message: `email exsist`,
                                statusCode: 400,
                            })
                        } else{
                            if (password == null){
                                reject({
                                    message:`password is required`,
                                    statusCode:400,
                                })
                        }else{
                            bcrypt.hash(password, 10, function(err, hash) {
                            console.log(hash, 'ini hash')
                            pg.query(`INSERT INTO users(email,password=, first_name, last_name,username,photo,phone,role,created_at ) 
                            VALUES ('${email}','${hash}', '${first_name}', '${last_name}', '${username}','/upload/photo/${photo}', '${phone}', '${role}','now()')`, (err)=>{
                                console.log(err,'ini dari messegae')
                                if(!err){
                                    resolve({
                                        message:`add user succsess`,
                                        statusCode: 201,
                                        data:{},
                                    })
                                }else{
                                    reject({
                                        message:`Add users failed`,
                                        statusCode: 500,
                                        data:{},
                                    })
                                }
                            })
                        });
                        }
                    }
                    }
                })
            })
        },

    }
module.exports=UserModel