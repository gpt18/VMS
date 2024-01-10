require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');

const app = express();

//middleware
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({extended: true}));
app.use(cors());

//database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to db'));


//auto-load routers
readdirSync('./routers').map((r) => app.use('/api', require('./routers/' + r)));


app.listen(process.env.PORT, () => console.log(`server started at port ${process.env.PORT}`));