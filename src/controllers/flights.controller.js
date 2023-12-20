const FlightModel = require('../models/flight.model')
const AirportModel = require('../models/airport.model')
const UserModel = require('../models/user.model')
const { getTransporter } = require('../helpers/utils')


// Image json imports
const france_ory = require('../autofill/france_ory')
const france = require('../autofill/france')
const germany_mun = require('../autofill/germany_mun')
const germany = require('../autofill/germany')
const japan_nar = require('../autofill/japan_nar')
const japan = require('../autofill/japan')
const lax = require('../autofill/lax')
const norway = require('../autofill/norway')
const portland = require('../autofill/portland')
const spain = require('../autofill/spain')
const russia = require('../autofill/russia')
const uk_gat = require('../autofill/uk_gat')
const uk = require('../autofill/uk')
// Image json imports

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

const editFlightById = async (req, res) => {
    const { flightId } = req.params
    await FlightModel.updateById(flightId, req.body)

    const [editedFlight] = await FlightModel.selectById(flightId)

    const [emailObjArr] = await UserModel.selectEmailsById(118)
    const emailArr = []

    for (let email of emailObjArr) {
        emailArr.push(email.email)
    }

    const uniqueEmails = [...new Set(emailArr)].join()

    // FORCE TEST
    // const uniqueEmails = "yourmail1@gmail.com, yourmail2@gmail.com"

    // EMAIL DESCRIPTION
    const mailOptions = {
        from: "flightifyairlines@gmail.com",
        to: uniqueEmails,
        subject: "Your flight was modified",
        text: "Some of your flight data might have changed. Please log into our website and check your flight status under 'my flights'"
    };

    // SEND EMAIL
    getTransporter().sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Flight change notification sent to all users registered for the flight.');
        }
    });

    res.json(editedFlight[0])

}

const bookFlight = async (req, res) => {
    try {
        const { outbound_id } = req.body[0]
        const { return_id } = req.body[0]

        const arrReservations = []

        for (let reservation of req.body) {
            arrReservations.push(reservation)
            await FlightModel.insertBooking(outbound_id, reservation)
            await FlightModel.insertBooking(return_id, reservation)
        }

        const [emailObjArr] = await UserModel.selectEmailById(118, 13)
        const emailArr = []

        for (let email of emailObjArr) {
            emailArr.push(email.email)
        }

        const UserEmail = [...new Set(emailArr)].join()

        // FORCE TEST
        // const UserEmail = "dmitriy.tatarenko@gmail.com"

        // EMAIL DESCRIPTION
        const mailOptions = {
            from: "flightifyairlines@gmail.com",
            to: UserEmail,
            subject: "Thank you for flying with us!",
            text: "Thank you for booking a flight with Flightify. Remember that you can always visit the 'my flights' section for more information."
        };

        // SEND EMAIL
        getTransporter().sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('User booked a flight.');
            }
        });

        console.log(arrReservations)
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










// AUXILIARY FUNCTIONS


// Mass insert flights
// Thought process
// Can't use an airport array -> duration is different for each flight
// iterable variables -> departure (must iterate by time)
// could iterate day / time with for (let j=0)

// preparation: origin_id, destination_id, duration, price
// can add: departure, arrival (this is what uses i, j loops)
// generic (assuming same plane): seats cap., luggage cap., terminal, gate

function generateRandomNumber() {
    return Math.floor(Math.random() * 41) - 20; // Generates a random number between -20 and 20
}

// Valid mass insert :)
const massFlights = async (req, res) => {
    try {
        addedFlightsArr = []
        let counter = 0
        let arrival_time;

        let departure_day;



        // IMG FILE NAMES: france_ory, france, germany_mun, germany, japan, japan_nar, lax, norway, portland, russia, uk_gat, uk
        // Quick fill info
        // LA - Tokyo (~1200) (duration 12h)
        // Paris - London (~120) (duration 1h)
        // Munich - Paris (~160) (duration 2h)



        // Madrid (3) - Paris(4, 5(ory)) (~160) (duration 2h) france / france_ory
        // Madrid (3) - LA(2) (~650) (duration 13h) lax
        // Madrid (3) - Portland(1) (~400) (duration 18h) portland
        // Madrid (3) - London(6-Gat, 7-Hea) (~60) (duration 3h) uk, uk_gat
        // Madrid (3) - Germany(Ber-8 | Mun-9) (~100) (duration 3h) germany, germany_mun
        // Madrid (3) - Oslo(12) (~80) (duration 4h) norway
        // Madrid (3) - Tokyo(Han-13 | Nar-14) (~400) (duration 18h) japan, japan_nar
        // Madrid (3) - Russia(Pul-16) (~200) (duration 5h) russia

        // EDIT ONLY THESE VALUES
        let origin_airport_id = 16
        let destination_airport_id = 3
        let departure_year = 2023
        let departure_month = 12
        let day_start = 21 // Defines the day of the month to start || Missing conditions for month and year change!
        let last_day = day_start + 9 // Modify the 7 only if day_start + 7 > days in that month
        let flight_duration = 5
        let flight_price = 200
        let imgJson = spain

        // let arrival_date = "2023-12-21" - Disabled. Would need to fiddle with day change. 
        // Bug example: flight takes of at 23:00 and lands at 01:00.
        // EDIT ONLY THESE VALUES

        const [airport] = await AirportModel.selectById(destination_airport_id)

        for (j = 21; j < last_day; j++) {
            departure_day = j
            for (let i = 1; i < 24; i += 4) {
                if (i + flight_duration > 24) {
                    arrival_time = (i + flight_duration) - 24
                } else {
                    arrival_time = i + flight_duration
                }

                if (arrival_time === 24) {
                    arrival_time = Number("00")
                }

                // Flight information (tertiary functions might be weird to read, could be extracted)
                let flightInfo = {
                    origin_id: origin_airport_id,
                    destination_id: destination_airport_id,
                    destination_city: airport[0].city,
                    departure: i < 10 ? `${departure_year}-${departure_month}-${departure_day} 0${i}:00` : `${departure_year}-${departure_month}-${departure_day} ${i}:00`,
                    arrival: arrival_time < 10 ? `${departure_year}-${departure_month}-${departure_day} 0${arrival_time}:00` : `${departure_year}-${departure_month}-${departure_day} ${arrival_time}:00`,
                    duration: flight_duration,
                    price: flight_price + generateRandomNumber(),
                    available_seats: 200,
                    available_luggage: 5000,
                    terminal: 1,
                    gate: counter + 1,
                    img: `${imgJson[counter].img}`,
                    status: "active"
                };

                addedFlightsArr.push(flightInfo);
                await FlightModel.insertFlight(flightInfo)

                console.log(counter);
                counter = counter + 1;

                console.log(imgJson[counter].img);
            }
            counter = 0
        }


        res.json(addedFlightsArr);
    } catch (error) {
        res.json({ error: error.message });
    }
}


// Function to insert many seats at once. Works based on given rows.
// Could be easily changed to accomodate planes with 3 seats per row or 9 total seat columns
// This is simply a mock test for the existing DB. Final version would swap req.body inserts
// to an object with variables edited inside the loop.
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

module.exports = { getAll, getById, createFlight, editFlightById, bookFlight, bookSeat, getFullSearch, massSeats, massFlights }