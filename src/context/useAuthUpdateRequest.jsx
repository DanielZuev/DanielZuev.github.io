const useAuthUpdateRequest = () => {
    const authUpdateRequest = async (url, data, onSuccess, onError) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8080/api/v1/${url}`, {
                method: 'PATCH',  // Using PATCH for partial updates
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const jsonData = await response.json();
                if (onSuccess) {
                    onSuccess(jsonData);
                }
            } else {
                const errorText = await response.text();
                throw new Error(errorText || 'Server responded with an error');
            }
        } catch (error) {
            console.error('Error:', error);
            if (onError) {
                onError(error);
            }
        }
    };

    return authUpdateRequest;
};

export default useAuthUpdateRequest;
