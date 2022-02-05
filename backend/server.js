require('dotenv').config();
const express = require('express');
const DBConnect = require('./database');
const app = express();
const router = require('./routes');
const cors = require('cors');

const corsOption = {
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));


const PORT = process.env.PORT || 5500;

DBConnect();

app.use(express.json());
app.use(router);


app.get('/', (req, res) => { 
    res.send('Hello World!');
});


app.listen(PORT, () => 
    console.log(`Listening on ${PORT}`)
);