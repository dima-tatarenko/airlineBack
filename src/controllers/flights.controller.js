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
        const arrResults = []

        const { origin, destination, departure } = req.body;

        let originArr = origin.split('-')
        let destinationArr = destination.split('-')
        let origin_acr = originArr[1]
        let destination_acr = destinationArr[1]
        let origin_city = originArr[0]
        let destination_city = destinationArr[0]

        const [origin_airport] = await AirportModel.selectByAcr(origin_acr)
        const origin_id = origin_airport[0].id
        const [destination_airport] = await AirportModel.selectByAcr(destination_acr)
        const destination_id = destination_airport[0].id


        if (origin_acr !== "All" && destination_acr === "All") {

            const [outboundFlight] = await FlightModel.selectOneToAll(Number(origin_id), destination_city, departure)
            const [returnFlight] = await FlightModel.selectAllToOne(destination_city, Number(origin_id), departure)

            arrResults.push(outboundFlight)
            arrResults.push(returnFlight)

            res.json(arrResults)
        }

        if (origin_acr === "All" && destination_acr !== "All") {

            const [outboundFlight] = await FlightModel.selectAllToOne(origin_city, Number(destination_id), departure)
            const [returnFlight] = await FlightModel.selectOneToAll(Number(destination_id), origin_city, departure)

            arrResults.push(outboundFlight)
            arrResults.push(returnFlight)

            res.json(arrResults)
        }

        if (origin_acr !== "All") {
            const [origin_airport] = await AirportModel.selectByAcr(origin_acr)
            const origin_id = origin_airport[0].id
            const [destination_airport] = await AirportModel.selectByAcr(destination_acr)
            const destination_id = destination_airport[0].id

            const [outboundFlight] = await FlightModel.selectOneToOne(Number(origin_id), Number(destination_id), departure)
            const [returnFlight] = await FlightModel.selectOneToOne(Number(destination_id), Number(origin_id), departure)

            arrResults.push(outboundFlight)
            arrResults.push(returnFlight)

            res.json(arrResults)
        }

        const [outboundFlight] = await FlightModel.selectAllToAll(origin_city, destination_city, departure)
        const [returnFlight] = await FlightModel.selectAllToAll(destination_city, origin_city, departure)

        arrResults.push(outboundFlight)
        arrResults.push(returnFlight)

        // In case they REEEALLY don't wanna go back.
        // if (cosacheck = true) {
        //     arrResults.delete[1]
        // }

        res.json(arrResults)

    } catch (error) {
        res.json({ error: error.message })
    }
}


// WORKING FULL SEARCH
// const getFullSearch = async (req, res) => {
//     try {
//         const { origin, destination, departure } = req.body;

//         let originArr = origin.split('-')
//         let destinationArr = destination.split('-')
//         let origin_acr = originArr[1]
//         let destination_acr = destinationArr[1]
//         let origin_city = originArr[0]
//         let destination_city = destinationArr[0]

//         if (origin_acr !== "All" && destination_acr === "All") {
//             const [origin_airport] = await AirportModel.selectByAcr(origin_acr)
//             const origin_id = origin_airport[0].id
//             const [result] = await FlightModel.selectOneToAll(Number(origin_id), destination_city, departure)

//             return res.json(result)
//         }

//         if (origin_acr === "All" && destination_acr !== "All") {
//             const [destination_airport] = await AirportModel.selectByAcr(destination_acr)
//             const destination_id = destination_airport[0].id
//             const [result] = await FlightModel.selectAllToOne(origin_city, Number(destination_id), departure)

//             return res.json(result)
//         }

//         if (origin_acr !== "All") {
//             const [origin_airport] = await AirportModel.selectByAcr(origin_acr)
//             const origin_id = origin_airport[0].id
//             const [destination_airport] = await AirportModel.selectByAcr(destination_acr)
//             const destination_id = destination_airport[0].id

//             const [result] = await FlightModel.selectOneToOne(Number(origin_id), Number(destination_id), departure)

//             return res.json(result)
//         }

//         const [result] = await FlightModel.selectAllToAll(origin_city, destination_city, departure)
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