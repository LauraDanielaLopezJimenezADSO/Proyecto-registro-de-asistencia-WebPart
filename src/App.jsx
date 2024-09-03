import { useState } from 'react'
import './App.css'
import PrimaryButton from './components/buttons/primaryButton'
import InputField from './components/inputs/inputFile'
import LoginController from "./context/AppContoller/LoginController.js";
import {useAuth} from "./context/API/APISessionManager/userSession.jsx";
import AprendizAppHome from "./components/AprendizComponents/AprendizApp/AprendizAppHome.jsx";
import InstructorAppHome from "./components/InstructorComponents/InstructorApp/InstructorAppHome.jsx";



function App() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('Aprendiz');
  const { user, login } = useAuth(); // Usa el contexto de autenticación
  const [currentView, setCurrentView] = useState('login'); // Estado para manejar la vista actual

  const handleLogin = async () => {
    try {
      const credentials = await LoginController(usuario, contrasena, rol);
      if (credentials) {
        await login(credentials); // Guarda las credenciales en el contexto
        // Cambia la vista basada en el rol
        if (rol === "Instructor") {
          setCurrentView('instructor');
        } else {
          setCurrentView('aprendiz');
        }
      } else {
        alert('Login fallido, revisa tus credenciales.');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  // Función para manejar el logout y volver a la vista de login
  const handleLogout = () => {
    setCurrentView('login'); // Cambia la vista al estado de login
  };

  // Renderiza la vista correcta basada en el estado actual
  if (currentView === 'login') {
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
              <PrimaryButton texto="Ingresar" clase="PrimaryButton" onClick={handleLogin} />
            </section>
          </div>
        </section>
    );
  }

  // Renderiza las vistas según el rol
  if (currentView === 'aprendiz') {
    return <AprendizAppHome onLogout={handleLogout} />; // Pasa la función de logout al componente
  }

  if (currentView === 'instructor') {
    return <InstructorAppHome onLogout={handleLogout} />; // Pasa la función de logout al componente
  }

  return null; // Manejo adicional si es necesario
}

export default App;
