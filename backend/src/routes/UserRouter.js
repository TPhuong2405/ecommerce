const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { authMiddleWare, authUserMiddleWare } = require('../middleware/authMiddleware');

// router.post('/', userController.createUser);
router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.post('/sign-out', userController.logoutUser);
router.put('/update-user/:id', authUserMiddleWare, userController.updateUser);
router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser);
router.get('/getAll', authMiddleWare, userController.getAllUser);
router.get('/get-details/:id', authUserMiddleWare, userController.getDetailsUser);
router.post('/refresh-token', userController.refreshToken);
router.post('/delete-many', authMiddleWare, userController.deleteManyUser);

module.exports = router;







