//imports
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

//enviroment variables
require('dotenv/config');
const url = process.env.URL;

//middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.options('*', cors());

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

const recipeRouter = require('./routes/recipeRoutes');
app.use(url + '/recipes', cors(), recipeRouter)
app.use(cors(corsOptions));

const userRouter = require('./routes/userRoutes');
app.use(url + '/users', cors(), userRouter)
app.use(cors(corsOptions));


//connect to mongodb atlas
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Successfully connected to db!");
}).catch((error) => {
    console.log("Connection to db failed, error : " + error);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000!")
});