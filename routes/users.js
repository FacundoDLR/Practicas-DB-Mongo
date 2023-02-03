const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')

/* GET users listing. */
router.get('/', usersController.getUsers);

router.get('/buscar', usersController.getUserByName);

router.get('/:id', usersController.getUserById);

router.post('/registro', usersController.postUser)

router.put('/actualizar/:id', usersController.putUser)

router.delete('/eliminar/:id', usersController.deleteUser)

module.exports = router;
