const ProductService = require('../services/ProductService')

// createProduct
const createProduct = async (req, res) => {
    try {
        console.log(req.body);
        const { name, image, type, price, countInStock, rating, description } = req.body;

        if (!name || !image || !type || !price || !countInStock || !rating ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        } 

        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.error("Error in createUser controller:", e); // NOTE 5: Log lỗi
        return res.status(404).json({
            message: e 
        });
    }
}

// updateProduct
const updateProduct = async (req, res) => {
    try {
        const ProductId = req.params.id
        const data = req.body
        if (!ProductId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ProductId is required'
            });
        }
        const response = await ProductService.updateProduct(ProductId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e 
        });
    }
}

// getProductDetails
const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const token = req.headers
        console.log('token', token)
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            });
        }
        
        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e || 'An error occurred while updating the user.'
        });
    }
}

// deleteProduct
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const token = req.headers
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            });
        }
        
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e 
        });
    }
}

// deleteManyProduct
const deleteManyProduct = async (req, res) => {
    console.log('req', req)
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            });
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e 
        });
    }
}

// getAllProduct
const getAllProduct = async (req, res) => {
    console.log("req.query", req.query);
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter) 
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e 
        });
    }
}

// getAllType
const getAllType = async (req, res) => {
    console.log("req.query", req.query);
    try {
        const response = await ProductService.getAllType() 
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e 
        });
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType
}






