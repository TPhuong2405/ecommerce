const UserRouter = require('./UserRouter'); // thêm dòng này để import UserRouter
const ProductRouter = require('./ProductRouter'); // thêm dòng này để import ProductRouter

const routes = (app) => {
    app.use('/api/user', UserRouter) 
    app.use('/api/product', ProductRouter) 
}

module.exports = routes
