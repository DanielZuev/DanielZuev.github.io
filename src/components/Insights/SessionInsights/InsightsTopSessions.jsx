import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../context/AuthContext';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns'; // For handling date scales, though not needed here directly

const InsightsTopSessions = ({ roomID }) => {
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
                const url = `session/insightsTopSessions/${roomID}`;
                const data = await authGetRequest(url, 
                    (error) => {
                      console.error('Error:', error);
                      
                      // Handle error (e.g., display error message)
                    });
                if (!data || data.error) {
                    throw new Error(data.error || "No data returned");
                }

                // Prepare data for chart
                const labels = data.map(session => session.name);
                const participantCounts = data.map(session => session.count);

                setChartData({
                    labels,
                    datasets: [{
                        label: 'Participants',
                        data: participantCounts,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                });

            } catch (error) {
                console.error('Error fetching top sessions:', error);
                setError('Failed to fetch top sessions');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [roomID, authGetRequest]);

    if (isLoading) return <div className="text-center"><strong>Loading...</strong></div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Top 5 Busiest Sessions</h2>
            {chartData.labels && chartData.labels.length > 0 ? (
                <Bar data={chartData} options={{ scales: { y: { beginAtZero: true } }}} />
            ) : (
                <p className="text-muted">No session data available.</p>
            )}
        </div>
    );
};

InsightsTopSessions.propTypes = {
    roomID: PropTypes.number.isRequired,
};

export default InsightsTopSessions;
