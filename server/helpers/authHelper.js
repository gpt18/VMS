const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if(err) reject(err);
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) reject(err);
                resolve(hash);
            })
        })
    })
}

const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
}

function getToken(user) {
    const payload = {
        id: user._id,
        username: user.username,
        role: user.role,
    }

    return jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' });

}

function verifyToken (token) {
    if(!token) return null;

    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (error) {
        return null;
    }
}

function getJwtPayload(token){
    if(!token) return null;

    try {
        return jwt.decode(token);
    } catch (error) {
        return null;
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    getToken,
    verifyToken,
    getJwtPayload,
}