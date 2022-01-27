const { send } = require('express/lib/response');
const {Category, Sequelize} = require('../models/index');
const {Op} = Sequelize;

const CategoryController = {
    async insert(req,res){
        Category.create({...req.body})
        .then(category=>{
            category.addCategory(req.body.id)
            res.send({message: 'Categoría creada'}, req.params.body)
        })
        .catch(err => console.error(err));
    }, getAll(req,res){
        Category.findAll({
            include: [{model:Category, as: 'categories', through: {attributes: []}}]
        })
        .then(categories=>send.res(categories))
        .catch(err=>{
            console.log(err)
            res.status(500).send({message: 'Ha habido un problema al cargar todas las categorias'});
        })
    },getById(req, res) {
        Category.findByPk(req.params.id)
            .then(category => res.send(category))
            .catch(err => {
                console.error(err)
                res.status(500).send({ message :'No se ha podido cargar la categoría'})
            })
    },getOneByName(req, res) {
        Category.findOne({
                where: {
                    name: {
                        [Op.like]: `%${req.params.name}%`
                    }
                }
            })
            .then(category => res.send(category))
            .catch(err => {
                console.error(err)
                res.status(500).send({ message :'No se ha podido cargar la categoría por su nombre'})
            })
    },async update(req, res) {
        try {
            const { categories, ...data} = req.body 
            const category = await Category.findByPk(req.params.id)
            category.update(data)

            if (categories && categories.length > 0) {
                category.setCategories(categories)
            }

            return res.status(200).send({ message: 'Categoria actualizada con éxito', category })  
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"No ha sido posible actualizar la categoría"})
        }
    },async delete(req, res) {
        try {
            await Category.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.send(
                'La categoría se ha eliminado con éxito'
            )
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"Ha habido un problema al eliminar la categoría"})
        }
    }
}

module.exports = CategoryController;