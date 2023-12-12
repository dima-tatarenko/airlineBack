const dayjs = require('dayjs')
const jwt = require('jsonwebtoken')

const createToken = (user) => {
    const payload = {
        user_id: user.id,
        access_level: user.access_level,
        exp: dayjs().add(2, 'years').unix()
    }
    return jwt.sign(payload, process.env.SECRET_KEY)
}

module.exports = { createToken }