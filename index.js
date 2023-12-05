const http = require('http');
const app = require('./src/app')

// .env as soon as possible
require('dotenv').config();

// Config DB
require('./src/config/db')


// Create server
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
// .env PORT = 3100

server.listen(PORT);


// Listeners
server.on('listening', () => {
    console.log('Server seems to be working.')
})

server.on('error', () => {
    console.log('Chaos and destruction. (And errors)')
})