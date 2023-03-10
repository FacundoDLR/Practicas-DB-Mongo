
const { validationResult } = require('express-validator');
const User = require('../models/User')
const bcrypt = require('bcrypt')

const getUsers = async (req, res) => {
    const usuarios = await User.find();
    res
    .status(200)
    .json(usuarios);
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(user){
            res
            .status(200)
            .json({
                username: req.body.username, 
                msg: "El usuario ha sido encontrado correctamente"
            })
        }else{
            res
            .status(404)
            .json({
                username: null, 
                msg: "El ID no es valido"
            })
        }
        
    } catch (error) {
        
    }

    res.status(200).json(user);
}

//Obtener nuevo documento/registro/usuario por valor de propiedad de username
const getUserByName = async (req, res) => {
    const user = await User.findOne({username: req.query.user});

    res.status(200).json({user, msg: "Ok"});
}

//Crear nuevo documento/registro/usuario
const postUser = async (req, res) => {

    try {

        const validationError = validationResult(req);

        if(validationError.isEmpty()){

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const hashedUser = {
                username: req.body.username,
                password: hash,
                email: req.body.email,
            }

            const user = new User(hashedUser);

            await user.save();
            res
            .status(201)
            .json({
                username: user.username, 
                msg: "Ok", 
                error: null
            }) 

        }else{
            res
            .status(400)
            .json({
                username: null, 
                msg: "Los datos son incorrectos",
                error: validationError.errors
            })
        }
    } catch (error) {
        res
        .status(500)
        .json({username: req.body.username, 
            msg: "Error", 
            error: error.message
        })
    }
};

//Actualizacion de documento/registro/usuario
const putUser = async (req, res) => {

    try {

        await User.findByIdAndUpdate(req.params.id, req.body);

        res
        .status(200)
        .json({
            username: req.body.username, 
            msg: "El usuario ha sido actualizado correctamente"
        })

    } catch (error) {
        res
        .status(500)
        .json({
            msg: "Error - " + error.message
        })
    }
}

//Eliminacion de documento/registro/usuario
const deleteUser = async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if(user){
            res
            .status(200)
            .json({
                username: req.body.username, 
                msg: "El usuario ha sido eliminado correctamente"
            })
        }else{
            res
            .status(404)
            .json({
                username: null, 
                msg: "El ID no es valido"
            })
        }

    } catch (error) {
        res
        .status(500)
        .json({
            msg: "Error - " + error.message
        })
    }
}


module.exports = {getUsers, getUserById, getUserByName, postUser, putUser, deleteUser}