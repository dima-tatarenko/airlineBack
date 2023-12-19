const selectById = (userId) => {
    return db.query('select * from users where users.id = ?;', [userId])
}

const selectByEmail = (userEmail) => {
    return db.query('select * from users where users.email = ?;', [userEmail])
}

const selectReservations = (userId) => {
    return db.query('SELECT f.id, fu.passenger_name, fu.passport, a.city, f.destination_city, f.departure, f.arrival, fu.class FROM airlines_db.users AS u, airlines_db.flights AS f, airlines_db.flight_reservation AS fu, airlines_db.airports AS a WHERE u.id = fu.users_id AND f.id = fu.flights_id AND f.origin_id = a.id AND u.id = ?;', [userId])
}

const selectReservationsById = (userId, flightId) => {
    return db.query('SELECT f.id, fu.passenger_name, fu.passport, a.city, f.destination_city, f.departure, f.arrival, fu.class FROM airlines_db.users AS u, airlines_db.flights AS f, airlines_db.flight_reservation AS fu, airlines_db.airports AS a WHERE u.id = fu.users_id AND f.id = fu.flights_id AND f.origin_id = a.id AND u.id = ? AND f.id = ?;', [userId, flightId])
}

const selectEmailsById = (flightId) => {
    return db.query('SELECT u.email FROM airlines_db.users AS u, airlines_db.flights AS f, airlines_db.flight_reservation AS fu WHERE u.id = fu.users_id AND f.id = fu.flights_id AND f.id = ?;', [flightId])
}

const selectEmailById = (flightId, userId) => {
    return db.query('SELECT u.email FROM airlines_db.users AS u, airlines_db.flights AS f, airlines_db.flight_reservation AS fu WHERE u.id = fu.users_id AND f.id = fu.flights_id AND f.id = ? and u.id = ?;', [flightId, userId])
}

const insertUser = ({ first_name, last_name, email, password, access_level, passport, membership, phone }) => {
    return db.query('insert into users (first_name, last_name, email, password, access_level, passport,membership,phone) values (?,?,?,?,?,?,?,?)', [first_name, last_name, email, password, access_level, passport, membership, phone])
}

const updateById = (clientId, { first_name, last_name, email, passport, phone }) => {
    return db.query('update users set first_name = ?, last_name = ?, email = ?, passport = ?, phone = ? where id = ?;',
        [first_name, last_name, email, passport, phone, clientId])
}


module.exports = { selectById, selectByEmail, selectReservations, selectReservationsById, selectEmailsById, selectEmailById, insertUser, updateById }


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