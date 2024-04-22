import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../context/AuthContext';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const InsightsSessionRolesCount = ({ roomID }) => {
    const [roleCounts, setRoleCounts] = useState([]);
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
                const url = `session/insightsSessionRolesCount/${roomID}`;
                const data = await authGetRequest(url, 
                    (error) => {
                      console.error('Error:', error);
                      
                      // Handle error (e.g., display error message)
                    });
                if (!data || data.error) {
                    throw new Error(data.error || "No data returned");
                }

                setRoleCounts(data);  // Assuming data format [{ role: 'Admin', Count: 10 }, ...]

                const chartLabels = data.map(item => item.name);
                const chartCounts = data.map(item => item.count);

                setChartData({
                    labels: chartLabels,
                    datasets: [{
                        label: 'Role Counts',
                        data: chartCounts,
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#E7E9ED',
                            '#4BC0C0'
                        ],
                        hoverBackgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#E7E9ED',
                            '#4BC0C0'
                        ]
                    }]
                });
            } catch (error) {
                console.error('Error processing data:', error);
                setError('Failed to process role data');
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
            <h2>Role-Based Session Participation</h2>
            <div className="row">
                <div className="col-md-6">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Role</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roleCounts.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    {chartData.labels && <Pie data={chartData} />}
                </div>
            </div>
        </div>
    );
};

InsightsSessionRolesCount.propTypes = {
    roomID: PropTypes.number.isRequired,
};

export default InsightsSessionRolesCount;
