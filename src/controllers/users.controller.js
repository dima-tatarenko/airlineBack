// External imps
const bcrypt = require('bcryptjs')

// Internal imps
const UserModel = require('../models/user.model')
const { createToken } = require('../helpers/utils')


const getById = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId)

        const [result] = await UserModel.selectById(Number(userId))
        if (result.length === 0) return res.json({ error: "This user doesn't exist." })

        // const [user] = result
        // There's only one item in this array, therefore we can simply access the first position and retrieve the user.

        res.json(result[0])

    } catch (error) {
        res.json({ error: error.message })
    }
}


const getReservations = async (req, res) => {
    try {
        const { userId } = req.body;

        const [userCheck] = await UserModel.selectById(Number(userId))
        if (userCheck.length === 0) return res.json({ error: "This user doesn't exist." })

        const [result] = await UserModel.selectReservations(Number(userId))

        console.log(result)
        res.json(result)

    } catch (error) {
        res.json({ error: error.message })
    }
}

const createUser = async (req, res) => {
    try {
        // Number 5 for hashSync is how strong encription is and was set low for testing purposes.
        req.body.password = bcrypt.hashSync(req.body.password, 5)

        const [result] = await UserModel.insertUser(req.body)
        const [user] = await UserModel.selectById(result.insertId)

        res.json(user[0])
    } catch (error) {
        res.json({ error: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // Cbeck if mail exists in DB
        const [result] = await UserModel.selectByEmail(email)
        if (result.length === 0) {
            return res.json({ error: 'Username and password don\'t match' })
        }

        // Get the user from DB
        const user = result[0]

        // Check if passwords match
        if (!bcrypt.compareSync(password, user.password)) {
            return res.json({ error: 'Username and password don\'t match' })
        }

        res.json({
            success: 'Happy login is happy.',
            token: createToken(user)
        })





    } catch (error) {
        res.json({ error: error.message })
    }
}



module.exports = { getById, getReservations, createUser, login }