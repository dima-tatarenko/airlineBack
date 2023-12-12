// External imps
const router = require('express').Router()

// Internal imps
const usersCtrl = require('../../controllers/users.controller')


// Get
router.get('/:userId', usersCtrl.getById)

// Post
router.post('/', usersCtrl.createUser)
router.post('/login', usersCtrl.login)


module.exports = router