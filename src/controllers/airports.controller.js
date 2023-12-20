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

const createAirport = async (req, res) => {
    try {
        const [result] = await AirportModel.insertAirport(req.body)
        const [airport] = await AirportModel.selectById(result.insertId)

        res.json(airport[0])
    } catch (error) {
        res.json({ error: error.message })
    }
}

const editAirportById = async (req, res) => {
    const { airportId } = req.params
    await AirportModel.updateById(airportId, req.body)

    const [editedAirport] = await AirportModel.selectById(airportId)
    res.json(editedAirport[0])

}



// AUXILIARY STUFF FOR TESTING

// If a city has more than one airport, a copy with "All" as acronym must be added.
// See examples at the very bottom of JSON list. (Paris or London)

const massAirports = async (req, res) => {
    try {
        const arrAirports = [
            {
                "name": "Portland International Airport",
                "name_acr": "PDX",
                "city": "Portland",
                "city_acr": "PDX",
                "country": "United States",
                "country_acr": "US",
                "terminals": 5,
                "gates": 90,
                "img": "https://i.insider.com/5f89aa6ad260780019341cd4?width=1200&format=jpeg"
            },
            {
                "name": "Los Angeles International Airport",
                "name_acr": "LAX",
                "city": "Los Angeles",
                "city_acr": "LAX",
                "country": "United States",
                "country_acr": "US",
                "terminals": 9,
                "gates": 133,
                "img": "https://a.cdn-hotels.com/gdcs/production43/d1021/7c10664e-8eb2-40aa-8ee5-09b8aa6ed8f0.jpg"
            },
            {
                "name": "Adolfo Suárez Madrid–Barajas Airport",
                "name_acr": "MAD",
                "city": "Madrid",
                "city_acr": "MAD",
                "country": "Spain",
                "country_acr": "ES",
                "terminals": 4,
                "gates": 176,
                "img": "https://greenfc.com/app/uploads/2022/11/02-zma1-madrid-airport-lr-4.jpg"
            },
            {
                "name": "Charles de Gaulle Airport",
                "name_acr": "CDG",
                "city": "Paris",
                "city_acr": "PAR",
                "country": "France",
                "country_acr": "FR",
                "terminals": 3,
                "gates": 176,
                "img": "https://s28477.pcdn.co/wp-content/uploads/2017/10/CDG_4-984x554.jpg"
            },
            {
                "name": "Orly Airport",
                "name_acr": "ORY",
                "city": "Paris",
                "city_acr": "PAR",
                "country": "France",
                "country_acr": "FR",
                "terminals": 4,
                "gates": 80,
                "img": "https://www.pariste.net/wp-content/uploads/2014/04/Paris-Orly-Havaalani-Pariste.Net-11.jpg"
            },
            {
                "name": "Gatwick Airport",
                "name_acr": "LGW",
                "city": "London",
                "city_acr": "LON",
                "country": "United Kingdom",
                "country_acr": "UK",
                "terminals": 2,
                "gates": 123,
                "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Gatwick_Airport_2018.jpg/1920px-Gatwick_Airport_2018.jpg"
            },
            {
                "name": "Heathrow Airport",
                "name_acr": "LHR",
                "city": "London",
                "city_acr": "LON",
                "country": "United Kingdom",
                "country_acr": "UK",
                "terminals": 5,
                "gates": 146,
                "img": "https://www.heathrow.com/-/media/heathrow/home/image-carousel/full-width-carousel/h1/july-2021/1920x750-01.jpg"
            },
            {
                "name": "Berlin Brandenburg Airport",
                "name_acr": "BER",
                "city": "Berlin",
                "city_acr": "BER",
                "country": "Germany",
                "country_acr": "DE",
                "terminals": 3,
                "gates": 150,
                "img": "https://ber.berlin-airport.de/en.thumb.800.480.png?ck=1702065235"
            },
            {
                "name": "Munich Airport",
                "name_acr": "MUC",
                "city": "Munich",
                "city_acr": "MUC",
                "country": "Germany",
                "country_acr": "DE",
                "terminals": 2,
                "gates": 150,
                "img": "https://3.bp.blogspot.com/-0Ue6KFVxDSk/V2zLokPrysI/AAAAAAAAL_I/Ist3PXsjQFMUzmvItB6o7qW_bHLv7DMpQCKgB/s1600/IMG_0857.jpg"
            },
            {
                "name": "Helsinki Airport",
                "name_acr": "HEL",
                "city": "Helsinki",
                "city_acr": "HEL",
                "country": "Finland",
                "country_acr": "FI",
                "terminals": 3,
                "gates": 58,
                "img": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Helsinki-Vantaa_Airport.jpg"
            },
            {
                "name": "Zurich Airport",
                "name_acr": "ZRH",
                "city": "Zurich",
                "city_acr": "ZRH",
                "country": "Switzerland",
                "country_acr": "CH",
                "terminals": 3,
                "gates": 80,
                "img": "https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/05/26/0c3df362-e2b6-4e87-8a96-64bc3d1d388a_ed18453d.jpg"
            },
            {
                "name": "Oslo Airport, Gardermoen",
                "name_acr": "OSL",
                "city": "Oslo",
                "city_acr": "OSL",
                "country": "Norway",
                "country_acr": "NO",
                "terminals": 1,
                "gates": 53,
                "img": "https://www.frico.net/fileadmin/_processed_/5/1/csm_Reference_airport_oslo_1_fullsize_8742637178.jpg"
            },
            {
                "name": "Tokyo Haneda Airport",
                "name_acr": "HND",
                "city": "Tokyo",
                "city_acr": "TYO",
                "country": "Japan",
                "country_acr": "JP",
                "terminals": 4,
                "gates": 115,
                "img": "https://www.gotokyo.org/en/destinations/western-tokyo/shibuya/images/xmain.jpg.pagespeed.ic.dMwK5EfW6X.jpg"
            },
            {
                "name": "Narita International Airport",
                "name_acr": "NRT",
                "city": "Tokyo",
                "city_acr": "TYO",
                "country": "Japan",
                "country_acr": "JP",
                "terminals": 3,
                "gates": 90,
                "img": "https://www.appi-japan.com/wp-content/themes/appi-tc-v001/assets/images/access/narita/narita.jpg"
            },
            {
                "name": "Incheon International Airport",
                "name_acr": "ICN",
                "city": "Seoul",
                "city_acr": "ICN",
                "country": "South Korea",
                "country_acr": "SK",
                "terminals": 2,
                "gates": 111,
                "img": "https://www.hda-paris.com/wp-content/uploads/2015/09/Incheon_2018_1.png"
            },
            {
                "name": "Pulkovo Airport",
                "name_acr": "LED",
                "city": "St. Petersburg",
                "city_acr": "LED",
                "country": "Russia",
                "country_acr": "RU",
                "terminals": 3,
                "gates": 75,
                "img": "https://www.traveldailymedia.com/assets/2019/12/shutterstock_1395815210.jpg"
            },

            {
                "name": "All",
                "name_acr": "All",
                "city": "Paris",
                "city_acr": "PAR",
                "country": "France",
                "country_acr": "FR",
                "terminals": 0,
                "gates": 0,
                "img": "https://www.pariste.net/wp-content/uploads/2014/04/Paris-Orly-Havaalani-Pariste.Net-11.jpg"
            },
            {
                "name": "All",
                "name_acr": "All",
                "city": "London",
                "city_acr": "LON",
                "country": "United Kingdom",
                "country_acr": "UK",
                "terminals": 0,
                "gates": 0,
                "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Gatwick_Airport_2018.jpg/1920px-Gatwick_Airport_2018.jpg"
            },
            {
                "name": "All",
                "name_acr": "All",
                "city": "Tokyo",
                "city_acr": "TYO",
                "country": "Japan",
                "country_acr": "JP",
                "terminals": 3,
                "gates": 90,
                "img": "https://www.japan-experience.com/sites/default/files/images/content_images/chubu-airport-2017-1.jpg"
            }
        ]

        for (let airport of arrAirports) {
            console.log(airport)
            await AirportModel.insertAirport(airport)
        }
        res.json("Meow created many airports today! Can sleep for 17 hours meow!")
    } catch (error) {
        res.json({ error: error.message })
    }
}


module.exports = { getById, createAirport, editAirportById, getAll, massAirports }