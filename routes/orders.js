const express = require('express');
const OrderController = require('../controllers/OrderController');
const router = express.Router();

router.post('/insert',OrderController.insert);
router.put('/:id', OrderController.update);
router.get('/getById/:id',OrderController.getById);
router.delete('/delete/:id', OrderController.delete);
module.exports = router;