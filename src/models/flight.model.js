const selectById = (flightId) => {
    return db.query('select * from flights where flights.id = ?;', [flightId])
}

const insertFlight = ({ origin_id, destination_id, departure, arrival, duration, price, available_seats, available_luggage, terminal, gate, img }) => {
    return db.query('insert into flights (origin_id, destination_id, departure,arrival,duration,price,available_seats,available_luggage,terminal,gate,img) values (?,?,?,?,?,?,?,?,?,?,?,?)', [origin_id, destination_id, departure, arrival, duration, price, available_seats, available_luggage, terminal, gate, img])
}


module.exports = { selectById, insertFlight }


