import { useState } from 'react';
import './App.css';
import PrimaryButton from './components/buttons/primaryButton';
import InputField from './components/inputs/inputFile';
import LoginController from "./context/AppContoller/LoginController.js";
import { useAuth } from "./context/API/APISessionManager/userSession.jsx";
import AprendizAppHome from "./components/AprendizComponents/AprendizApp/AprendizAppHome.jsx";
import InstructorAppHome from "./components/InstructorComponents/InstructorApp/InstructorAppHome.jsx";
import { createTheme } from "@mui/material/styles";
import { Message } from 'rsuite'; // Importar rsuite para mensajes e íconos
import { ErrorToast } from "./components/SweetAlertsComponents/ErrorAlerts.jsx";
import 'rsuite/dist/rsuite-no-reset.min.css';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#39A900',
    },
    secondary: {
      main: '#002240',
    },
  },
});

function App() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('Aprendiz');
  const [usuarioError, setUsuarioError] = useState(false);
  const [contrasenaError, setContrasenaError] = useState(false);
  const { user, login } = useAuth();
  const [currentView, setCurrentView] = useState('login');

  // Función para manejar la validación
  const validate = () => {
    let hasErrors = false;
    if (!usuario) {
      setUsuarioError(true);
      hasErrors = true;
    } else {
      setUsuarioError(false);
    }

    if (contrasena.length < 8) {
      setContrasenaError(true);
      hasErrors = true;
    } else {
      setContrasenaError(false);
    }

    return hasErrors;
  };

  // Función para manejar el login
  const handleLogin = async () => {
    const hasErrors = validate(); // Llama a la validación
    if (hasErrors) {
      return; // Si hay errores, no continúa
    }

    try {
      const credentials = await LoginController(usuario, contrasena, rol);
      if (credentials) {
        await login(credentials);
        if (rol === "Instructor") {
          setCurrentView('instructor');
          setUsuario("");
          setContrasena("");
        } else {
          setCurrentView('aprendiz');
          setUsuario("");
          setContrasena("");
        }
      } else {
        // Mostrar el error mixin si las credenciales son incorrectas
        ErrorToast.fire({
          icon: "error",
          title: "Usuario o Contraseña incorrectos. Por favor, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      // Mostrar un mixin de error para los problemas de autenticación
      ErrorToast.fire({
        icon: "error",
        title: "Ocurrió un error durante el inicio de sesión.",
      });
    }
  };

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
              <form autoComplete="off" className='formularioLogin' noValidate onSubmit={(e) => e.preventDefault()}>
                <div className="formularioSelect">
                  <InputField
                      label="Documento"
                      id="documento"
                      type="text"
                      placeholder='Escriba su documento'
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                      inputClass={`input ${usuarioError ? "errorInput" : ""}`}
                  />
                  {usuarioError ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" style={{marginBottom: "0.25em"}}>
                        <path fill="#dc2626"
                              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c-.006 5.52-4.48 9.994-10 10Zm-1-7v2h2v-2h-2Zm0-8v6h2V7h-2Z"/>
                      </svg>
                  ) : usuario && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" style={{marginBottom: "0.25em"}}>
                        <path fill="#39a900"
                              d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                      </svg>
                  )}
                </div>

                <div className='formularioSelect'>
                  <InputField
                      label="Contraseña"
                      id="contrasena"
                      type="password"
                      placeholder='Escriba su contraseña'
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                      inputClass={`input ${contrasenaError ? "errorInput" : ""}`}
                  />
                  {contrasenaError ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" style={{marginBottom: "0.25em"}}>
                        <path fill="#dc2626"
                              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c-.006 5.52-4.48 9.994-10 10Zm-1-7v2h2v-2h-2Zm0-8v6h2V7h-2Z"/>
                      </svg>
                  ) : contrasena.length >= 8 && (
                      <svg xmlns="http://www.w3.org/2000/svg"width="2em" height="2em" viewBox="0 0 24 24" style={{marginBottom: "0.25em"}}>
                        <path fill="#39a900"
                              d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                      </svg>
                  )}
                </div>
                <div className="rol">
                  <label>Seleccione un Rol:</label>
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
              </form>

              {/* Mostrar mensaje de error solo si hay errores */}
              {(usuarioError || contrasenaError) && (
                  <Message style={{width: '100%'}} showIcon type="error" header="Uno o varios campos son invalidos">
                    <ol>
                      {usuarioError && <li>El usuario no puede estar vacío.</li>}
                      {contrasenaError && <li>La contraseña debe tener al menos 8 caracteres.</li>}
                    </ol>
                  </Message>
              )}

              <PrimaryButton texto="Ingresar" clase="PrimaryButton" onClick={handleLogin} />
            </section>
          </div>
        </section>
    );
  }

  // Renderiza las vistas según el rol
  if (currentView === 'aprendiz') {
    return <AprendizAppHome onLogout={() => setCurrentView('login')} />;
  }

  if (currentView === 'instructor') {
    return <InstructorAppHome onLogout={() => setCurrentView('login')} />;
  }

  return null;
}

export default App;

