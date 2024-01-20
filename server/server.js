require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const { connectToMongoDB } = require("./connections");
const { restrictToNgo, addPayload } = require("./middlewares/auth.middleware");
const { getNgoId } = require('./helpers/utilHelper');

const app = express();



//middleware
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({extended: true}));
app.use(cors());


//database connection
connectToMongoDB(process.env.DATABASE_URL)
.then(() => console.log("%>> Connected to DB!"))
.catch((err) => console.log("%>> DB Error >>> ",err));


//auto-load all routers
// readdirSync('./routers').map((r) => app.use('/api', require('./routers/' + r)));

//routers 
const authRoute = require("./routers/authRouter");
const ngoRouter = require("./routers/ngoRouter");


app.use("/api", authRoute);
app.use("/api/ngo", addPayload, restrictToNgo, ngoRouter);

app.get("*", (req, res) => res.send("Not Authorized!"));


app.listen(process.env.PORT, () => console.log(`server started at port ${process.env.PORT}`));