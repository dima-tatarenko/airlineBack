// External imps
const router = require('express').Router()

// Internal imps
const usersCtrl = require('../../controllers/users.controller')
const { checkToken } = require('../../helpers/middlewares')


// Get
router.get('/', checkToken, usersCtrl.getLoggedUser)

// Post
router.post('/', usersCtrl.createUser)
router.post('/reservations', usersCtrl.getReservations)
router.post('/login', usersCtrl.login)

// Put
router.put('/:userId', checkToken, usersCtrl.editUserById)

module.exports = router