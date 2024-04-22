import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

function NavigationButton({ to, label }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button onClick={handleClick}>
      {label}
    </button>
  );
}

// Define prop types for the component
NavigationButton.propTypes = {
  to: PropTypes.string.isRequired,   // 'to' is expected to be a string and is required
  label: PropTypes.string.isRequired // 'label' is expected to be a string and is required
};

export default NavigationButton;
