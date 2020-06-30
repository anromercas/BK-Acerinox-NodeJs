const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

// ==================
// Verify Token
// ==================

let verifyToken = (req, res, next) => {

    let token = req.query.token ? req.query.token : req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                success: false,
                error: 'Token expired'
            });
        }

        req.user = decoded.user;
        next();
    });
};

// ==================
// Verify ADMINISTRATOR
// ==================

let verifyAdmin_Role = (req, res, next) => {

    let user = req.user;

    if (user.role === 'ADMINISTRATOR' ) {
        next();
    } else {
        return res.json({
            success: false,
            error: 'The user is not administrator'
        });
    }
};


module.exports = {
    verifyToken,
    verifyAdmin_Role,
}