const selectById = (flightId) => {
    return db.query('select * from flights where flights.id = ?;', [flightId])
}

const insertFlight = ({ origin_id, destination_id, departure, arrival, duration, domestic, price, seat, max_luggage, terminal, gate, img }) => {
    return db.query('insert into flights (origin_id, destination_id, departure,arrival,duration,domestic,price,seat,max_luggage,terminal,gate,img) values (?,?,?,?,?,?,?,?,?,?,?,?)', [origin_id, destination_id, departure, arrival, duration, domestic, price, seat, max_luggage, terminal, gate, img])
}


module.exports = { selectById, insertFlight }


// INTERFACE (IFlight)

// origin_id: number,
// destination_id: number,
// departure: Date,
// arrival: Date,
// duration: number,
// domestic: boolean,
// price: number,
// seat: ISeat[],
// max_luggage: number,
// terminal: ITerminal,
// gate: IGate,
// img: string,