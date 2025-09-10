const OrderService = require('../services/OrderService');

// createProduct
const createOrder = async (req, res) => {
    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body;
        console.log("req.body",req.body)
        if ( !paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            }); 
        } 

        const response = await OrderService.createdOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.error("Error in createUser controller:", e); // NOTE 5: Log lỗi
        return res.status(404).json({
            message: e 
        });
    }
}

const getDetailsOrder = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            });
        }
        
        const response = await OrderService.getDetailsOrder(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e || 'An error occurred while updating the user.'
        });
    }
}

module.exports = {
    createOrder,
    getDetailsOrder
}






