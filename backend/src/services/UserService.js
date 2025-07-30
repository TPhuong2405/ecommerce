const User = require('../models/UserModel');
const bcrypt = require('bcrypt'); // Thêm dòng này nếu bạn muốn mã hóa mật khẩu
const { genneraAccessToken, genneraRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        
        try {
            const checkUser = await User.findOne({
                email: email
            });
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The Email is already',
                });
            }
            const hash = bcrypt.hashSync(password, 10); // Mã hóa mật khẩu
            const createdUser = await User.create({
                name,
                email,
                password: hash, // Lưu mật khẩu đã mã hóa
                phone,
                access_token: 'some_token_here', // tạm thời
                refresh_token: 'some_token_here' // tạm thời
            })
            if(createdUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser,
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

// loginUser
const loginUser = (newLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = newLogin
        
        try {
            const checkUser = await User.findOne({
                email: email
            });
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined',
                });
            }
            const comparePasswordl = bcrypt.compareSync(password, checkUser.password); // So sánh mật khẩu đã mã hóa
            if (!comparePasswordl ) {
                resolve({
                    status: 'OK',
                    message: 'The password or user is incorrect',
                })
            }
            const access_token = await genneraAccessToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin,
            });

            const refresh_token = await genneraRefreshToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin,
            });

            resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token,
                    refresh_token,
                })
        } catch (e) {
            reject(e);
        }
    })
}

// update user
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            });
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            console.log('updatedUser', updatedUser)

            resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: updatedUser,
                })
        } catch (e) {
            reject(e);
        }
    })
}

// delete user
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            });
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }

            await User.findByIdAndDelete(id)

            resolve({
                    status: 'OK',
                    message: 'Delete user SUCCESS',
                })
        } catch (e) {
            reject(e);
        }
    })
}

// deleteManyUser
const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            // await User.deleteManyUser({ _id: id })
            await User.deleteMany({ _id: ids })
            resolve({
                    status: 'OK',
                    message: 'Delete user SUCCESS',
                })
        } catch (e) {
            reject(e);
        }
    })
}

// getAllUser
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const alluser = await User.find()
            resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: alluser
                })
        } catch (e) {
            reject(e);
        }
    })
}

// getDetailsUser
const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            });
            if (user === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }

            resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: user
                })
        } catch (e) {
            reject(e);
        }
    })
}



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteManyUser
}

