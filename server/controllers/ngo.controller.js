const User = require("../models/user");

async function handleGetNgoDetails (req, res) {
    const id = req.params.id;

    if(id != req['X-jwtPayload'].id) return res.status(401).json({
        detail: "Could not X validate credentials"
    });

    try {
    const user = await User.findById(id);

    if(!user) return res.status(404).json({msg: "user not found", allowed: false});
    
    return res.status(200).json({
        msg: "verified user",
        name: user.name,
        allowed: true
    })
    } catch (error) {
        return res.status(500).send("Error. Try again.");
    }
    
}

module.exports = {
    handleGetNgoDetails,
}