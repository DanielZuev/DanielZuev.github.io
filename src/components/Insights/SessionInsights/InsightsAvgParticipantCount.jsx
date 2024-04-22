import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../context/AuthContext';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // This will import all chart types from Chart.js

const InsightsAvgParticipantCount = ({ roomID }) => {
    const [chartData, setChartData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [averageParticipants, setAverageParticipants] = useState(0); // State to store the average

    const { authGetRequest } = useAuth();

    useEffect(() => {
        if (!roomID) return;

        const fetchData = async () => {
            setIsLoading(true);
            setError('');
            try {
                const url = `session/insightsAvgParticipantCount/${roomID}`;
                const data = await authGetRequest(url, 
                    (error) => {
                      console.error('Error:', error);
                      
                      // Handle error (e.g., display error message)
                    });
                if (data.error) {
                    throw new Error(data.error);
                }

                // Extract data for chart
                const labels = data.map(session => session.sessionName);
                const participantCounts = data.map(session => parseInt(session.count, 10));
                console.log("here: participantCounts: " + participantCounts)
                // Calculate average participants
                const totalParticipants = participantCounts.reduce((acc, curr) => acc + curr, 0);
                const avgParticipants = data.length > 0 ? (totalParticipants / data.length).toFixed(2) : 0;
                setAverageParticipants(avgParticipants);
                setChartData({
                    labels,
                    datasets: [{
                        label: 'Participants per Session',
                        data: {participantCounts},
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }, ]
                });
            } catch (error) {
                console.error('Error fetching average participant count:', error);
                setError('Failed to fetch data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [roomID, authGetRequest]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
        <h2>Average Participants per Session</h2>
        <p className="mb-3">The average number of participants per session in this room is: <strong>{averageParticipants}</strong></p>
        {chartData.labels && <Bar data={chartData} options={{ scales: { y: { beginAtZero: true }}} }/>}
    </div>
    );
};

InsightsAvgParticipantCount.propTypes = {
    roomID: PropTypes.number.isRequired,
};

export default InsightsAvgParticipantCount;
