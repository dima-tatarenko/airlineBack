const AirportModel = require('../models/airport.model')

const getAll = async (req, res) => {
    try {
        const [result] = await AirportModel.selectAll()
        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
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



// AUXILIARY STUFF FOR TESTING

const massAirports = async (req, res) => {
    try {
        const arrAirports = [
            {
                "name": "Tokyo Haneda Airport",
                "name_acr": "HND",
                "city": "Tokyo",
                "city_acr": "TYO",
                "country": "Japan",
                "country_acr": "JP",
                "terminals": 4,
                "gates": 115,
                "img": "https://example.com/haneda_airport_image.jpg"
            },
            {
                "name": "Dubai International Airport",
                "name_acr": "DXB",
                "city": "Dubai",
                "city_acr": "DXB",
                "country": "United Arab Emirates",
                "country_acr": "AE",
                "terminals": 3,
                "gates": 200,
                "img": "https://example.com/dubai_airport_image.jpg"
            }
        ]

        for (let airport of arrAirports) {
            req.body.name = airport.name
            req.body.name_acr = airport.name_acr
            req.body.city = airport.city
            req.body.city_acr = airport.city_acr
            req.body.country = airport.country
            req.body.country_acr = airport.country_acr
            req.body.terminals = airport.terminals
            req.body.gates = airport.gates
            req.body.img = airport.img
            await AirportModel.insertAirport(req.body)

        }


        res.json("Meow created many airports today! Can sleep for 17 hours meow!")
    } catch (error) {
        res.json({ error: error.message })
    }
}


module.exports = { getById, createAirport, getAll, massAirports }