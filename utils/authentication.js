const JWT = require("jsonwebtoken");

const secretKey = "Adnan"

const createTokenForUser = (user) => {
    const payload = {
        _id:user._id,
        email:user.email,
        profileImageUrl:user.profileImageUrl,
        role:user.role,
    };
    const token = JWT.sign(payload,secretKey);
    return token;
}

const validateToken = (token) => {
    const payload = JWT.verify(token,secretKey);
    return payload;
}
module.exports = {
    createTokenForUser,
    validateToken,
}