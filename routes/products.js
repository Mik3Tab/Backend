const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.post('/createProduct',ProductController.insert);
router.delete('/deleteProduct/:id',ProductController.delete);
router.get('/',ProductController.getAll);
router.get('/getById/:id',ProductController.getById);
router.put('/update/:id', ProductController.update);
router.delete('/delete/:id',ProductController.delete);
router.get('/getByName/:name',ProductController.getOneByName);
router.get('/getByPrice/:price', ProductController.getAllByPrice);
router.get('/getByPriceOrder', ProductController.getAllOrder);
module.exports = router;