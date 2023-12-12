const FlightModel = require('../models/flight.model')
const AirportModel = require('../models/airport.model')

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
        const { origin, destination, departure } = req.body;

        let originArr = origin.split('-')
        let destinationArr = destination.split('-')
        let origin_acr = originArr[1]
        let destination_acr = destinationArr[1]
        let origin_city = originArr[0]
        let destination_city = destinationArr[0]

        if (origin_acr !== "All" && destination_acr === "All") {
            const [origin_airport] = await AirportModel.selectByAcr(origin_acr)
            const origin_id = origin_airport[0].id
            const [result] = await FlightModel.selectOneToAll(Number(origin_id), destination_city, departure)

            return res.json(result)
        }

        if (origin_acr === "All" && destination_acr !== "All") {
            const [destination_airport] = await AirportModel.selectByAcr(destination_acr)
            const destination_id = destination_airport[0].id
            const [result] = await FlightModel.selectAllToOne(origin_city, Number(destination_id), departure)

            return res.json(result)
        }

        if (origin_acr !== "All") {
            const [origin_airport] = await AirportModel.selectByAcr(origin_acr)
            const origin_id = origin_airport[0].id
            const [destination_airport] = await AirportModel.selectByAcr(destination_acr)
            const destination_id = destination_airport[0].id

            const [result] = await FlightModel.selectOneToOne(Number(origin_id), Number(destination_id), departure)

            return res.json(result)
        }

        const [result] = await FlightModel.selectAllToAll(origin_city, destination_city, departure)
        res.json(result)

    } catch (error) {
        res.json({ error: error.message })
    }
}

// const getFullSearch = async (req, res) => {
//     try {
//         const { origin, destination, departure } = req.body;

//         if (origin_acr !== "ALL") {
//             const [origin] = await AirportModel.selectByAcr(origin_acr)
//             const origin_id = origin[0].id
//             const [destination] = await AirportModel.selectByAcr(destination_acr)
//             const destination_id = destination[0].id

//             const [result] = await FlightModel.selectFullSearch(Number(origin_id), Number(destination_id), departure)

//             return res.json(result)
//         }

//         const [result] = await FlightModel.selectCitySearch(origin_city, destination_city, departure)
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

// DELETE WHEN CLEANING Code for full search by origin and destination ID. Currently unused.

// const getFullSearch = async (req, res) => {
//     try {
//         console.log(req.body)
//         const { origin_id, destination_id, departure } = req.body;

//         const [result] = await FlightModel.selectFullSearch(Number(origin_id), Number(destination_id), departure)
//         

//         res.json(result)

//     } catch (error) {
//         res.json({ error: error.message })
//     }
// }



module.exports = { getAll, getById, createFlight, getFullSearch }