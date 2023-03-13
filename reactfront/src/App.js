

import './App.css';
// Importamos los componentes
import CompShowEmployees from './employee/ShowEmployees';
import CompCreateEmployee from './employee/CreateEmployee';
import CompEditEmployee from './employee/EditEmployee';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h2>Mantenimiento de Empleados</h2>
            </header>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<CompShowEmployees />} />
                    <Route path='/create' element={<CompCreateEmployee />} />
                    <Route path='/edit/:id' element={<CompEditEmployee />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;