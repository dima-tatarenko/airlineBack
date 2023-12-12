const dayjs = require('dayjs')
const jwt = require('jsonwebtoken')

const createToken = (user) => {
    const payload = {
        user_id: user.user_id,
        user_role: user.user_role,
        exp: dayjs().add(2, 'minutes').unix()
    }
    return jwt.sign(payload, process.env.SECRET_KEY)
}

module.exports = { createToken }