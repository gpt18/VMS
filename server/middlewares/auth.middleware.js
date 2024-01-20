const { verifyToken, getJwtPayload } = require("../helpers/authHelper");

function addPayload (req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({msg: "auth header not found: Could not validate credentials"});

    const token = authHeader.split("Bearer ")[1];
    const valid = verifyToken(token);
    
    if(!valid) return res.status(401).json({msg: "token invalid: Could not validate credentials"});

    const jwtPayload = getJwtPayload(token);
    req.user = jwtPayload;

    next();
}

function restrictToNgo (req, res, next){
    
    if(req.user.role != "ngo") return res.status(401).json({msg: "Not aurthorized"})

    next();
}



module.exports = {
    restrictToNgo,
    addPayload,
}
