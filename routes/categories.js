const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();

router.post('/createCategory', CategoryController.insert);


module.exports = router;