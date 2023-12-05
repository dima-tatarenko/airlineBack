const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());




// Any petitions that has X URL will go through app.use('X')
app.use('/api', require('./routes/api'))







module.exports = app;