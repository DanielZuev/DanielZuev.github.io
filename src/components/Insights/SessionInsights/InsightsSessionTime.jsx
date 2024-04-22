import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../context/AuthContext';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns'; // Ensure the adapter is imported

const InsightsSessionTime = ({ roomID }) => {
    const [chartData, setChartData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const { authGetRequest } = useAuth();

    useEffect(() => {
        if (!roomID) return;

        const fetchData = async () => {
            setIsLoading(true);
            setError('');
            try {
                const url = `session/insightsSessionTime/${roomID}`;
                const data = await authGetRequest(url, 
                    (error) => {
                      console.error('Error:', error);
                      
                      // Handle error (e.g., display error message)
                    });
                if (!data || data.error) {
                    throw new Error(data.error || "No data returned");
                }

                const labels = data.map(item => new Date(item.sessionDateTime).toISOString());
                const participantData = data.map(item => item.participants);

                setChartData({
                    labels,
                    datasets: [{
                        label: 'Participants per Session',
                        data: participantData,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                });

            } catch (error) {
                console.error('Error processing data:', error);
                setError('Failed to process session time data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [roomID, authGetRequest]);

    const options = {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-4">
            <h2>Session Attendance Insights</h2>
            <div className="card">
                <div className="card-body">
                    {chartData.labels && <Line data={chartData} options={options} />}
                </div>
            </div>
        </div>
    );
};

InsightsSessionTime.propTypes = {
    roomID: PropTypes.number.isRequired,
};

export default InsightsSessionTime;
