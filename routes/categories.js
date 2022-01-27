const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();

router.post('/createCategory', CategoryController.insert);
router.get('/getAll',CategoryController.getAll);
router.get('/getById/:id',CategoryController.getById);
router.get('/getByName/:name', CategoryController.getOneByName);
router.put('/updateCategory/:id', CategoryController.update);
router.delete('/delete',CategoryController.delete);

module.exports = router