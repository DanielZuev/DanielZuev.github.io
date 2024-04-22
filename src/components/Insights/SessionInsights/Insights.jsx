import PropTypes from 'prop-types';
import InsightsAvgParticipantCount from './InsightsAvgParticipantCount';
import InsightsTopSessions from './InsightsTopSessions';
import InsightsSessionTime from './InsightsSessionTime';
import InsightsSessionRolesCount from './InsightsSessionRolesCount';
import InsightsMostActiveUsers from './InsightsMostActiveUsers';

const Insights = ({ roomID }) => {
    return (
        <div className="container mt-4 mb-4">
            <h1 className="mb-4">Group Insights</h1>
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Average Participant Count</div>
                        <div className="card-body">
                            <InsightsAvgParticipantCount roomID={roomID} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Top Sessions by Attendance</div>
                        <div className="card-body">
                            <InsightsTopSessions roomID={roomID} />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">Session Attendance Over Time</div>
                        <div className="card-body">
                            <InsightsSessionTime roomID={roomID} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Role-Based Participation</div>
                        <div className="card-body">
                            <InsightsSessionRolesCount roomID={roomID} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Most Active Users</div>
                        <div className="card-body">
                            <InsightsMostActiveUsers roomID={roomID} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Insights.propTypes = {
    roomID: PropTypes.number.isRequired,
};

export default Insights;
