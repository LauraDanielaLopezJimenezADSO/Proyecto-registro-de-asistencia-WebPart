import React, { useState} from "react";
import AsideBar from "./AprendizAppComplements/AsideBar.jsx";
import MainHomeScreen from "./AprendizPrincipalComponents/MainHomeScreen.jsx";
import MainSearchScreen from "./AprendizPrincipalComponents/MainSearchScreen.jsx";
import MainUserScreen from "./AprendizPrincipalComponents/MainUserScreen.jsx";
import UserCredentials from "../../../context/API/APISessionManager/userSession.js";
import '../../../styles/InstructorStyles/InstructorHomePageStyle.css';

export default function InstructorHome() {
  // Estado para controlar la vista actual
  const [currentView, setCurrentView] = useState('home');
  const userInstance = UserCredentials.getInstance();

  // Establece las credenciales del usuario al montar el componente
    userInstance.setCredentials({
      id: 2,
      documento: 1097096255,
      nombres: 'Jeisson',
      apellidos: 'Leon'
    });


  // Funciones para cambiar la vista
  const showHome = () => setCurrentView('home');
  const showSearch = () => setCurrentView('search');
  const showUser = () => setCurrentView('user');

  // Renderizar el componente basado en la vista actual
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <MainHomeScreen UserFirstName={userInstance.getUserFirstName()} />;
      case 'search':
        return <MainSearchScreen UserFirstName={userInstance.getUserFirstName()} />;
      case 'user':
        return <MainUserScreen />;
      default:
        return <MainHomeScreen />;
    }
  };

  return (
      <div id="app-container">
        {/* AsideBar recibe funciones para cambiar la vista */}
        <AsideBar
            showHome={showHome}
            showSearch={showSearch}
            showUser={showUser}
            ActiveButton={currentView.toUpperCase()}
            UserName={userInstance.getUserFullName()}
            Rol="Instructor"
        />
        {/* Renderizar la vista seleccionada */}
        <div id="view-container">
          {renderView()}
        </div>
      </div>
  );
}