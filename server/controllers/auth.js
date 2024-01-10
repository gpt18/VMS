const { hashPassword, comparePassword } = require('../helpers/authHelper');
const User = require('../models/user');

const userRegister = async (req, res) => {
    const { name, email, password, role} = req.body;

    //validation
    if(!name) return res.status(400).send('Name is required');
    if(!email) return res.status(400).send('Email is required');
    if(!password || password.length < 6) 
        return res
            .status(400)
            .send('Password is required and should be min 6 characters long');
    if(!role) return res.status(400).send('Role is required');

    // check for existing user
    const existingUser = await User.findOne({ email });
    if(existingUser) return res.status(400).send('This email is already registered');

    // hash password
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
    });

    try {
        await newUser.save();
        console.log('USER CREATED >>>', newUser);
        return res.json({ OK: true });
    } catch (err) {
        console.log('REGISTRATION FAILED >>>', err);
        return res.status(500).send("Error. Try again.");
    }
}

module.exports = {
    userRegister,
}