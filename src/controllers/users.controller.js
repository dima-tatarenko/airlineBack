const UserModel = require('../models/user.model')

const getById = (req,res) => {
    res.end('Meow')
}

const createUser = async (req,res) => {
    try {
        const [result] = await UserModel.insertUser(req.body)
        // Need get by ID to get client data and show it once a client has been created!
        // stopped to commit

        res.json(client[0])
    } catch(error) {

    }
    



    res.end('A user was created.')
}



module.exports = {getById, createUser}