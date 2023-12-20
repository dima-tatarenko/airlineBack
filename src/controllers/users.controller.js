// External imps
const bcrypt = require('bcryptjs')

// Internal imps
const UserModel = require('../models/user.model')
const { createToken } = require('../helpers/utils')
const userData = require('../autofill/users.json')


const getLoggedUser = async (req, res) => {
    console.log(req.user)

    res.json(req.user)

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

const getReservationsById = async (req, res) => {

    try {
        const { userId } = req.params;
        const flightIds = req.body;

        const arrReservations = []

        for (let i = 0; i < 2; i++) {
            let [result] = await UserModel.selectReservationsById(Number(userId), Number(flightIds[i]))
            arrReservations.push(result)
        }

        console.log(arrReservations)
        res.json(arrReservations)

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


const editUserById = async (req, res) => {
    const { userId } = req.params
    await UserModel.updateById(userId, req.body)

    const [editedUser] = await UserModel.selectById(userId)
    res.json(editedUser[0])

}




const massUsers = async (req, res) => {
    addedUsersArr = []
    for (let user of userData) {
        try {
            // Number 5 for hashSync is how strong encription is and was set low for testing purposes.
            user.password = bcrypt.hashSync(user.password, 5)

            addedUsersArr.push(user)
            await UserModel.insertUser(user)

        } catch (error) {
            res.json({ error: error.message })
        }
    }

    res.json(addedUsersArr)

}


module.exports = { getLoggedUser, getReservations, getReservationsById, createUser, login, editUserById, massUsers }