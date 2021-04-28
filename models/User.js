const pg = require("../helpers/connect_db")

const UserModel = {
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
}

module.exports=UserModel