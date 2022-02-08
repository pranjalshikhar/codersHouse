const jimp = require('jimp');
const path = require('path');
const userService = require('../services/user-service');
const UserDto = require('../dtos/user-dto');

class ActivateControleer {
    async activate(req, res) {
        // Activation Logic
        const { name, avatar } = req.body;
        if(!name || !avatar) {
            res.status(400).json({ message: 'Name is required' });
            return;
        }

        // Image Base64
        const buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');
        const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

        try {
            const jimpResponse = await jimp.read(buffer);
            jimpResponse.resize(150, jimp.AUTO).write(path.resolve(__dirname, `../storage/${imagePath}` ));
        } catch(err) {
            res.status(500).json({ message: 'Could Not Process The Image!'});
        }


        // Update User
        const userId = req.user._id;
        try {
            const user = await userService.findUser({ _id: userId }); 
            if(!user) {
                res.status(404).json({ message: 'User not found!' });
            }
            user.activated = true;
            user.name = name;
            user.avatar = `/storage/${imagePath}`;
            user.save();
            res.json({ user: new UserDto(user), auth: true });
        } catch(err) {
            res.status(500).json({ message: 'Something Went Wrong!'});
        }
    }
}

module.exports = new ActivateControleer();