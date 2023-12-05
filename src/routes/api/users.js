// External imps
const router = require('express').Router()

// Internal imps
const usersCtrl = require('../../controllers/users.controller')


// Get
router.get('/userId', usersCtrl.getById)

// Post
router.post('/', usersCtrl.createUser)


module.exports = router