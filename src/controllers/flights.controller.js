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

// Full search 
const getFullSearch = async (req, res) => {
    try {
        const arrResults = []

        let { fare, origin, destination, departure, return_date } = req.body;

        if (return_date === '' || return_date === "undefined") {
            return_date = "9999-02-02"
        }

        console.log(fare)

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
            const [returnFlight] = await FlightModel.selectAllToOne(destination_city, Number(origin_id), return_date)

            arrResults.push(outboundFlight)
            arrResults.push(returnFlight)

            res.json(arrResults)
            return false
        }

        if (origin_acr === "All" && destination_acr !== "All") {

            const [outboundFlight] = await FlightModel.selectAllToOne(origin_city, Number(destination_id), departure)
            const [returnFlight] = await FlightModel.selectOneToAll(Number(destination_id), origin_city, return_date)

            arrResults.push(outboundFlight)
            arrResults.push(returnFlight)

            res.json(arrResults)
            return false
        }

        if (origin_acr !== "All") {
            const [origin_airport] = await AirportModel.selectByAcr(origin_acr)
            const origin_id = origin_airport[0].id
            const [destination_airport] = await AirportModel.selectByAcr(destination_acr)
            const destination_id = destination_airport[0].id

            const [outboundFlight] = await FlightModel.selectOneToOne(Number(origin_id), Number(destination_id), departure)
            const [returnFlight] = await FlightModel.selectOneToOne(Number(destination_id), Number(origin_id), return_date)

            arrResults.push(outboundFlight)
            arrResults.push(returnFlight)

            res.json(arrResults)
            return false
        }

        const [outboundFlight] = await FlightModel.selectAllToAll(origin_city, destination_city, departure)
        const [returnFlight] = await FlightModel.selectAllToAll(destination_city, origin_city, return_date)

        arrResults.push(outboundFlight)
        if (fare === "round_trip") {
            arrResults.push(returnFlight)
        }

        res.json(arrResults)

    } catch (error) {
        res.json({ error: error.message })
    }
}

const createFlight = async (req, res) => {

    try {
        const [result] = await FlightModel.insertFlight(req.body)
        const [flight] = await FlightModel.selectById(result.insertId)
        console.log(flight[0])
        res.json(flight[0])
    } catch (error) {
        res.json({ error: error.message })
    }
}

const bookFlight = async (req, res) => {
    try {
        const { outbound_id } = req.body[0]
        const { return_id } = req.body[0]

        const arrReservations = []

        console.log(outbound_id)
        console.log(return_id)

        for (let reservation of req.body) {
            console.log(reservation)
            arrReservations.push(reservation)
            await FlightModel.insertBooking(outbound_id, reservation)
            await FlightModel.insertBooking(return_id, reservation)
        }



        res.json(arrReservations)

    } catch (error) {
        res.json({ error: error.message })
    }
}


// NEED A GET ALL FOR PASSENGER SEATS NOW TO CHECK IF THEY'RE FULL!

const bookSeat = async (req, res) => {
    try {
        await FlightModel.insertUserSeat(req.body)
        const [reservation] = await FlightModel.selectReservationById(req.body.flight_reservation_id)

        res.json(reservation[0])
    } catch (error) {
        res.json({ error: error.message })
    }
}










// AUXILIARY STUFF FOR TESTING

const massFlights = async (req, res) => {
    try {
        const arrFlights = [
            {
                "origin_id": 4,
                "destination_id": 6,
                "departure": "2024-02-15 10:10",
                "arrival": "2024-02-15 14:10",
                "duration": 2,
                "price": 99,
                "available_seats": 50,
                "available_luggage": 300,
                "terminal": 1,
                "gate": 7,
                "img": "https://a.cdn-hotels.com/gdcs/production101/d154/ee893f00-c31d-11e8-9739-0242ac110006.jpg?impolicy=fcrop&w=800&h=533&q=medium"
            },
            {
                "origin_id": 4,
                "destination_id": 7,
                "departure": "2023-12-15 ",
                "arrival": "2023-12-15",
                "duration": 2,
                "price": 200,
                "available_seats": 50,
                "available_luggage": 300,
                "terminal": 2,
                "gate": 3,
                "img": "https://cdn.insuremytrip.com/resources/29337/spain_travel_insurance_seville.jpg"
            },
            {
                "origin_id": 5,
                "destination_id": 6,
                "departure": "2023-12-15",
                "arrival": "2023-12-15",
                "duration": 2,
                "price": 200,
                "available_seats": 50,
                "available_luggage": 300,
                "terminal": 2,
                "gate": 3,
                "img": "https://cdn.insuremytrip.com/resources/29337/spain_travel_insurance_seville.jpg"
            },
            {
                "origin_id": 5,
                "destination_id": 1,
                "departure": "2023-12-15",
                "arrival": "2023-12-15",
                "duration": 2,
                "price": 200,
                "available_seats": 50,
                "available_luggage": 300,
                "terminal": 2,
                "gate": 3,
                "img": "https://cdn.insuremytrip.com/resources/29337/spain_travel_insurance_seville.jpg"
            },
            {
                "origin_id": 6,
                "destination_id": 4,
                "departure": "2023-12-15",
                "arrival": "2023-12-15",
                "duration": 2,
                "price": 3,
                "available_seats": 50,
                "available_luggage": 300,
                "terminal": 2,
                "gate": 3,
                "img": "https://cdn.insuremytrip.com/resources/29337/spain_travel_insurance_seville.jpg"
            }

        ]

        for (let flight of arrFlights) {
            const [airport] = await AirportModel.selectById(flight.destination_id)

            console.log(airport[0].city)

            req.body.origin_id = flight.origin_id
            req.body.destination_id = flight.destination_id
            req.body.destination_city = airport[0].city
            req.body.departure = flight.departure
            req.body.arrival = flight.arrival
            req.body.duration = flight.duration
            req.body.price = flight.price
            req.body.available_seats = flight.available_seats
            req.body.available_luggage = flight.available_luggage
            req.body.terminal = flight.terminal
            req.body.gate = flight.gate
            req.body.img = flight.img
            await FlightModel.insertFlight(req.body)

        }


        res.json("Meow added many flights. What do you wanna do meow?")
    } catch (error) {
        res.json({ error: error.message })
    }
}

const massSeats = async (req, res) => {
    try {
        let max_rows = 10
        let flight_id = 35

        for (i = 1; i <= max_rows; i++) {
            req.body.flights_id = flight_id
            req.body.seat_row = i
            req.body.seat_column = 1
            req.body.location = "window"
            await FlightModel.insertSeat(req.body)

            req.body.flights_id = flight_id
            req.body.seat_row = i
            req.body.seat_column = 2
            req.body.location = "aisle"
            await FlightModel.insertSeat(req.body)

            req.body.flights_id = flight_id
            req.body.seat_row = i
            req.body.seat_column = 3
            req.body.location = "aisle"
            await FlightModel.insertSeat(req.body)

            req.body.flights_id = flight_id
            req.body.seat_row = i
            req.body.seat_column = 4
            req.body.location = "window"
            await FlightModel.insertSeat(req.body)
        }

        res.json("Meow added many seats! Meow are they not boxes tho?")
    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = { getAll, getById, createFlight, bookFlight, bookSeat, getFullSearch, massSeats, massFlights }