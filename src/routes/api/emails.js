// External imps
const router = require('express').Router()

// Internal imps
const emailsCtrl = require('../../controllers/emails.controller')
const { checkToken } = require('../../helpers/middlewares')


// Get
// Example:
// router.get('/', checkToken, usersCtrl.getLoggedUser)

// Post
router.post('/flight-update', emailsCtrl.notifyFlightUpdates)

// Examples:
// router.post('/', usersCtrl.createUser)
// router.post('/reservations', checkToken, usersCtrl.getReservations)
// router.post('/reservations/:userId', checkToken, usersCtrl.getReservationsById)
// router.post('/login', usersCtrl.login)

// // Put
// Example:
// router.put('/:userId', checkToken, usersCtrl.editUserById)

module.exports = router