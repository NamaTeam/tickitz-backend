

const queryUser = {
    getAllUsers: () => {
        const query = `SELECT id,email,username,first_name,last_name,phone,photo FROM users`;
        return query
    },

    getUserById: (request) => {
        const id = request
        const getUserbyid = `SELECT id,email,username,first_name,last_name,phone,photo FROM users WHERE id=${parseInt(id)}`


        return getUserbyid
    },

    addNewUser: (request) => {
        const { email } = request
        const addNewUsers = `SELECT * FROM users WHERE email='${email}'`

        return addNewUsers


    },

    deleteUserById: (request) => {
        const { id } = request
        const deleteUserById = `DELETE FROM users WHERE id='${id}'`

        return deleteUserById
    }

}

module.exports = queryUser