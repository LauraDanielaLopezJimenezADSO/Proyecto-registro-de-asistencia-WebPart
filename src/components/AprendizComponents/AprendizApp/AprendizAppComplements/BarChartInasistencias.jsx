// Asegúrate de tener Chart.js y su adapter para trabajar con fechas
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {useEffect, useState} from "react";
import {fetchInasistenciasPorRangoFechas} from "../../../../context/API/AprendizAPIAction/API_TraerInasistencias.js";
import {Bar} from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartInasistencias = ({ initialDate }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        if (!initialDate) return;

        const fetchData = async () => {
            try {
                const data = await fetchInasistenciasPorRangoFechas(4073477, initialDate); // Ejemplo de documento fijo

                // Obtener el índice del día de la semana de la fecha inicial (0=Domingo, 1=Lunes,...)
                const startDayIndex = new Date(initialDate).getDay();
                const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

                // Crear una lista de días que comience desde el día inicial y continúe por 7 días
                const orderedDaysOfWeek = [...daysOfWeek.slice(startDayIndex), ...daysOfWeek.slice(0, startDayIndex)];

                // Inicializar inasistenciasPorDia con 0 para cada uno de los 7 días
                const inasistenciasPorDia = Array(7).fill(0);

                if (data && data.length > 0) {
                    data.forEach((record) => {
                        const date = new Date(record.Fecha);
                        const dayIndex = (date.getDay() - startDayIndex + 7) % 7; // Ajusta el índice relativo al día inicial
                        inasistenciasPorDia[dayIndex] += record.HorasInasistencia; // Asigna las horas de inasistencia al día correspondiente
                    });
                }

                // Actualiza el estado del chartData
                setChartData({
                    labels: orderedDaysOfWeek,
                    datasets: [
                        {
                            label: 'Horas de Inasistencia',
                            data: inasistenciasPorDia,
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
                // En caso de error, muestra todos los valores en 0
                setChartData({
                    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                    datasets: [
                        {
                            label: 'Horas de Inasistencia',
                            data: [0, 0, 0, 0, 0, 0, 0],
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderWidth: 2,
                            borderRadius: 5,
                            borderSkipped: false,
                        },
                    ],
                });
            }
        };

        fetchData();
    }, [initialDate]);

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
                        text: `Inasistencias desde ${initialDate}`,
                    },
                },
                scales: {
                    y: {
                        max: 5, // Máximo de horas de inasistencia
                        beginAtZero: true,
                    },
                },
            }}
        />
    );
};

export default BarChartInasistencias;