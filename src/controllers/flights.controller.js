const FlightModel = require('../models/flight.model')

const getAll = async (req, res) => {
    try {
        const [result] = await FlightModel.selectAll()

        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }
}

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


const getFullSearch = async (req, res) => {
    try {
        console.log(req.body)
        const { origin_id, destination_id, departure } = req.body;

        const [result] = await FlightModel.selectFullSearch(Number(origin_id), Number(destination_id), departure)
        // if (result.length === 0) return res.json({ error: "This flight doesn't exist." })

        res.json(result)

    } catch (error) {
        res.json({ error: error.message })
    }
}


// const getByCities = async (req, res) => {
//     try {
//         const { originId, destinationId } = req.params;

//         const [result] = await FlightModel.selectByCities(Number(originId), Number(destinationId))
//         // if (result.length === 0) return res.json({ error: "This flight doesn't exist." })

//         res.json(result)

//     } catch (error) {
//         res.json({ error: error.message })
//     }
// }

const createFlight = async (req, res) => {
    try {
        const [result] = await FlightModel.insertFlight(req.body)
        const [flight] = await FlightModel.selectById(result.insertId)

        res.json(flight[0])
    } catch (error) {
        res.json({ error: error.message })
    }
}



module.exports = { getAll, getById, createFlight, getFullSearch }