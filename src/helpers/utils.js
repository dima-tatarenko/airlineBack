const dayjs = require('dayjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const createToken = (user) => {
    const payload = {
        user_id: user.id,
        access_level: user.access_level,
        exp: dayjs().add(2, 'years').unix()
    }
    return jwt.sign(payload, process.env.SECRET_KEY)
}

const getTransporter = () => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "flightifyairlines@gmail.com",
            pass: "",
        },
    });
    return transporter
}

module.exports = { createToken, getTransporter }