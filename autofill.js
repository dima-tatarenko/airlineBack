const mysql = require('mysql2');

require('dotenv').config();

const userdata = require('./data.json');
const UserModel = require('../src/models/empleado.model');


(async () => {

    // Create a connection
    const connection = mysql.createConnection({
        host: 'your-hostname',
        user: 'your-username',
        password: 'your-password',
        database: 'your-database'
    });

    // Connect to the database
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL database:', err);
            return;
        }
        console.log('Connected to MySQL database!');
    });


    // Borramos las colecciones
    await Empleado.collection.drop();
    await Usuario.collection.drop();

    // Insertamos los datos de nuevo
    const result = await Empleado.insertMany(data);

    console.log('Se han actualizado todos los documentos');

    await mongoose.disconnect();

})();








// Perform queries or operations here

// Close the connection when done
connection.end((err) => {
    if (err) {
        console.error('Error closing MySQL connection:', err);
        return;
    }
    console.log('MySQL connection closed.');
});


// var connection = null;
// app.put('/api/upload', function(req, res, next)
// {
//     connection = mysql.createConnection({
//         host     : 'localhost',
//         user     : 'me',
//         password : 'secret',
//         database : 'Database1'
//     });
//     connection.connect();
//     doMultipleQueries(function(err)
//     {
//         connection.end();
//     });
// };

// connection.end(function(err) {
//     // The connection is terminated now
//   });