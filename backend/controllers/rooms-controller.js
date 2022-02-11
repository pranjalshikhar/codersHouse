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
}

module.exports = new RoomsController();