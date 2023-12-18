// External imps
const router = require('express').Router()

//Internal imps
//ADD MIDDLEWARES!


// USERS
router.use('/users', require('./api/users'))


// FLIGHTS
router.use('/flights', require('./api/flights'))



// AIRPORTS
router.use('/airports', require('./api/airports'))


// Emails
router.use('/emails', require('./api/emails'))






module.exports = router