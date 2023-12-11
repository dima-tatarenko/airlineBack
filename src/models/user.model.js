const selectById = (userId) => {
    return db.query('select * from users where users.id = ?;', [userId])
}

const insertUser = ({ first_name, last_name, email, password, access_level, passport, membership, phone }) => {
    return db.query('insert into users (first_name, last_name, email, password, access_level, passport,membership,phone) values (?,?,?,?,?,?,?,?)', [first_name, last_name, email, password, access_level, passport, membership, phone])
}


module.exports = { selectById, insertUser }


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