import React, { useState} from "react";
import AsideBar from "../../AsideBar.jsx";
import MainHomeScreen from "./AprendizPrincipalComponents/MainHomeScreen.jsx";
import MainSearchScreen from "./AprendizPrincipalComponents/MainSearchScreen.jsx";
import MainUserScreen from "./AprendizPrincipalComponents/MainUserScreen.jsx";
import {useAuth} from "../../../context/API/APISessionManager/userSession.jsx";
import '../../../styles/AprendizStyles/AprendizHomePageStyle.css';

export default function AprendizAppHome({ onLogout }) {
    const [currentView, setCurrentView] = useState('home');
    const { user } = useAuth();

    const showHome = () => setCurrentView('home');
    const showSearch = () => setCurrentView('search');
    const showUser = () => setCurrentView('user');

    const renderView = () => {
        switch (currentView) {
            case 'home':
                return <MainHomeScreen UserFirstName={user.nombres} UserDoc={user.documento} />;
            case 'search':
                return <MainSearchScreen UserFirstName={user.nombres} UserDoc={user.documento}/>;
            case 'user':
                return <MainUserScreen />;
            default:
                return <MainHomeScreen UserFirstName={user.nombres} UserDoc={user.documento} />;
        }
    };

    return (
        <div id="app-container">
            <AsideBar
                showHome={showHome}
                showSearch={showSearch}
                showUser={showUser}
                ActiveButton={currentView.toUpperCase()}
                UserName={`${user.nombres} ${user.apellidos}`}
                Rol="Aprendiz"
                onLogout={onLogout} // Pasa la función de logout al AsideBar
            />
            <div id="view-container">
                {renderView()}
            </div>
        </div>
    );
}