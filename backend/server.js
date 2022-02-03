require('dotenv').config();
const express = require('express');
const app = express();
const DBConnect = require('./database');
const router = require('./routes');
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