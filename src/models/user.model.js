const selectById = (userId) => {
    return db.query('select * from users where users.id = ?;', [userId])
}

const selectByEmail = (userEmail) => {
    return db.query('select * from users where users.email = ?;', [userEmail])
}

const selectReservations = (userId) => {
    return db.query('SELECT f.id, fu.passenger_name, fu.passport, a.city, f.destination_city, f.departure, f.arrival, fu.class FROM airlines_db.users AS u, airlines_db.flights AS f, airlines_db.flight_reservation AS fu, airlines_db.airports AS a WHERE u.id = fu.users_id AND f.id = fu.flights_id AND f.origin_id = a.id AND u.id = ?;', [userId])
}

const insertUser = ({ first_name, last_name, email, password, access_level, passport, membership, phone }) => {
    return db.query('insert into users (first_name, last_name, email, password, access_level, passport,membership,phone) values (?,?,?,?,?,?,?,?)', [first_name, last_name, email, password, access_level, passport, membership, phone])
}


module.exports = { selectById, selectByEmail, selectReservations, insertUser }


// INTERFACE (IUser)

// id: number,
// first_name: string,
// last_name: string,
// personal_id: string,
// email: string,
// phone: number,
// password: string,
// access_level: string,
// membership: string