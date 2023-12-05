const UserModel = require('../models/user.model')

const getById = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId)

        const [result] = await UserModel.selectById(Number(userId))
        if (result.length === 0) return res.json({ error: "This user doesn't exist." })

        // const [user] = result
        // There's only one item in this array, therefore we can simply access the first position and retrieve the user.

        console.log('Meow. You found a user. Why you snoopin\' around?')
        console.log(result[0])
        res.json(result[0])

    } catch (error) {
        res.json({ error: error.message })
    }
}

const createUser = async (req, res) => {
    try {
        const [result] = await UserModel.insertUser(req.body)
        const [user] = await UserModel.selectById(result.insertId)

        console.log('Meow. You created a user.')
        console.log(user[0])
        res.json(user[0])
    } catch (error) {
        res.json({ error: error.message })
    }
}



module.exports = { getById, createUser }