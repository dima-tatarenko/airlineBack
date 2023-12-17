const jwt = require('jsonwebtoken')

const UserModel = require('../models/user.model')

const checkToken = async (req, res, next) => {
    console.log('Middleware - token check')

    if (!req.headers.authorization) {
        return res.json({ error: 'Authorization token required to perform this action.' })
    }

    const token = req.headers.authorization

    let payload; // contains user_id, user_level
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY)

    } catch (error) {
        return res.json({ error: error.message })
    }

    const [result] = await UserModel.selectById(payload.user_id)
    // CRUCIAL! VERY IMPORTANT! DO NOT FORGET THE NEXT LINE FOR :)
    req.user = result[0]
    console.log(`Action performed by: ${req.user.first_name} ${req.user.last_name} (${req.user.access_level})`)


    next()
}

const checkAdmin = (req, res, next) => {
    console.log('Middleware - admin check')

    if (req.user.access_level !== 'admin') {
        console.log('Regular user tried to access admin panel.')
        return res.json({ error: 'This user doesn\'t have admin access.' })
    }

    next()

}

module.exports = { checkToken, checkAdmin }