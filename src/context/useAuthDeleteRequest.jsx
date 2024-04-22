const useAuthDeleteRequest = () => {
    const authDeleteRequest = async (url, onError) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8080/api/v1/${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            });
            const jsonData = await response.json();
            console.log(jsonData)
            return jsonData;
        } catch (error) {
            console.error('Error:', error);
            if (onError) {
            onError(error);
            }
        }
    };
  
    return authDeleteRequest;
  };

  export default useAuthDeleteRequest
  