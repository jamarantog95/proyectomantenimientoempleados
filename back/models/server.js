
const { db } = require('../database/db');
const { rateLimit } = require('express-rate-limit');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const xss = require('xss-clean');

const { employeeRouter } = require('../routes/employee.routes');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/error.controller');



class Server {
    constructor() {
        //DEFINIMOS LA APLICACIÓN DE EXPRESS Y SE LA ASIGNAMOS A LA PROPIEDAD APP
        this.app = express();
        //DEFINIMOS EL PUERTO QUE LO TENEMOS EN LOS ENVIROMENTS
        this.port = process.env.PORT || 4000;
        // DEFINIMOS EL NRO DE PETICIONES QUE VA A PERMITIR POR LIMITE DE TIEMPO
        this.limiter = rateLimit({
            max: 100,
            windowMs: 60 * 60 * 1000,
            message: 'To many request from this IP, please try again in a hour!'
        });

        this.paths = {
            employees: '/api/v1/employee',
            // employees: '/employee',
        };

        // INVOCAR AL METODO DE CONEXION DE BASE DE DATOS
        this.database();

        // INVOCAMOS AL METODO MIDDLEWARES
        this.middlewares();

        // INVOCAMOS AL METODO DE ROUTES
        this.routes();
    }


    middlewares() {
        //Configura los header para prevenir posibles ataques a la aplicacion
        this.app.use(helmet());

        this.app.use(xss());

        this.app.use(hpp());

        if (process.env.NODE_ENV === 'development') {
            console.log('HOLA ESTOY EN DESARROLLO');
            // Se usa para el MODO DESARROLLO
            this.app.use(morgan('dev'));
        }


        // Utilizamos el LIMITER para todas nuestras rutas que empiecen con api/v1
        this.app.use('/api/v1/', this.limiter);
        // Utilizamos las CORS para permitir acceso a la API
        this.app.use(cors());
        // Utilizamos EXPRESS.JSON para parsear el BODY de la REQUEST
        this.app.use(express.json());
    }


    routes() {
        // Utilizar las rutas de comidas
        this.app.use(this.paths.employees, employeeRouter);


        this.app.all('*', (req, res, next) => {
            return next(
                new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
            );
        });


        this.app.use(globalErrorHandler);
    }


    database() {
        db.authenticate()
            .then(() => console.log('Database authenticaded'))
            .catch(error => console.error());

        // db.sync({ force: true }) // delete values on table
        db.sync()
            .then(() => console.log('Database synced'))
            .catch(error => console.error());
    }

    // METODO LISTEN: esta esuchando solicitudes del puerto 3000
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server is running on port", this.port)
        })

    }
}

module.exports = Server;