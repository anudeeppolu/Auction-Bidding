import axios from 'axios';

// Create an instance of axios with a base URL
const BASE_URL = 'http://localhost:8000/api'
const apiService = axios.create({
  baseURL: BASE_URL, // Replace with your backend API base URL
//   timeout: 5000, // Set a timeout for requests (optional)
});

// Request Interceptor: Adds headers or modifies requests before sending them
apiService.interceptors.request.use(
  (config) => {
    // You can add authorization tokens or other headers here
    const token = localStorage.getItem('authToken');
    if (token) {
      // alert('token')
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle responses, errors, and status codes globally
apiService.interceptors.response.use(
  (response) => {
    // If response is successful, return data
    return response.data;
  },
  (error) => {
    // Handle API errors globally
    if (error.response) {
      // If error has a response (server error)
      switch (error.response.status) {
        case 401:
          // Handle unauthorized error
          console.error('Unauthorized access - possibly invalid token');
          break;
        case 403:
          // Handle forbidden error
          console.error('Forbidden - you do not have permission to access this');
          break;
        case 404:
          // Handle not found error
          console.error('API endpoint not found');
          break;
        case 500:
          // Handle server error
          console.error('Internal server error');
          break;
        default:
          console.error('An error occurred', error.response.status);
      }
    } else if (error.request) {
      // Handle no response from the server
      console.error('No response from the server');
    } else {
      // Handle other errors (network issues, etc.)
      console.error('Error', error.message);
    }

    return Promise.reject(error); // Propagate error to specific requests if needed
  }
);

export default apiService;
