
import axios from 'axios'
// Importamos los Hooks (Enganche)
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



const URL_Backend = 'http://localhost:4000/api/v1/employee'

const CompEditEmployee = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [address, setAddress] = useState('')

    const navigate = useNavigate()
    const { id } = useParams();


    // Procemiento de Actualizacion
    const updateEmployee = async (e) => {
        e.preventDefault()
        await axios.patch(URL_Backend + '/' + id, {
            name,
            email,
            age,
            address,
        })
        navigate('/')
    }

    useEffect(() => {
        getEmployeeById()
    }, [])


    const getEmployeeById = async () => {
        const res = await axios.get(URL_Backend + '/' + id)
        setName(res.data.employee.name)
        setEmail(res.data.employee.email)
        setAge(res.data.employee.age)
        setAddress(res.data.employee.address)
    }



    return (
        <div>
            <h3>Editar Empleado</h3>
            <form onSubmit={updateEmployee} className='mx-5 my-3'>
                <div className='mb-3'>
                    <label className='form-label'>Nombres</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='form-control'></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Correo Electronico</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='form-control'></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Edad</label>
                    <input value={age} onChange={(e) => setAge(e.target.value)} type="text" className='form-control'></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Domicilio</label>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className='form-control'></input>
                </div>

                <button type='submit' className='btn btn-primary'>Editar</button>
            </form>
        </div>
    )
}

export default CompEditEmployee;