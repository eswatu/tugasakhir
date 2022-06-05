const jwt = require('express-jwt');
const { secret } = require('../config.json');
const db = require('../_helpers/db');

module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach decoded token to request as req.user
        jwt({ secret, algorithms: ['HS256'] }),

        // attach full user record to request object
        async (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)){
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }
//auth sukses
            next();
        }
    ];
}