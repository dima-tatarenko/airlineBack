// External imps
const router = require('express').Router()

// Internal imps
const flightsCtrl = require('../../controllers/flights.controller')
const { checkToken, checkAdmin } = require('../../helpers/middlewares')


// Get
router.get('/', flightsCtrl.getAll)
router.get('/:flightId', flightsCtrl.getById)


// Post
router.post('/', checkToken, checkAdmin, flightsCtrl.createFlight)
router.post('/search', flightsCtrl.getFullSearch)
router.post('/book', flightsCtrl.bookFlight)
router.post('/seat', flightsCtrl.bookSeat)

// Put
router.put('/:flightId', checkToken, checkAdmin, flightsCtrl.editFlightById)



// Mass inserts - Back-end only
router.post('/createseats', flightsCtrl.massSeats)
router.post('/createflights', flightsCtrl.massFlights)


module.exports = router