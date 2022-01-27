const {Product, Sequelize, Token, User, Order} = require('../models/index.js');
const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config/config.json')['development'];
const bcrypt = require('bcryptjs');
const {Op} = Sequelize;
const UserController = {
    async register(req, res) {
        try {
            if(!req.body.name || !req.body.email || !req.body.password){
                return res.status(400).json({msg:'Rellene todos los campos'})
            }
            const { password } = req.body
            if (/^[a-zA-Z]\w{3,14}$/i.test(password) !== true) {
                return res.send(
                  "Reglas a la hora de crear una contraseña: ·El primer carácter de la contraseña debe ser una letra ·debe contener al menos 4 caracteres ·No más de 15 caracteres ·No se pueden usar más  caracteres que letras, números o guiones bajos."
                );
            }
            const hash = await bcrypt.hash( password, 10)
            const newUser = await User.create({...req.body, password: hash, rol: 'user'})
            res.status(201).send({ newUser })
        } catch (error) {
            if(error.errors?.length > 0){
                res.status(400).send({ msg: error?.errors?.[0]?.message })
            }
            res.status(500).send({message:"Ha habido un problema al crear el usuario"})
        }
    },async login(req, res) {
        try {
            const user = await User.findOne({
                where:{
                    email:req.body.email
                }
            })
            if (!user) {
                return res.status(400).send({ message: 'Contraseña o nombre incorrectos' });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password)

            if (!isMatch) {
                return res.status(400).send({ message: 'Contraseña o nombre incorrectos' });
            }

            token = jwt.sign({ id: user.id }, jwt_secret);
            Token.create({ token, UserId: user.id });

            res.send({ message: 'Bienvenid@ ' + user.name, token });

        } catch (error) {
            console.error(error);
            res.status(500).send({message:"Ha habido un problema al intentar hacer el login"})
        }
    }, getUserByOrders(req, res) {
        User.findByPk(req.params.id, {
            include: [
            {model: Order, include: [{model: Product, as: 'products', through: {attributes: []}}]} 
        ]
        })
            .then(user => res.send(user))
            .catch(err => {
                console.error(err)
                res.status(500).send({ message :'No se ha podido cargar el usuario'})
            })
    },
    async logout(req, res) {
        try {
            await Token.destroy({
                where: {
                    [Op.and]: [
                        { UserId: req.user.id },
                        { token: req.headers.authorization }
                    ]
                }
            });
            res.send({ message: 'Usuario desconectado' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'Hubo un problema al realizar el logout' })
        }
    }

}

module.exports = UserController;