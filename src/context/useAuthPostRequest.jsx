const useAuthPostRequest = () => {
    const authPostRequest = async (url, data, onSuccess, onError) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8080/api/v1/${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Assuming that a successful response will always be in JSON format.
                const jsonData = await response.json();
                if (onSuccess) {
                    onSuccess(jsonData);
                }
                console.log("esaijgoapjgoipa")
                //This is update and chaged to return it
                return jsonData;
            } else {
                // Handle non-200 responses without assuming the body is JSON.
                const errorText = await response.text(); // Get response body as text.
                throw new Error(errorText || 'Server responded with an error');
            }
        } catch (error) {
            console.error('Error:', error);
            if (onError) {
                onError(error);
            }
            console.log('Token used:', token);
            console.log('Data sent:', data);
        }
    };

    return authPostRequest;
  };

  export default useAuthPostRequest
  