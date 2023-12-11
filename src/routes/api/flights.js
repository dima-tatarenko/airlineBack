// External imps
const router = require('express').Router()

// Internal imps
const flightsCtrl = require('../../controllers/flights.controller')


// Get
router.get('/', flightsCtrl.getAll)
router.get('/:flightId', flightsCtrl.getById)


// Post
router.post('/', flightsCtrl.createFlight)
router.post('/search', flightsCtrl.getFullSearch)


module.exports = router