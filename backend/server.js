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
            io.to(clientId).emit(ACTIONS.ADD_PEER, {
                peerId: socket.id,
                createOffer: false,
                user
            });

            // send request to self to join the room
            socket.emit(ACTIONS.ADD_PEER, {
                peerId: clientId,
                createOffer: true,
                user:  socketUserMapping[clientId],
            });
        });
        
        // join room
        socket.join(roomId);
        
        // console.log(clients);
    });

    // Handle Relay Ice
    socket.on(ACTIONS.RELAY_ICE, ({peerId, icecandidate}) => {
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
            peerId: socket.id,
            icecandidate,
        })
    })
    
    // Handle Relay SDP - session description
    socket.on(ACTIONS.RELAY_SDP, ({peerId, sessionDescription}) => {
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
            peerId: socket.id,
            sessionDescription,
        })
    })

    // Handle Mute - Unmute
    socket.on(ACTIONS.MUTE, ({ roomId, userId }) => {
        console.log('mute on server', userId);
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.MUTE, {
                peerId: socket.id,
                userId,
            });
        });
    });

    socket.on(ACTIONS.UNMUTE, ({ roomId, userId }) => {
        console.log('unmute on server', userId);
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.UNMUTE, {
                peerId: socket.id,
                userId,
            });
        });
    });

    // Leaving the Room
    const leaveRoom = ({roomId}) => {
        const {rooms} = socket;

        Array.from(rooms).forEach(roomId => {
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
            clients.forEach(clientId => {
                // Sending to clients to remove
                io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
                    peerId: socket.id, 
                    userId: socketUserMapping[socket.id]?.id,
                })

                // Sending to self to remove
                socket.emit(ACTIONS.REMOVE_PEER, {
                    peerId: clientId,
                    userId: socketUserMapping[clientId]?.id,
                })
            })

            socket.leave(roomId);
        })

        delete socketUserMapping[socket.id];
    }

    socket.on(ACTIONS.LEAVE, leaveRoom);
    socket.on('disconnecting', leaveRoom);
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));