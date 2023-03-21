const { auth, InvalidTokenError, UnauthorizedError } = require("express-oauth2-jwt-bearer");
const dotenv = require("dotenv");

dotenv.config();

const validateAuth0AccessToken = auth({
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
    audience: process.env.AUTH0_AUDIENCE,
});

module.exports = {
    validateAuth0AccessToken
};

// module.exports = {
//     isAdmin: (req, res, next) => {
//         if (req.user && req.user.role === 'admin') {
//             return next();
//         }
//         res.status(403).send('Unauthorized');
//     },
//     isUser: (req, res, next) => {
//         if (req.user && req.user.role === 'user') {
//             return next();
//         }
//         res.status(403).send('Unauthorized');
//     }
// };




