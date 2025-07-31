const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleWare = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({
            status: 'ERR',
            message: 'Authorization header missing',
        });
    }

    const token = authHeader.split(' ')[1];
    console.log('token', token)
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: 'ERR',
                message: 'Invalid token',
            });
        }
        

        if (user?.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                status: 'ERR',
                message: 'Access denied',
            });
        }
    });
};


const authUserMiddleWare = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({
            status: 'ERR',
            message: 'Authorization header missing',
        });
    }

    const token = authHeader.split(' ')[1];
    const userId = req.params.id;

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: 'ERR',
                message: 'Invalid token',
            });
        }

        if (user?.isAdmin || user?.id === userId) {
            next();
        } else {
            return res.status(403).json({
                status: 'ERR',
                message: 'Access denied',
            });
        }
    });
};


module.exports = {
    authMiddleWare,
    authUserMiddleWare
}


