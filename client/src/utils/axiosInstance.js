import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true, // send cookie for each request 
    headers: {
        'Content-Type': 'application/json'
    }
})

// when server response with 401 unauthorized , axios will redirect user to login page : 
// Response Interceptor (Redirect on 401)
axiosInstance.interceptors.response.use(
    (response) => response, // Return response if successful
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized! Redirecting to login...");

            // Clear all stored token 
            localStorage.clear()

            // Redirect to login page
            window.location.href = `/login?message=Session expired. Please log in again.`;
        }

        return Promise.reject(error);
    }
);

export default axiosInstance 