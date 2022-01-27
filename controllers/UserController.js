const {Product, Category, Sequelize, Token, User} = require('../models/index.js');
const express = require('express');
const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config/config.json');
const UserController = {
    async register(req, res) {
        try {
            if(!req.body.name || !req.body.email || !req.body.password){
                return res.status(400).json({msg:'Rellene todo slos campos'})
            }
            const { password } = req.body
            if (/^[a-zA-Z]\w{3,14}$/i.test(password) !== true) {
                return res.send(
                  "Reglas a la hora de crear una contraseña: ·El primer carácter de la contraseña debe ser una letra ·debe contener al menos 4 caracteres ·No más de 15 caracteres ·No se pueden usar más  caracteres que letras, números o guiones bajos."
                );
            }
            const user = await User.findOne({
                where:{
                    email:req.body.email
                }
            })
            if (user) {
                return res.status(400).send({ message: 'Este correo está siendo utilizado por otro usuario' });
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
    },login(req,res){
        User.findOne({
            where:{
                email:req.body.email
            }
        }).then(user=>{
            if(!user){
                return res.status(400).send({message:"Usuario o contraseña incorrectos"})
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if(!isMatch){
                return res.status(400).send({message:"Usuario o contraseña incorrectos"})
            }
            token = jwt.sign({id: user.id}, jwt_secret);
            Token.create({token, UserId: user.id});
            res.send({message: 'Bienvenid@ ' + user.name, user, token});
        })
    }

}

module.exports = UserController;