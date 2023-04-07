//imports
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Set the strictQuery option to false
mongoose.set('strictQuery', false);

//enviroment variables
require('dotenv/config');
const url = process.env.URL;
const PORT = process.env.PORT;

//middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options('*', cors());

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

const recipeRouter = require('./routes/recipe');
app.use(url + '/recipes', cors(), recipeRouter);

const commentRouter = require('./routes/comments');
app.use(url + '/comments', cors(), commentRouter);

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

app.get('/', (req, res) => {
    res.send('Welcome To MasterChef');
});

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});
