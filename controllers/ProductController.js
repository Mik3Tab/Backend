const {Product, Category, Sequelize, Order} = require('../models/index');
const { Op } = Sequelize;

const ProductController = {
    insert(req,res){
        if(!req.body.name || !req.body.price || !req.body.CategoryId){
            return res.status(400).json({msg:'Por favor rellene todos los campos del producto'})
        }
        Product.create({...req.body})
        .then(product=>{
            res.send({ message: 'Producto creado', product})
        })
        .catch(err => console.error(err));
        
    }, async delete(req,res){
        try{
            await Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.send({message: 'El producto ha sido borrado.'});
        }catch (error){
            console.error('Ha habido un error');
        }
    }, 
    getAll(req,res){
        Product.findAll({
            include: [
                {model: Order, as: 'orders', through: {attributes: []}},Category
            ]
        })
        .then(products => res.send(products))
        .catch(err=>{
            console.error(err)
            res.status(500).send({message: 'Ha habido un problema al cargar los productos.'});
        })
    },
        getById(req,res){
            Product.findByPk(req.params.id)
            .then(products => res.send(products))
            .catch(err => {
                console.error(err);
                res.status(500).send({message: 'Ha habido un problema con el servidor'});
            })
        }, async update(req,res){
            try{
                const {products, ...data} = req.body
                const product = await Product.findByPk(req.params.id)
                product.update(data);
                
                if(products && products.length > 0) {
                    product.setProducts(products)
                }
                res.status(200).send({message: 'Producto actualizado con éxtio', product})
            }catch(err){
                console.error(err)
                res.status(200).send({message: 'No se ha podido actualizar el producto'})
            }
        }, async delete(req,res){
            try{
                await Product.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                res.status(200).send({message: 'Producto eliminado con éxito.'});
            }catch(err){
                console.error(err)
                res.status(500).send({message: 'Ha habido un problema al eliminar el producto.'});
            }
        }, getOneByName(req,res){
            Product.findOne({
                where: {
                    name: {
                        [Op.like]: `%${req.params.name}`
                    }
                }
            }).then(product => res.send(product))
            .catch(err =>{
                console.error(err)
                res.status(500).send({message: 'No se ha podido cargar el producto por su nombre'})
            })
        }, getAllByPrice(req,res){
            Product.findAll({
                where: {
                    price: {
                        [Op.like]: `${req.params.price}`
                    }
                }
            })
            .then(product => res.send(product))
            .catch(err=>{
                console.error(err)
                res.status(500).send({message: 'No se ha podido cargar el producto por su precio'})
            })
        }, getAllOrder(req,res){
            Product.findAll({
                include:[{model: Category, as: 'categories', through: {attributes: []}}],
                order: [
                    ['price', 'DESC']
                ]
            })
            .then(products => res.send(products))
            .catch(err=>{
                console.error(err)
                res.status(500).send({message: 'Ha habido un problema al cargar los productos ordenados por precio'})
            })
        },
        
}

module.exports = ProductController;