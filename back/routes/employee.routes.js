
const { Router } = require("express");
const { check } = require("express-validator");
const { findAllEmployee, findEmployee, createEmployee, updateEmployee, disableEmployee, deleteEmployee } = require("../controllers/employee.controller");
const { validEmployeeById } = require("../middlewares/employee.middlewares");
const { validateFields } = require("../middlewares/validatefield.middlewares");

const router = Router();



router.get('/', findAllEmployee);


router.get('/:id',
    validEmployeeById,
    findEmployee);


router.post('/', [
    // isEmpty: Valida que no este vacio
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('age', 'The age is required').not().isEmpty(),
    check('address', 'The address is required').not().isEmpty(),

    // isEmail: Valida que este en formato de correo electronico
    check('email', 'The email must be a correct format').isEmail(),
    // isInt: Valida si el valor ingresado es un entero
    check('age', 'The age must be range a 1 or 99').isInt({ min: 1, max: 99 }),

    validateFields,
], createEmployee);

router.patch('/:id', [
    // isEmpty: Valida que no este vacio
    check('name', 'The name is required').not().isEmpty(),
    check('address', 'The address is required').not().isEmpty(),

    validateFields,
    validEmployeeById,
], updateEmployee);


router.delete('/:id',
    validEmployeeById,
    disableEmployee);

router.delete('/del/:id',
    validEmployeeById,
    deleteEmployee);



module.exports = {
    employeeRouter: router,
}