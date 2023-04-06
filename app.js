//imports
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Set the strictQuery option to false
mongoose.set('strictQuery', false);

// const dotenv = require('dotenv');
// const Auth0Strategy = require('passport-auth0');
// const userRouter = require('./routes/user');
// const authRouter = require('./routes/auth');
// const authMiddleware = require('./middleware/auth');

//enviroment variables
require('dotenv/config');
const url = process.env.URL;

//middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(session({
//     secret: 'your secret key',
//     resave: false,
//     saveUninitialized: true,
// }));
// app.use(passport.initialize());
// app.use(passport.session());

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

// const strategy = new Auth0Strategy({
//     domain: process.env.AUTH0_DOMAIN,
//     clientID: process.env.AUTH0_CLIENT_ID,
//     clientSecret: process.env.AUTH0_CLIENT_SECRET,
//     callbackURL: process.env.AUTH0_CALLBACK_URL
// }, (accessToken, refreshToken, extraParams, profile, done) => {
//     return done(null, profile);
// });

// passport.use(strategy);

// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

// app.use('/users', userRouter);
// app.use('/auth', authRouter);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(3000, () => {
    console.log("Server is running on port 3000!")
});



// const { auth } = require('express-openid-connect');
// const { requiresAuth } = require('express-openid-connect');

// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: 'a long, randomly-generated string stored in env',
//     baseURL: 'http://localhost:3000',
//     clientID: 'b1PWi4rlfPPPEniBg74Gbt6JflPJ6H6F',
//     issuerBaseURL: 'https://dev-slwtm6bdvggyj45g.us.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// app.get('/profile', requiresAuth(), (req, res) => {
//     res.send(JSON.stringify(req.oidc.user));
// });