const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Forma de importar en node/express va a ser con "require"
//Voy a declarar una variable en la cual voy a guardar el resultado de require
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productosRouter = require('./routes/productos');
const serviciosRouter = require('./routes/servicios');

const conection = require('./db/dbConection')

const app = express();

//Configurando y utilizando MIDDLEWARES
app.use(logger('dev'));
app.use(express.json()); //Nos va a permitir enviar nuestras respuestas ne formato JSON
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//RUTAS
app.use('/', indexRouter); //Ruta Principal
app.use('/users', usersRouter);
app.use('/productos', productosRouter);
app.use('/servicios', serviciosRouter);

conection();

module.exports = app;
