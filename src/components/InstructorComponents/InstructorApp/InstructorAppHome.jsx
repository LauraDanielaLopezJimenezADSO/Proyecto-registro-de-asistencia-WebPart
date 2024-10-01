import React, { useState} from "react";
import AsideBar from "../../AsideBar.jsx";
import MainHomeScreen from "./InstructorPrincipalComponents/MainHomeScreen.jsx";
import MainSearchScreen from "./InstructorPrincipalComponents/MainSearchScreen.jsx";
import MainUserScreen from "./InstructorPrincipalComponents/MainUserScreen.jsx";
import {useAuth} from "../../../context/API/APISessionManager/userSession.jsx";
import '../../../styles/InstructorStyles/InstructorHomePageStyle.css';
import MainVerifyScreen from "./InstructorPrincipalComponents/MainVerifyScreen.jsx";

export default function InstructorAppHome({ onLogout }) {
    const [currentView, setCurrentView] = useState('home');
    const { user } = useAuth();

    const showHome = () => setCurrentView('home');
    const showSearch = () => setCurrentView('search');
    const showVerify = () =>  setCurrentView('verify');
    const showUser = () => setCurrentView('user');

    const renderView = () => {
        switch (currentView) {
            case 'home':
                return <MainHomeScreen UserFirstName={user.FullName} UserDoc={user.Documento} />;
            case 'search':
                return <MainSearchScreen UserFirstName={user.FullName} UserDoc={user.Documento} />;
            case 'verify':
                return <MainVerifyScreen UserFirstName={user.FullName} UserDoc={user.Documento} />
            case 'user':
                return <MainUserScreen />;
            default:
                return <MainHomeScreen UserFirstName={user.FullName} UserDoc={user.Documento} />;
        }
    };

    return (
        <div id="app-container">
            <AsideBar
                showHome={showHome}
                showSearch={showSearch}
                showVerify={showVerify}
                showUser={showUser}
                ActiveButton={currentView.toUpperCase()}
                UserName={`${user.FullName}`}
                Rol="Instructor"
                onLogout={onLogout} // Pasa la función de logout al AsideBar
            />
            <div id="view-container">
                {renderView()}
            </div>
        </div>
    );
}