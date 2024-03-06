require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const { connectToMongoDB } = require("./connections");
const { restrictToNgo, addPayload, restrictTo } = require("./middlewares/auth.middleware");
const { getNgoId } = require('./helpers/utilHelper');
const cloudinary = require('cloudinary').v2;

const app = express();


//middleware
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//database connection
connectToMongoDB(process.env.DATABASE_URL)
    .then(() => console.log("%>> Connected to DB!"))
    .catch((err) => console.log("%>> DB Error >>> ", err));

//cloudinary       
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});

//auto-load all routers
// readdirSync('./routers').map((r) => app.use('/api', require('./routers/' + r)));

//routers 
const authRouter = require("./routers/authRouter");
const ngoRouter = require("./routers/ngoRouter");
const publicRouter = require('./routers/publicRouter');


app.use("/api", authRouter);
app.use("/api/ngo", addPayload, restrictTo(['ngo']), ngoRouter);
app.use('/public', publicRouter);

app.get("*", (req, res) => res.send(`<center><h1>404 Not Found</h1></center>`));


app.listen(process.env.PORT, () => console.log(`server started at port ${process.env.PORT}`));