const { hashPassword, comparePassword, getToken, getJwtPayload, verifyToken } = require('../helpers/authHelper');
const { generateVerificationToken } = require('../helpers/utilHelper');
const User = require('../models/user.model');
const nodemailer = require('nodemailer');

const handleVerifyEmail = (req, res) => {
    const pid = generateVerificationToken(6);
    const token = req.query.token;

    const isVerified = verifyToken(token);

    if(isVerified) return res.send(`PID: ${pid}, Email Verified Sucessfully!`);
    else return res.send(`PID: ${pid}, Token Expired!`)
}

const handleSendVerificationEmail = (req, res) => {
  
    const userEmail = req.query.email;
    const tokenid = generateVerificationToken(12);
    const token = getToken({
        _id: tokenid,
        username: userEmail,
        role: 'email',
    }, '5m');

    const verificationLink = `${req.protocol}://${req.get('host')}/api/verify?token=${token}`;

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_CLIENT_INCOMING_SERVER_HOST, 
        port: process.env.MAIL_CLIENT_SMTP_PORT, 
        secure: process.env.MAIL_CLIENT_SSL, 
        auth: {
            user: process.env.MAIL_CLIENT_USER_EMAIL, 
            pass: process.env.MAIL_CLIENT_PASSWORD 
        }
    });

    const mailOptions = {
        from: `Voluntask <${process.env.MAIL_CLIENT_USER_EMAIL}>`,
        to: userEmail,
        subject: 'Email Verification - Voluntask',
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p style="color: #333;">Dear User,</p>
        <p style="color: #333;">Please click the following link to verify your email:</p>
        </br>
        <p style="color: #007bff;"><a href="${verificationLink}" style="text-decoration: none; color: #007bff;">${verificationLink}</a></p>
        </br>
        <p style="color: #333;"><b>The verification link will expire in 5 minutes for security reasons.</b></p>
        <p style="color: #333;">If you did not request this verification, you can safely ignore this email.</p>
        </br>
        </br>
        <p style="color: #333;">Thank you,</p>
        <p style="color: #333;">Voluntask</p>
    </div>
</body>
</html>

        `
    };

    

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email');
        } else {
            return res.send(`Verification email sent successfully with Key: \n Reference key: ${tokenid.toUpperCase()}`);
        }
    });

}

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
    const existingUsername = await User.findOne({ username: cleanUsername });
    if(existingUsername) return res.status(400).send(`Username: ${cleanUsername} already taken!`);


    // check for existing user email
    const existingEmail = await User.findOne({ email });
    if(existingEmail) return res.status(400).send('This email is already registered');

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

    const now = new Date();
    const lastLogin = user.current_login;
    user.current_login = now;
    if(lastLogin) {
        user.last_login = lastLogin;
    }

    try {
        await user.save();
    } catch (error) {
        console.log('Login time updatation failed >>>', err);
        return res.status(500).send("Semthing went wrong! login after some time");
    }

    const token = getToken(user);

    return res.status(200).json({
        role: user.role,
        access_key: token,
    });
    
}

async function handlePermission(req, res) {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({msg: "Could not validate credentials", p: false});

    const token = authHeader.split("Bearer ")[1];
    const valid = verifyToken(token);
    
    if(!valid) return res.status(401).json({msg: "Could not validate credentials", p: false});

    const jwtPayload = getJwtPayload(token);
    
    return res.status(200).json({msg: "Success", p: true, r: jwtPayload.role});
}

module.exports = {
    handleUserRegister,
    handleUserLogin,
    handlePermission,
    handleSendVerificationEmail,
    handleVerifyEmail,
}