const FlightModel = require('../models/flight.model')

const getById = async (req, res) => {
    try {
        const { flightId } = req.params;

        const [result] = await FlightModel.selectById(Number(flightId))
        if (result.length === 0) return res.json({ error: "This flight doesn't exist." })

        res.json(result[0])

    } catch (error) {
        res.json({ error: error.message })
    }
}

const createFlight = async (req, res) => {
    try {
        const [result] = await FlightModel.insertFlight(req.body)
        const [flight] = await FlightModel.selectById(result.insertId)

        res.json(flight[0])
    } catch (error) {
        res.json({ error: error.message })
    }
}



module.exports = { getById, createFlight }