const Employee = require("../models/employee.models");
const catchAsync = require("../utils/catchAsync");


exports.findAllEmployee = catchAsync(async (req, res) => {

    // BUSCAMOS TODOS LOS EMPLEADOS CON STATUS ACTIVE
    const employees = await Employee.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
            status: 'active',
        }
    });

    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The employees has been show.',
        //Enviamos todos las personas
        employees

    });

});


exports.findEmployee = catchAsync(async (req, res) => {

    // DESTRUCTURING DE LA REQ
    const { employee } = req;

    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The employee was found successfully.',
        //Enviamos el empleado a consultar
        employee
    });

});


exports.createEmployee = catchAsync(async (req, res) => {

    // OBTENER INFORMACION  DEL REQ BODY
    const { name, email, age, address } = req.body;

    // CREAR UN NUEVO EMPLEADO
    const employee = await Employee.create({
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        age,
        address: address.toLowerCase(),
    });

    // RESPUESTA DEL SERVIDOR
    res.status(201).json({
        status: 'success',
        message: 'The employee was created. ',

        employee,

    });

});


exports.updateEmployee = catchAsync(async (req, res) => {

    // DESTRUCTURING DE LA REQ
    const { employee } = req;

    // OBTENER INFORMACION A ACTUALIZAR DEL REQ BODY
    const { name, email, age, address } = req.body;

    // BUSCAR EL EMPLEADO A ACTUALIZAR
    const updateEmployee = await employee.update({
        name,
        email,
        age,
        address,
    });

    // SI NO EXISTE ENVIAMOS UN ERROR
    res.status(200).json({
        status: 'success',
        message: 'The employee has been update successfully',

        updateEmployee,

    });

});


exports.disableEmployee = catchAsync(async (req, res) => {

    // DESTRUCTURING DE LA REQ
    const { employee } = req;

    // OBTENER INFORMACION A ACTUALIZAR DEL REQ BODY
    await employee.update({
        status: 'disabled'
    });
    // await product.destroy();

    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The employee has been disabled',
    });

});


exports.deleteEmployee = catchAsync(async (req, res) => {

    // DESTRUCTURING DE LA REQ
    const { employee } = req;

    // OBTENER INFORMACION A ACTUALIZAR DEL REQ BODY
    await employee.destroy();

    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The employee has been deleted',
    });

});
