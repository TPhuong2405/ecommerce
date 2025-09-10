// const User = require('../models/UserModel');
const bcrypt = require('bcrypt'); // Thêm dòng này nếu bạn muốn mã hóa mật khẩu
const { genneraAccessToken, genneraRefreshToken } = require('./JwtService');
const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');


const createdOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user } = newOrder
        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                    _id: order.product,
                    countInStock: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: - order.amount,
                            selled: + order.amount
                        }
                    },
                    { new: true } // Trả về tài liệu đã cập nhật
                )
                console.log('productData', productData)
                if (productData) {
                    const createdOrder = await Order.create({
                        orderItems,
                        shippingAddress: {
                            fullName, address, city, phone
                        },
                        paymentMethod, 
                        itemsPrice,
                        shippingPrice, 
                        totalPrice,
                        user: user,
                    })
                    if(createdOrder) {
                        return {
                            status: 'OK',
                            message: 'SUCCESS',
                        }
                    }
                } else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product,
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.id)
            if(newData.length) {
                resolve({
                    status: 'ERR',
                    message: `Sản phẩm với id ${newData.join(',')} không đủ hàng`
                })
            }
            resolve({
                status: 'OK',
                message: 'success'
            })
        } catch (e) {
            reject(e);
        }
    })
}

const getDetailsOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Product.findOne({
                user: id
            });
            if (product === null) {
                resolve({
                    status: 'OK',
                    message: 'The order is not defined',
                });
            }
            
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createdOrder,
    getDetailsOrder
}
