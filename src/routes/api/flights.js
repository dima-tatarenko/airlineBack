// External imps
const router = require('express').Router()

// Internal imps
const flightsCtrl = require('../../controllers/flights.controller')


// Get
router.get('/:flightId', flightsCtrl.getById)

// Post
router.post('/', flightsCtrl.createFlight)


module.exports = router