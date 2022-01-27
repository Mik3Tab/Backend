const { Product, Order } = require('../models/index.js');

const OrderController = {
    insert(req,res){
        Order.create(req,res)
        .then(order=>{
            res.send({ message: 'Pedido creado', order})
        })
        .catch(err => console.error(err));
        
    }, async delete(req,res){
        try{
            await Order.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.send({message: 'El pedido ha sido borrado.'});
        }catch (error){
            console.error('Ha habido un error');
        }
    }, getAll(req,res){
        Order.findAll()
        .then(orders => res.send(orders))
        .catch(err=>{
            console.error(err)
            res.status(500).send({message: 'Ha habido un problema al cargar los pedidos.'})
        })
    },
        getById(req,res){
            Order.findByPk(req.params.id)
            .then(orders => res.send(orders))
            .catch(err => {
                console.error(err);
                res.status(500).send({message: 'Ha habido un problema recibiendo los pedidos por id'});
            })
        }, async update(req,res){
            try{
                const {orders, ...data} = req.body
                const order = await order.findByPk(req.params.id)
                product.update(data);
                
                if(orders && orders.length > 0) {
                    product.setOrders(orders)
                }
                res.status(200).send({message: 'Producto actualizado con éxtio', order})
            }catch(err){
                console.error(err)
                res.status(200).send({message: 'No se ha podido actualizar el pedido'})
            }
        }, async delete(req,res){
            try{
                await Order.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                res.status(200).send({message: 'Pedido eliminado con éxito.'});
            }catch(err){
                console.error(err)
                res.status(500).send({message: 'Ha habido un problema al eliminar el producto.'});
            }    
    }
}

module.exports = OrderController;