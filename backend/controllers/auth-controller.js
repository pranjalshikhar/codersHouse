const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');

class AuthController {
    async sendOtp(req, res) {

        // Logic
        const { phone } = req.body;
        if(!phone) {
            res.status(400).json({
                message: 'Phone field is required!'
            });
        }

        const otp = await otpService.generateOtp();
        

        // Hash
        const ttl = 1000 * 60 * 2;  // 2 min
        const expires = Date.now() + ttl;
        const data = `${ phone }.${ otp }.${ expires }`;
        const hash = hashService.hashOtp(data);


        // Send OTP
        try {
            // await otpService.sendBySms(phone, otp);
            res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp,
            });
        } catch(err) {
            console.log(err);
            res.status(500).json({
                message: 'Message Sending Failed!'
            });
        }

        // res.json({ hash : hash });
    } 
    
    
    async verifyOtp(req, res) {

        // Logic
        const { otp, hash, phone } = req.body;
        if(!otp || !hash || !phone) {
            res.status(400).json({
                message: 'All fields are required!'
            });
        }

        const [hashedOtp, expires] = hash.split('.');
        if(Date.now() > +expires) {
            res.status(400).json({
                message: 'OTP expired!'
            });
        }

        const data = `${ phone }.${ otp }.${ expires }`;
        const isValid = otpService.verifyOtp(hashedOtp, data);
        if(!isValid) {
            res.status(400).json({
                message: 'Invalid OTP!'
            });
        }

        // User
        let user;

        try {
            user = await userService.findUser({ phone: phone });
            if(!user) {
                user = await userService.createUser({ phone: phone });
            }
        } catch(err) {
            console.log(err);
            res.status(500).json({
                message: 'Database Error!'
            });
        }


        // JWT Token
        const { accessToken, refreshToken } = tokenService.generateTokens({ _id : user._id, activated : false });

        res.cookie('refreshtoken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.json({ accessToken });

    }
}

module.exports = new AuthController();