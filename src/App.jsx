import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PrimaryButton from './components/buttons/primaryButton'
import InputField from './components/inputs/inputFile'



function App() {
  const [documento, setDocumento] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('Aprendiz'); // Valor inicial
  const [tipo, setTipo] = useState('Documento'); // Valor inicial

  const handleLogin = () => {
    console.log('Documento:', documento);
    console.log('Contraseña:', contrasena);
    console.log('Rol:', rol);
    console.log('Tipo:', tipo);
  };

  return (
    <div className="contenedor">
      <section className='section__figure'>
        <figure className='figure'>
          <img className='imgLogo' src="src/util/icons/LogoSena.png" alt="Logo sena" />
        </figure>
      </section>

      <section className="sectionLogin">
        <h2 className='subtituloLogin'>Ingreso al Control de Asistencias</h2>
        <form className='formularioLogin'>
          
          <div className="formularioSelect">
            <InputField 
              label="Documento"
              id="documento"
              type="text"
              placeholder='Escriba su documento'
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />

            <div className="tipo">
              <select 
                id="tipo" 
                value={tipo} 
                className='selectOption'
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="Documento">Documento</option>
                <option value="CC">CC</option>
                <option value="TI">TI</option>
                <option value="PPT">PPT</option>
              </select>
            </div>
          </div>
          
          <div className='formularioSelect'>
            <InputField    
              label="Contraseña"
              id="contrasena"
              type="password"
              placeholder='Escriba su contraseña'
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />

            <div className="rol">
              <select 
                id="rol" 
                value={rol} 
                className='selectOption'
                onChange={(e) => setRol(e.target.value)}
              >
                <option value="Aprendiz">Aprendiz</option>
                <option value="Instructor">Instructor</option>
                <option value="Admin">Administrador</option>
              </select>
            </div>
          </div>
          <div>
        
        <a href="src/pages/InstructorPages/InstructorHomeScreen.html" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
        </form>

        <PrimaryButton texto="Ingresar" clase="PrimaryButton" link="src/pages/InstructorPages/InstructorHomeScreen.html" onClick={handleLogin} />
      </section>
    </div>
  );
}

export default App;
