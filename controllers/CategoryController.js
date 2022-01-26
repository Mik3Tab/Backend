const {Category} = require('../models/index');

const CategoryController = {
    insert(req,res){
        Category.create({...req.body})
        .then(category=>{
            category.addCategory(req.body.id)
            res.send('Categoría creada', req.params.body)
        })
        .catch(err => console.error(err));
    }
}

module.exports = CategoryController;