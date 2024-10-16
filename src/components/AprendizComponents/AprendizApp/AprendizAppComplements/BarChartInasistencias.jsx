// Asegúrate de tener Chart.js y su adapter para trabajar con fechas
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from "react";
import { obtenerInasistenciasPorSemana } from "../../../../context/API/AprendizAPIAction/API_TraerInasistencias.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import dayjs from 'dayjs';

const BarChartInasistencias = ({ initialDate, UserDoc }) => {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!initialDate || !UserDoc) return;

        const fetchData = async () => {
            try {
                // Convertimos la fecha a 'YYYY-MM-DD'
                const fechaInicio = initialDate.format('YYYY-MM-DD');

                const data = await obtenerInasistenciasPorSemana(UserDoc, fechaInicio);

                // Inicializamos las inasistencias por día con 0
                const inasistenciasPorDia = Array(7).fill(0);

                if (data && data.length > 0) {
                    data.forEach((record) => {
                        const date = dayjs(record.Fecha);
                        const dayIndex = date.day(); // 0=Domingo, 1=Lunes,...
                        inasistenciasPorDia[dayIndex] += record.HorasInasistencia;
                    });
                }

                // Generamos las etiquetas y los datos ordenados
                const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                const startDayIndex = initialDate.day();
                const orderedDaysOfWeek = [];
                const orderedInasistencias = [];

                for (let i = 0; i < 7; i++) {
                    const index = (startDayIndex + i) % 7;
                    orderedDaysOfWeek.push(daysOfWeek[index]);
                    orderedInasistencias.push(inasistenciasPorDia[index]);
                }

                // Actualizamos el estado del gráfico
                setChartData({
                    labels: orderedDaysOfWeek,
                    datasets: [
                        {
                            label: 'Horas de Inasistencia',
                            data: orderedInasistencias,
                            borderColor: 'rgba(4, 27, 82, 1)',
                            backgroundColor: 'rgba(0, 34, 64, 0.8)',
                            borderWidth: 2,
                            borderRadius: 5,
                            borderSkipped: false,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error al obtener los datos de inasistencias.');

                // Mostrar gráfico vacío con todas las inasistencias en 0
                setChartData({
                    labels: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                    datasets: [
                        {
                            label: 'Horas de Inasistencia',
                            data: Array(7).fill(0),
                            borderColor: 'rgba(4, 27, 82, 1)',
                            backgroundColor: 'rgba(0, 34, 64, 0.8)',
                            borderWidth: 2,
                            borderRadius: 5,
                            borderSkipped: false,
                        },
                    ],
                });
            }
        };

        fetchData();
    }, [initialDate, UserDoc]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!chartData) {
        return <p>Cargando datos...</p>;
    }

    return (
        <Bar
            data={chartData}
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: `Inasistencias desde ${initialDate.format('DD/MM/YYYY')}`,
                    },
                },
                scales: {
                    y: {
                        max: 12,
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                        },
                    },
                },
            }}
        />
    );
};

export default BarChartInasistencias;