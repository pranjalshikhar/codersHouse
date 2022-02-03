const mongoose = require('mongoose');

function DbConnect() {
    console.log('Connected to:', process.env.DB_URL);
    const DB_URL = process.env.DB_URL;
    
    // Database connection
    mongoose.connect(DB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection Error!'));
    db.once('open', () => {
        console.log('Database connected...');
    });
}

module.exports = DbConnect;