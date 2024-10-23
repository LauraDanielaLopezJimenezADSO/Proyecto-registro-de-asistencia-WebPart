import React, {useEffect, useState} from "react";
import {traerInasistencias} from "../../../../../context/API/AprendizAPIAction/API_TraerInasistencias.js";
import Loading from "../../../../LoadingCom.jsx";
import CardComponent from "../../AprendizAppComplements/CardComponent.jsx";
import SubTittle from "../../../../Text/SubTitle.jsx";
import SecondaryButton from "../../../../buttons/secondaryButton.jsx";
import MainHomeScreen from "../MainHomeScreen.jsx";

export default function AsisViewerScreen({ UserFirstName , UserDoc }) {
    const [AprendizInasistencias, setAprendizInasistencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentView, setCurrentView] = useState('inasistencias');

    useEffect(() => {
        async function getData() {
            if (!UserDoc) {
                setError(new Error("Documento del usuario no está definido."));
                setLoading(false);
                return;
            }

            try {
                // Obtener las inasistencias para llenar las tarjetas
                const dataInasistenciasClase = await traerInasistencias(UserDoc);
                setAprendizInasistencias(dataInasistenciasClase);
                console.log(dataInasistenciasClase)

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [UserDoc]);


    const handleShowClasses = () => {
        setCurrentView('home');
    };


    if (loading) {
        return (
            <div id="loading">
                <Loading />
            </div>
        );
    }

    if (error) {
        return <div id="error"><h1>Error: {error.message}</h1></div>;
    }

    if (currentView === 'home') {
        return <MainHomeScreen UserFirstName={UserFirstName} UserDoc={UserDoc} key="home" />;
    }


    const renderCard = (inasistencia, index) => {
        if (!inasistencia) return <p key={index}>No hay datos disponibles.</p>;

        return (
            <CardComponent
                key={index}
                classNameParent="FirstSection__Card FirstSection__Card--AsisViewer"
                classNameContentContainer="Card__cardContentContainer"
                Title={inasistencia.ClaseFormacion || 'Clase no especificada'}
                FirstTxt={`Instructor: ${inasistencia.Instructor || 'No disponible'}`}
                SecordTxt={`Ficha: ${inasistencia.Ficha || 'Ficha no encontrada'}`}
                ThirdTxt={`Horas inasistencia: ${inasistencia.TotalAsistencias || 0}`}
            />
        );
    };

    return (
        <main id="main">
            <section className="main__gridContainer main__gridContainer--asisViewer">
                {/* Primera Sección - Ocupa 2/5 del ancho */}
                <section className="main-content__FirstSection main-content__FirstSection--AsisViewer">
                    <SubTittle text="Clases con inasistencias" />
                    <section className="FirstSection__AsisContainer">
                        {AprendizInasistencias.length > 0 ? (
                            AprendizInasistencias.map(renderCard) // Renderiza solo los primeros 2 elementos si existen
                        ) : (
                            <p>No hay inasistencias registradas.</p>
                        )}
                    </section>
                </section>
                <SecondaryButton clase="SecondaryButton" texto="Volver" onClick={handleShowClasses} />
            </section>
        </main>
    );
}