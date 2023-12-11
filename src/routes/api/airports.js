// External imps
const router = require('express').Router()

// Internal imps
const airportsCtrl = require('../../controllers/airports.controller')


// Get
router.get('/', airportsCtrl.getAll)
router.get('/:airportId', airportsCtrl.getById)

// Post
router.post('/', airportsCtrl.createAirport)


module.exports = router