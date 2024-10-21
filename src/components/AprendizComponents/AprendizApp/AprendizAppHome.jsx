import React, { useState, useEffect } from "react";
import AsideBar from "../../AsideBar.jsx";
import MainHomeScreen from "./AprendizPrincipalComponents/MainHomeScreen.jsx";
import MainSearchScreen from "./AprendizPrincipalComponents/MainSearchScreen.jsx";
import MainUserScreen from "./AprendizPrincipalComponents/MainUserScreen.jsx";
import { useAuth } from "../../../context/API/APISessionManager/userSession.jsx";
import '../../../styles/AprendizStyles/AprendizHomePageStyle.css';
import MainUploadScreen from "./AprendizPrincipalComponents/MainUploadScreen.jsx";
import { SuccessToast } from "../../SweetAlertsComponents/SuccessAlerts.jsx";

export default function AprendizAppHome({ onLogout }) {
    const [currentView, setCurrentView] = useState('home');
    const { user } = useAuth();
    const [showToast, setShowToast] = useState(false); // Estado para manejar el toast

    useEffect(() => {
        // Mostrar el Toast solo una vez cuando el componente se monta
        setShowToast(true);

        // Ocultar el Toast después de 3 segundos
        const timer = setTimeout(() => {
            setShowToast(false);
        }, 3000);

        // Limpiar el temporizador al desmontar el componente
        return () => clearTimeout(timer);
    }, []); // Solo se ejecuta al montar el componente

    const showHome = () => setCurrentView('home');
    const showUpload = () => setCurrentView('upload');
    const showSearch = () => setCurrentView('search');
    const showUser = () => setCurrentView('user');

    const renderView = () => {
        switch (currentView) {
            case 'home':
                return <MainHomeScreen UserFirstName={user.FullName} UserDoc={user.Documento} key="home" />;
            case 'upload':
                return <MainUploadScreen UserFirstName={user.FullName} UserDoc={user.Documento} key="upload" />;
            case 'search':
                return <MainSearchScreen UserFirstName={user.FullName} UserDoc={user.Documento} key="search" />;
            case 'user':
                return <MainUserScreen key="user" />;
            default:
                return <MainHomeScreen UserFirstName={user.FullName} UserDoc={user.Documento} key="home" />;
        }
    };

    return (
        <div id="app-container">
            <AsideBar
                showHome={showHome}
                showUpload={showUpload}
                showSearch={showSearch}
                showUser={showUser}
                ActiveButton={currentView.toUpperCase()}
                UserName={`${user.FullName}`}
                Rol="Aprendiz"
                onLogout={onLogout}
            />
            <div id="view-container" className="view-container">
                {renderView()}
            </div>
            {/* Mostrar el Toast cuando sea necesario */}
            {showToast && <SuccessToast title={`Bienvenido! ${user.FullName}`} />}
        </div>
    );
}