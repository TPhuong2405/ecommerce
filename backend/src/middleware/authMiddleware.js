const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]; // Assuming the token

    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authemtication'
            });
        }
        if (user?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authemtication'
            });
        }
    });
}

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]; // Assuming the token
    const userId = req.params.id;
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authemtication'
            });
        }
        if (user?.isAdmin || user?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authemtication'
            });
        }
    });
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}


