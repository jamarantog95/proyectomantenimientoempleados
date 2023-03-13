const Employee = require("../models/employee.models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.validEmployeeById = catchAsync(async (req, res, next) => {
    // OBTENEMOS ID DE LA REQ PARAMS
    const { id } = req.params;

    // BUSCAR EL EMPLEADO DE FORMA INDIVIDUAL
    const employee = await Employee.findOne({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
            // id:id,
            id,
            status: 'active',
        },
    });

    // SI NO EXISTE ENVIAMOS UN ERROR
    if (!employee) {
        return next(new AppError('Employee not found', 404));
    }

    req.employee = employee;
    next();

});

