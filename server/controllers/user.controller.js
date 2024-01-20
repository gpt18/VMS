const User = require("../models/user");
const httpStatus = require('http-status');

async function handleGetUserDetails(req, res) {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }

        const { _id, name, username, email, role, last_login } = user;
        return res.status(httpStatus.OK).json({ id: _id, name, username, email, role, last_login });

    } catch (error) {
        console.log("error occure during handling getuserdetils: ", error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error. Try again.");
    }
}

module.exports = {
    handleGetUserDetails,
};