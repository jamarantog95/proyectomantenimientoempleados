
import axios from 'axios'
// Importamos los Hooks (Enganche)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const URL_Backend = 'http://localhost:4000/api/v1/employee'

const CompCreateEmployee = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [address, setAddress] = useState('')


    const navigate = useNavigate()

    const createEmployee = async (e) => {
        e.preventDefault()
        await axios.post(URL_Backend, {
            name: name,
            email: email,
            age: age,
            address: address,
        })
        navigate('/')
    }

    return (
        <div>
            <h3>Crear Empleado</h3>
            <form onSubmit={createEmployee} className='mx-5 my-3'>
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

                <button type='submit' className='btn btn-primary'>Guardar</button>
            </form>
        </div>
    )
}

export default CompCreateEmployee;