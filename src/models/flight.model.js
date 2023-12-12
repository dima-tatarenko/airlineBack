const selectAll = () => {
    return db.query('select * from flights order by flights.id desc;')
}

const selectById = (flightId) => {
    return db.query('select * from flights where flights.id = ?;', [flightId])
}

const selectFullSearch = (origin_id, destination_id, departure) => {
    return db.query('select f.*, a.* from airlines_db.flights as f, airlines_db.airports as a where f.origin_id = a.id and f.origin_id = ? and f.destination_id = ? and f.departure >= ?;', [origin_id, destination_id, departure])
}

const selectCitySearch = (origin_city, destination_city, departure) => {
    return db.query('SELECT flights.*, airports.* FROM airlines_db.flights INNER JOIN airports ON flights.origin_id = airports.id WHERE airports.city = ? and flights.destination_city = ? and flights.departure >= ?;', [origin_city, destination_city, departure])
}

const selectByCities = (origin_id, destination_id) => {
    return db.query('select f.*, a.* from airlines_db.flights as f, airlines_db.airports as a where f.origin_id = a.id and f.origin_id = ? and f.destination_id = ?', [origin_id, destination_id])
}

const insertFlight = ({ origin_id, destination_id, destination_city, departure, arrival, duration, price, available_seats, available_luggage, terminal, gate, img }) => {
    return db.query('insert into flights (origin_id, destination_id, destination_city, departure,arrival,duration,price,available_seats,available_luggage,terminal,gate,img) values (?,?,?,?,?,?,?,?,?,?,?,?)', [origin_id, destination_id, destination_city, departure, arrival, duration, price, available_seats, available_luggage, terminal, gate, img])
}




module.exports = { selectAll, selectById, selectFullSearch, selectCitySearch, selectByCities, insertFlight }


