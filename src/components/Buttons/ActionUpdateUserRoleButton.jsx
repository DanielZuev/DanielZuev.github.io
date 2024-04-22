import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function ActionUpdateUserRoleButton({ userID, roomID, newRole }) {
    const { authUpdateRequest } = useAuth();
    const [updateToRole, setUpdateToRole] = useState(newRole);

    useEffect(() => {
        setUpdateToRole(newRole);
    }, [newRole]);

    const handleUpdateRoleClick = () => {
        const roleToSet = updateToRole === "ADMIN" ? "USER" : "ADMIN";
        setUpdateToRole(roleToSet);
        authUpdateRequest(`userroom/updateRole/${userID}/${roomID}`, 
        { 
          "role": roleToSet
        },
        (data) => {
          console.log('Affected Rows: ', data);
          // Handle success (e.g., navigate, display message)
        },
        (error) => {
          console.error('Error in updating the role:', error);
          // Handle error (e.g., display error message)
        });
    };

    return (
        <div>
            <button className="btn btn-info" onClick={handleUpdateRoleClick}>
                Change Role to {updateToRole}
            </button>
            <span className="ms-2">Current Role: {updateToRole === "ADMIN" ? "USER" : "ADMIN"}</span>
        </div>
    );
}

ActionUpdateUserRoleButton.propTypes = {
    userID: PropTypes.number.isRequired,
    roomID: PropTypes.number.isRequired,
    newRole: PropTypes.string.isRequired,
};

export default ActionUpdateUserRoleButton;
