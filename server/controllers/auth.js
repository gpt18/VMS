const { hashPassword, comparePassword, getToken } = require('../helpers/authHelper');
const User = require('../models/user');

const handleUserRegister = async (req, res) => {
    const { name, username, email, password, role} = req.body;

    const cleanUsername = username.replaceAll(" ","");

    //validation
    if(!name) return res.status(400).send('Name is required');
    if(!cleanUsername) return res.status(400).send('Username is required');
    if(!email) return res.status(400).send('Email is required');
    if(!password || password.length < 6) 
        return res
            .status(400)
            .send('Password is required and should be min 6 characters long');
    

    //check for existing username
    const existingUsername = await User.findOne({ cleanUsername });
    if(existingUsername) return res.status(400).send(`Username: ${cleanUsername} already taken!`);


    // check for existing user email
    const existingUser = await User.findOne({ email });
    if(existingUser) return res.status(400).send('This email is already registered');

    // hash password
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
        name,
        username: cleanUsername,
        email,
        password: hashedPassword,
        role,
    });

    try {
        await newUser.save();
        // console.log('USER CREATED >>>', newUser);
        return res.status(201).json({ OK: true });
    } catch (err) {
        console.log('REGISTRATION FAILED >>>', err);
        return res.status(500).send("Error. Try again.");
    }
}

async function handleUserLogin (req, res) {
    const { username, password } = req.body;

    if(!username || !password) return res.status(422).send("All fields required");

    //checking user
    const user = await User.findOne({username});
    if(!user) return res.status(400).send("User not found");

    //checking password
    const correctPassword = await comparePassword(password, user.password);
    if(!correctPassword) return res.status(400).send("Wrong Password");

    const token = getToken(user)
    
    return res.status(200).json({
        id: user._id,
        username: user.username,
        role: user.role,
        access_key: token,
        status: true,
    });
    
}

module.exports = {
    handleUserRegister,
    handleUserLogin,
}