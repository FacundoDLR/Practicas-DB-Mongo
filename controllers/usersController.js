
/* const db = [
    {
        id: 1,
        nombre: "Joel"
    },
    {
        id: 2,
        nombre: "Diego"
    },
] */

const User = require('../models/User')

const getUsers = async (req, res) => {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
};

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
}

const getUserByName = async (req, res) => {
    const user = await User.findOne({username: req.query.user});

    res.status(200).json({user, msg: "Ok"});
}

const postUser = async (req, res) => {
    const user = new User(req.body);

    await user.save();
    res.status(201).json({username: user.username, msg: "Ok"})
}

module.exports = {getUsers, getUserById, getUserByName, postUser}