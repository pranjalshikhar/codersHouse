const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const refreshModel = require('../models/refresh-model');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, accessTokenSecret, {
            expiresIn : '1h',
        });

        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn : '1y',
        });

        return { accessToken, refreshToken };
    }

    async storeRefreshToken(token, userId) {
        try {
            await refreshModel.create({
                token,
                userId
            });
            return;
        } catch(err) {
            console.log(Err.message)
        }
    }

    async verifyAccessToken(token) {
        return jwt.verify(token, accessTokenSecret);
    }

    async verifyRefreshToken(token) {
        return jwt.verify(token, refreshTokenSecret);
    }

    async findRefreshToken(userId, token) {
        return await refreshModel.findOne({_id: userId, token: token});
    }

    async updateRefreshToken(userId, token) {
        return await refreshModel.updateOne({userId: userId}, {token: token});
    }

}

module.exports = new TokenService();