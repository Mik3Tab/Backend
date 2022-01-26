const {Product} = require('../models/index');

const ProductController = {
    insert(req,res){
        Product.create({...req.body})
        .then(product=>{
            product.addProduct(req.body.productId)
            res.send('Producto creado', req.params.body)
        })
        .catch(err => console.err(err));
        
    }, async delete(req,res){
        try{
            await Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.send({message: 'El producto ha sido borrado.'});
        }catch (error){
            console.log('Ha habido un error');
        }
    }
}

module.exports = ProductController;