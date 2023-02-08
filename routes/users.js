const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validarUsername = require('../middlewares/validarUsername');

/* GET users listing. */
router.get('/', usersController.getUsers);

router.get('/buscar', usersController.getUserByName);

router.get('/:id', usersController.getUserById);

router.post('/registro', 
    [
        check("username")
            .not()
            .isEmpty()
            .withMessage("El nombre de usuario es obligatorio"),
        check("password")
            .not()
            .isEmpty()
            .isNumeric()
            .withMessage("El password de usuario es obligatorio y solo acepta numeros")
            .isLength({
                min: 6,
                max: 10
            })
            .withMessage("El minimo de caracteres del password es de 6 y maximo 10"),
        check("email")
            .not()
            .isEmpty()
            .withMessage("El email es obligatorio")
            .isEmail()
            .withMessage("El email debe ser valido"),
    ], validarUsername,
    usersController.postUser
);

router.put('/actualizar/:id', usersController.putUser);

router.delete('/eliminar/:id', usersController.deleteUser);

module.exports = router;
