import React, { useState, useEffect } from 'react';
import { fetchUserData } from '../../context/API/InstructorAPIAction/apiService';
import LabelField from '../sectionDatos/labelFile';
import Loading from '../LoadingCom';

const UserProfile = ({ user, pass }) => {

  //Define el estado inicial con todos los campos que esperas recibir de la API, inicializándolos con valores predeterminados como 'XXXXXXXXXX'
  const [userData, setUserData] = useState({
    ID: 'XXXXXXXXXX',
    documento: 'XXXXXXXXXX',
    tipoDocumento: 'XXXXXXXXXX',
    nombres: 'XXXXXXXXXX',
    apellidos: 'XXXXXXXXXX',
    genero: 'XXXXXXXXXX',
    telefono: 'XXXXXXXXXX',
    programaFormacion: 'No aplica',
    nivelFormacion: 'No aplica',
    jornadaFormacion: 'No aplica',
    correo: 'XXXXXXXXXX',
    rol: 'XXXXXXXXXX',
    areaTrabajo: 'XXXXXXXXXX',
    sede: 'XXXXXXXXXX'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Dentro de useEffect, llama a fetchUserData para obtener los datos del usuario y actualiza el estado con setUserData.
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchUserData(user, pass);
        if (data) {
          setUserData(data);
        } else {
          setError('No se pudieron cargar los datos del usuario');
        }
      } catch (error) {
        setError(error.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [user, pass]);

  if (loading) {
    return <div id="loading">
                <Loading />
            </div>; //componente Loading
  }

  if (error) {
    return <div id="error">
                <h1>Error: {error}</h1>
            </div>
  }

  return (
    <section className="section__datos">
      <div className="datos">
        <h2>Datos del Instructor</h2>
      </div>

      <div className="datos">
        <div className="datos__cont">
          <LabelField     
            label="Usuario"
            id="user"
            type="text"
            buttonText={user}
          />
          <LabelField     
            label="Contraseña"
            id="contrasena"
            type="password"
            buttonText={pass}
          />  
          <LabelField 
            label="Documento"
            id="documento"
            type="text"
            buttonText={userData.documento}
          />
          <LabelField 
            label="Tipo de documento"
            id="TipoDocumento"
            type="text"
            buttonText={userData.tipoDocumento}
          />
          <LabelField 
            label="Nombres"
            id="nombres"
            type="text"
            buttonText={userData.nombres}
          />
          <LabelField 
            label="Apellidos"
            id="apellidos"
            type="text"
            buttonText={userData.apellidos}
          />
          <LabelField 
            label="Género"
            id="genero"
            type="text"
            buttonText={userData.genero}
          />
          <LabelField 
            label="Teléfono"
            id="telefono"
            type="number"
            buttonText={userData.telefono}
          />
          <LabelField 
            label="Programa de formación"
            id="IDProgramaFormacion"
            type="text"
            buttonText={userData.programaFormacion}
          />
          <LabelField 
            label="Nivel de formación"
            id="NivelFormacion"
            type="text"
            buttonText={userData.nivelFormacion}
          />
          <LabelField 
            label="Jornada de formación"
            id="JornadasFormacion"
            type="text"
            buttonText={userData.jornadaFormacion}
          />
          <LabelField 
            label="Correo electrónico"
            id="correo"
            type="text"
            buttonText={userData.correo}
          />
          <LabelField 
            label="Rol"
            id="rol"
            type="text"
            buttonText={userData.rol}
          />
          <LabelField 
            label="Área de trabajo"
            id="area"
            type="text"
            buttonText={userData.areaTrabajo}
          />
          <LabelField 
            label="Sede"
            id="sede"
            type="text"
            buttonText={userData.sede}
          />
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
