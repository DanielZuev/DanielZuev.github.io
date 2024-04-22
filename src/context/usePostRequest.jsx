const usePostRequest = () => {
    const postRequest = async (url, data, onSuccess, onError) => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const jsonData = await response.json();
        if (onSuccess) {
          onSuccess(jsonData);
        }
      } catch (error) {
        console.error('Error:', error);
        if (onError) {
          onError(error);
        }
      }
    };
  
    return postRequest;
  };

  export default usePostRequest
  