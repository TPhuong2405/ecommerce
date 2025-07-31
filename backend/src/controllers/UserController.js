const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService');
// const { HttpProxy } = require('vite');

const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, confirmPassword, phone } = req.body;

        // NOTE 1: Email regex (có thể đổi regex phức tạp hơn nếu muốn)
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)

        // NOTE 2: Validate input
        if ( !email || !password || !confirmPassword ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            });
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmpassword'
            });
        }

        // NOTE 3: Gọi service
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.error("Error in createUser controller:", e); // NOTE 5: Log lỗi
        return res.status(404).json({
            message: e || 'An error occurred while creating the user.'
        });
    }
}

// login
const loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const {  email, password } = req.body;

        // NOTE 1: Email regex (có thể đổi regex phức tạp hơn nếu muốn)
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)

        // NOTE 2: Validate input
        if (!email || !password ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            });
        } 

        // NOTE 3: Gọi service
        const response = await UserService.loginUser(req.body)
        const { refresh_token, ...newReponse } = response
        console.log('response', response)
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false, // tùy môi trường (dev thì nên false nếu không dùng https)
            sameSite: 'Strict', // optional, bảo mật hơn
            path: '/', // optional
            maxAge: 7 * 24 * 60 * 60 * 1000 // optional: 7 ngày
        })

        return res.status(200).json(newReponse)
    } catch (e) {
        console.error("Error in createUser controller:", e); // NOTE 5: Log lỗi
        return res.status(404).json({
            message: e 
        });
    }
}

// updateUser
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            });
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e || 'An error occurred while updating the user.'
        });
    }
}

// deleteUser
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const token = req.headers
        console.log('token', token)
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            });
        }
        
        // console.log('userId', userId)
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e || 'An error occurred while updating the user.'
        });
    }
}

// deleteManyUser
const deleteManyUser = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            });
        }
        const response = await UserService.deleteManyUser(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e 
        });
    }
}

// getAllUser
const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e || 'An error occurred while updating the user.'
        });
    }
}

// getDetailsUser
const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        const token = req.headers
        console.log('token', token)
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            });
        }
        
        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e || 'An error occurred while updating the user.'
        });
    }
}

// refreshToken
const refreshToken = async (req, res) => {
    console.log("req.cookies.refresh_token", req.cookies.refresh_token)
    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            });
        }
        
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e 
        });
    }
}

//logout
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })
    } catch (e) {
        return res.status(404).json({
            message: e 
        });
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser,
    deleteManyUser
}






