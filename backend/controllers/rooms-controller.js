const RoomDto = require("../dtos/room-dto");
const roomService = require("../services/room-service");

class RoomsController {
    async create(req, res) {
        // room
        const {topic, roomType} = req.body;
        if(!topic) {
            res.status(400).json({message: 'Room Topic Required'});
            return;
        }

        const room = await roomService.create({
            topic,
            roomType,
            ownerId: req.user._id
        });

        const roomDto = new RoomDto(room);
        return res.json({ room: roomDto });
    }

    async index(req, res) {
        const rooms = await roomService.getAllRooms(['open']);
        const allRooms = rooms.map((room) => new RoomDto(room));
        return res.json(allRooms);
    }
}

module.exports = new RoomsController();