require('dotenv').config();
const express = require('express');
const app = express();
const DbConnect = require('./database');
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ACTIONS = require('./actions');
const { exists } = require('./models/user-model');
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:3000'],
        method: ['GET', 'POST'],
    }
});

app.use(cookieParser());
const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));
app.use('/storage', express.static('storage'));

const PORT = process.env.PORT || 5500;
DbConnect();
app.use(express.json({ limit: '8mb' }));
app.use(router);

app.get('/', (req, res) => {
    return res.send('Hello from express Js');
});

// sockets
const socketUserMapping = {

}
io.on('connection', (socket) => {
    console.log('Socket Connection', socket.id);
    socket.on(ACTIONS.JOIN, ({roomId, user}) => {
        socketUserMapping[socket.id] = user;

        // socket-user-mapping
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        // when room already exists, send request to clients
        clients.forEach(clientId => {
            io.to(clientId).emit(ACTIONS.ADD_PEER, {});
        });
        // send request to self to join the room
        socket.emit(ACTIONS.ADD_PEER, {});
        // join room
        socket.join(roomId);
        
        // console.log(clients);
    });
    
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));