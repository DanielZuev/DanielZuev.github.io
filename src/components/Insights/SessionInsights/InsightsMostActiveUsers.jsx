import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../context/AuthContext';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const InsightsMostActiveUsers = ({ roomID }) => {
    const [activeUsers, setActiveUsers] = useState([]);
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
                const url = `session/insightsMostActiveUsers/${roomID}`;
                const data = await authGetRequest(url, 
                    (error) => {
                      console.error('Error:', error);
                      
                      // Handle error (e.g., display error message)
                    });
                if (!data || data.error) {
                    throw new Error(data.error || "No data returned");
                }

                setActiveUsers(data); // Expecting data to be [{ FirstName: "John", LastName: "Doe", SessionsAttended: 20 }, ...]
                const labels = data.map(user => `${user.firstName} ${user.lastName}`);
                const sessionsAttended = data.map(user => user.sessionsAttended);

                setChartData({
                    labels,
                    datasets: [{
                        label: 'Sessions Attended',
                        data: sessionsAttended,
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        borderColor: 'rgba(53, 162, 235, 1)',
                        borderWidth: 1,
                    }]
                });
            } catch (error) {
                console.error('Error processing data:', error);
                setError('Failed to process active users data');
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
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Most Active Users</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Sessions Attended</th>
                    </tr>
                </thead>
                <tbody>
                    {activeUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{`${user.firstName} ${user.lastName}`}</td>
                            <td>{user.sessionsAttended}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {chartData.labels && <Bar data={chartData} options={options} />}
        </div>
    );
};

InsightsMostActiveUsers.propTypes = {
    roomID: PropTypes.number.isRequired,
};

export default InsightsMostActiveUsers;
