
import axios from 'axios'
// Importamos los Hooks (Enganche)
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const URL_Backend = 'http://localhost:4000/api/v1/employee'

const CompShowEmployees = () => {

    const [employees, setEmployee] = useState([])
    useEffect(() => {
        getEmployees()
    }, [])


    const getEmployees = async () => {
        const res = await axios.get(URL_Backend)
        setEmployee(res.data.employees)
        // console.log(res.data.employees);

    }


    const disableEmployee = async (id) => {
        await axios.delete(`${URL_Backend}/${id}`)
        getEmployees()
    }


    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>

                    <Link to="/create" className='btn btn-primary mt-2 mb-2'>Nuevo Empleado</Link>

                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Nombres</th>
                                <th>Correo Electronico</th>
                                <th>Edad</th>
                                <th>Domicilio</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Recorremos el arreglo de empleados */}

                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.age}</td>
                                    <td>{employee.address}</td>
                                    <td>
                                        <Link to={`/edit/${employee.id}`} className='btn btn-info'><i className='fa fa-edit'></i></Link>
                                        <button onClick={() => disableEmployee(employee.id)} className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )

}

export default CompShowEmployees;