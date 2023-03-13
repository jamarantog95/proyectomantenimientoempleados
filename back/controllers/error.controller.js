const AppError = require("../utils/appError");

// Handle Tipo de Datos que no coincide
const handleCastError22P02 = () =>
    new AppError('Someone type of data send does not match the expected one.', 400);


// Error de Programacion o Desarrollo - codigo 400 - ocasionado por el desarrollador (envia mensaje )
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

// Error Operacional o Produccion - codigo 500 - ocasionado por el cliente (envia mensaje error)
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Programming other unknow error: Don't show error details.
        console.error('Error!', err);

        res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong!',
        });
    }
};


const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    // Entorno Desarrollo (stack de errores en postman)
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }

    // Entorno Produccion
    if (process.env.NODE_ENV === 'production') {
        let error = { ...err };

        if (!error.parent?.code) {
            error = err;
        }
        // console.log(error);

        if (error.parent?.code === '22P02') error = handleCastError22P02(error);


        sendErrorProd(error, res);
    }
};

module.exports = globalErrorHandler;