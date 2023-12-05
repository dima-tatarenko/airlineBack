const AirportModel = require('../models/airport.model')

const getById = async (req, res) => {
    try {
        const { airportId } = req.params;

        const [result] = await AirportModel.selectById(Number(airportId))
        if (result.length === 0) return res.json({ error: "This airport doesn't exist." })

        res.json(result[0])

    } catch (error) {
        res.json({ error: error.message })
    }
}

const createAirport = async (req, res) => {
    try {
        const [result] = await AirportModel.insertAirport(req.body)
        const [airport] = await AirportModel.selectById(result.insertId)

        res.json(airport[0])
    } catch (error) {
        res.json({ error: error.message })
    }
}



module.exports = { getById, createAirport }