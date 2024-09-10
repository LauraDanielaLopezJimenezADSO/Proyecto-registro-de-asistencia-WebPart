import React, { useState} from "react";
import AsideBar from "../../AsideBar.jsx";
import MainHomeScreen from "./AprendizPrincipalComponents/MainHomeScreen.jsx";
import MainSearchScreen from "./AprendizPrincipalComponents/MainSearchScreen.jsx";
import MainUserScreen from "./AprendizPrincipalComponents/MainUserScreen.jsx";
import {useAuth} from "../../../context/API/APISessionManager/userSession.jsx";
import '../../../styles/AprendizStyles/AprendizHomePageStyle.css';
import MainUploadScreen from "./AprendizPrincipalComponents/MainUploadScreen.jsx";

export default function AprendizAppHome({ onLogout }) {
    const [currentView, setCurrentView] = useState('home');
    const { user } = useAuth();

    const showHome = () => setCurrentView('home');
    const showUpload = () => setCurrentView('upload');
    const showSearch = () => setCurrentView('search');
    const showUser = () => setCurrentView('user');

    const renderView = () => {
        switch (currentView) {
            case 'home':
                return <MainHomeScreen UserFirstName={user.nombres} UserDoc={user.documento} key="home" />;
            case 'upload':
                return <MainUploadScreen UserFirstName={user.nombres} UserDoc={user.documento} key="home" />;
            case 'search':
                return <MainSearchScreen UserFirstName={user.nombres} UserDoc={user.documento} key="search" />;
            case 'user':
                return <MainUserScreen key="user" />;
            default:
                return <MainHomeScreen UserFirstName={user.nombres} UserDoc={user.documento} key="home" />;
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
                UserName={`${user.nombres} ${user.apellidos}`}
                Rol="Aprendiz"
                onLogout={onLogout}
            />
            <div id="view-container" className="view-container">
                {renderView()}
            </div>
        </div>
    );
}