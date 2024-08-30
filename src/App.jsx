import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PrimaryButton from './components/buttons/primaryButton'
import InputField from './components/inputs/inputFile'
import LoginController from "./context/AppContoller/LoginController.js";



function App() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('Aprendiz');

  const handleLogin = async () => {
    try {
      await LoginController(usuario, contrasena, rol);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
      <section className="LoginSection">
        <div className="contenedor">
          <section className='section__figure'>
            <figure className='figure'>
              <img className='imgLogo' src="./public/icons/LogoSena.png" alt="Logo sena" />
            </figure>
          </section>

          <section className="FormSection">
            <h2 className='subtituloLogin'>Ingreso al Control de Asistencias</h2>
            <form className='formularioLogin' onSubmit={(e) => e.preventDefault()}>
              <div className="formularioSelect">
                <InputField
                    label="Documento"
                    id="documento"
                    type="text"
                    placeholder='Escriba su documento'
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
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
                  </select>
                </div>
              </div>
            </form>
            {/* Asegúrate de que onClick solo pase la referencia de handleLogin */}
            <PrimaryButton texto="Ingresar" clase="PrimaryButton" onClick={handleLogin} />
          </section>
        </div>
      </section>
  );
}

export default App;
