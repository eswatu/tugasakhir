const {expressjwt: jwt} = require('express-jwt');
const { secret } = require('../config.json');
const db = require('../_helpers/db');

module.exports = authorize;

function authorize(roles = []) {
    // role berupa string atau array
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token lalu decode ke request req.user
        jwt({ secret, algorithms: ['HS256'] }),

        // implementasikan
        async (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)){
                // role tidak sesuai / terotentikasi
                return res.status(401).json({ message: 'Unauthorized' });
            }
//auth sukses
            next();
        }
    ];
}