const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const {authentication} = require('../middleware/authentication')

router.post('/register', UserController.register);
router.post('/login',UserController.login);
router.get('/getUserByOrders/:id', UserController.getUserByOrders);
router.delete('/logout',authentication,UserController.logout);
module.exports = router;

