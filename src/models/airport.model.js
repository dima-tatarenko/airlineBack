const selectAll = () => {
    return db.query('select * from airlines_db.airports order by airports.id desc;')
}

const selectById = (airportId) => {
    return db.query('select * from airports where airports.id = ?;', [airportId])
}

const selectByAcr = (airportAcr) => {
    return db.query('select airports.id from airports where airports.name_acr = ?;', [airportAcr])
}

const insertAirport = ({ name, name_acr, city, city_acr, country, country_acr, terminals, gates, img }) => {
    return db.query('insert into airports (name, name_acr, city, city_acr, country, country_acr,  terminals, gates, img) values (?,?,?,?,?,?,?,?,?)',
        [name, name_acr, city, city_acr, country, country_acr, terminals, gates, img])
}


module.exports = { selectAll, selectById, insertAirport, selectByAcr }


// INTERFACE (IAirport)

// name: string,
// name_acr: string,
// city: string,
// city_acr: string,
// country: string,
// country_acr: string,
// terminals: ITerminal[],
// gates: IGate[],
// img: string