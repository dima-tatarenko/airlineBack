const AirportModel = require('../models/airport.model')

const getAll = async (req, res) => {
    try {
        const [result] = await AirportModel.selectAll()

        console.log(result)
        res.json(result)
    } catch (error) {

    }
}

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






// const getAll GET ALL CITIES / BY CITY / ALPHABETIZED

// const getByCity = async (req, res) => {
//     try {
//         const { origin_city_abr } = req.params;
//         const { destination_city_abr } = req.params;

//         const [result] = await AirportModel.selectByCity(origin_city_abr, destination_city_abr)
//         // if (result.length === 0) return res.json({ error: "This airport doesn't exist." })

//         res.json(result)

//     } catch (error) {
//         res.json({ error: error.message })
//     }
// }

const createAirport = async (req, res) => {
    try {
        const [result] = await AirportModel.insertAirport(req.body)
        const [airport] = await AirportModel.selectById(result.insertId)

        res.json(airport[0])
    } catch (error) {
        res.json({ error: error.message })
    }
}



module.exports = { getById, createAirport, getAll }