const { verifyToken, getJwtPayload } = require("../helpers/authHelper");

function restrictToNgo (req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({detail: "Could not validate credentials", allowed: false});

    const token = authHeader.split("Bearer ")[1];
    const valid = verifyToken(token);
    
    if(!valid) return res.status(401).json({detail: "Could not validate credentials", allowed: false});

    const jwtPayload = getJwtPayload(token);
    req['X-jwtPayload'] = jwtPayload;
    
    next();
}

module.exports = {
    restrictToNgo,
}
