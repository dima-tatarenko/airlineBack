const express = require('express');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());




// Any petitions that has X URL will go through app.use('X')
app.use('/api', require('./routes/api'))







module.exports = app;