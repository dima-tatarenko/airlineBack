const selectAll = () => {
    return db.query('select * from flights order by flights.id desc;')
}

const selectById = (flightId) => {
    console.log(flightId)
    return db.query('select * from flights where flights.id = ?;', [flightId])
}

const selectReservationById = (reservationId) => {
    return db.query('select * from flight_reservation where flight_reservation.id = ?;', [reservationId])
}

const selectOneToOne = (origin_id, destination_id, departure) => {
    return db.query('select f.*, a.name, a.name_acr, a.city, a.city_acr, a.country, a.country_acr, a.img, a.terminals, a.gates from airlines_db.flights as f, airlines_db.airports as a where f.origin_id = a.id and f.origin_id = ? and f.destination_id = ? and f.departure >= ? order by f.departure;', [origin_id, destination_id, departure])
}

const selectAllToOne = (origin_city, destination_id, departure) => {
    return db.query('SELECT flights.*, airports.name, airports.name_acr, airports.city, airports.city_acr, airports.country, airports.country_acr, airports.img, airports.terminals, airports.gates FROM airlines_db.flights INNER JOIN airports ON flights.origin_id = airports.id WHERE airports.city = ? and flights.destination_id = ? and flights.departure >= ? order by flights.departure;', [origin_city, destination_id, departure])
}

const selectOneToAll = (origin_id, destination_city, departure) => {
    return db.query('SELECT flights.*, airports.name, airports.name_acr, airports.city, airports.city_acr, airports.country, airports.country_acr, airports.img, airports.terminals, airports.gates FROM airlines_db.flights INNER JOIN airports ON flights.origin_id = airports.id WHERE flights.origin_id = ? and flights.destination_city = ? and flights.departure >= ? order by flights.departure;', [origin_id, destination_city, departure])
}

const selectAllToAll = (origin_city, destination_city, departure) => {
    return db.query('SELECT flights.*, airports.name, airports.name_acr, airports.city, airports.city_acr, airports.country, airports.country_acr, airports.img, airports.terminals, airports.gates FROM airlines_db.flights INNER JOIN airports ON flights.origin_id = airports.id WHERE airports.city = ? and flights.destination_city = ? and flights.departure >= ? order by flights.departure;', [origin_city, destination_city, departure])
}


const insertFlight = ({ origin_id, destination_id, destination_city, departure, arrival, duration, price, available_seats, available_luggage, terminal, gate, img }) => {
    return db.query('insert into flights (origin_id, destination_id, destination_city, departure,arrival,duration,price,available_seats,available_luggage,terminal,gate,img) values (?,?,?,?,?,?,?,?,?,?,?,?)', [origin_id, destination_id, destination_city, departure, arrival, duration, price, available_seats, available_luggage, terminal, gate, img])
}

const insertBooking = ({ users_id, flights_id, luggage, ticket_class, passenger_name, passport }) => {
    return db.query('insert into flight_reservation (users_id, flights_id, luggage, class, passenger_name, passport) values (?,?,?,?,?,?)', [users_id, flights_id, luggage, ticket_class, passenger_name, passport])
}

const insertUserSeat = ({ seat_id, flight_reservation_id }) => {
    return db.query('insert into passenger_seats (seat_id, flight_reservation_id) values (?, ?);', [seat_id, flight_reservation_id])
}

// Quick fix for backend to automatically generate seats.
const insertSeat = ({ flights_id, seat_row, seat_column, location }) => {
    return db.query('insert into seats (flights_id, seat_row, seat_column, location) values (?,?,?,?)', [flights_id, seat_row, seat_column, location])
}

// Things we need to insert 1 or 2 funcs?
// connected table -> id is auto generated
// users_id, flights_id, luggage(int), class(string), passenger_name(string), passport(string)




// May be totally useless
// const selectByCities = (origin_id, destination_id) => {
//     return db.query('select f.*, a.* from airlines_db.flights as f, airlines_db.airports as a where f.origin_id = a.id and f.origin_id = ? and f.destination_id = ?', [origin_id, destination_id])
// }


module.exports = { selectAll, selectById, selectReservationById, selectOneToOne, selectAllToOne, selectOneToAll, selectAllToAll, insertFlight, insertBooking, insertUserSeat, insertSeat }


