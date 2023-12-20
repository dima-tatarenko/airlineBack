// External imps
const router = require('express').Router()

// Internal imps
const airportsCtrl = require('../../controllers/airports.controller')
const { checkToken, checkAdmin } = require('../../helpers/middlewares')


// Get
router.get('/', airportsCtrl.getAll)
router.get('/:airportId', airportsCtrl.getById)

// Post
router.post('/', checkToken, checkAdmin, airportsCtrl.createAirport)

// Put
router.put('/:airportId', checkToken, checkAdmin, airportsCtrl.editAirportById)



// Mass inserts - Back-end only
router.post('/createairports', airportsCtrl.massAirports)

module.exports = router