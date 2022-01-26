const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.post('/createProduct',ProductController.insert);
router.delete('/deleteProduct/:id',ProductController.delete);

module.exports = router;