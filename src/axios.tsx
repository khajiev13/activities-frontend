import axios from 'axios';

const baseURL ='http://khajiev13.jprq.site/';
// Try https://eventopia-backend-due3e9c5bkd3heaf.francecentral-01.azurewebsites.net/ for production
// Try 'http://127.0.0.1:8000/' for development

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

// Interceptor to set the Authorization header before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (originalRequest.url === 'api/users/token/refresh/') {
      // Handle refresh token failure logic here
      return Promise.reject(error);
    }

    if (typeof error.response === 'undefined') {
      alert(
        'A server/network error occurred. ' +
          'Looks like CORS might be the problem. ' +
          'Sorry about this - we will get it fixed shortly.'
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + 'api/users/token/refresh/'
    ) {
      // Clear the local storage
      localStorage.clear();
      window.location.assign('/login/');
      return Promise.reject(error);
    }

    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          try {
            const response = await axiosInstance.post(
              'api/users/token/refresh/',
              { refresh: refreshToken }
            );

            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            axiosInstance.defaults.headers['Authorization'] =
              'Bearer ' + response.data.access;
            originalRequest.headers['Authorization'] =
              'Bearer ' + response.data.access;

            return axiosInstance(originalRequest);
          } catch (err) {
            console.log('Error refreshing token:', err);
            localStorage.clear();
            window.location.assign('/login/');
            return Promise.reject(error);
          }
        } else {
          console.log('Refresh token is expired', tokenParts.exp, now);
          localStorage.clear();
          window.location.assign('/login/');
        }
      } else {
        console.log('Refresh token not available.');
        localStorage.clear();
        window.location.assign('/login/');
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
