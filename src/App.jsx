import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PrimaryInput from './components/inputs/primaryInput'
// import PrimaryButton from "../../buttons/primaryButton.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div >

    <section className='section__logo'>
      <figure className="sectionCont">
            <img
              src="../../util/icons/LogoSena.png"
              alt=""
              className="Image__Logo"
            />
      </figure>
    </section>

    <div>
        
        <a href="src/pages/InstructorPages/InstructorHomeScreen.html" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
    </div>

    <section className='section__contenido'>
    <div>
      <h2>Ingreso al Control de Asistencia</h2>
    </div>

    <section className='container'>
      <div>
        <div>
          <form action="">
            <label htmlFor="Contraseña"></label>
            <input className='input' type="password" placeholder='Escriba su contraseña'/>

            
            
          </form>
        </div>
      </div>
    </section>

      <div>
      <PrimaryInput texto="cerrar sesion"></PrimaryInput>
      </div>
    </section>
      
      
    </div>
    
    </>
  )
}

export default App
