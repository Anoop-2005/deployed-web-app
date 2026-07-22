import axios from 'axios'
export const BaseUrl=import.meta.env.VITE_API_URL || 'http://localhost:8000'

const instance=axios.create({
    baseURL:BaseUrl,
    withCredentials:true
})

export const get =(url, params) => instance.get(url, {params})
export const post =(url, data)=> instance.post(url, data)
export const patch=(url, data)=> instance.patch(url, data)
export const dele=(url)=> instance.delete(url)
export const put=(url,data)=> instance.put(url,data)

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Log the request config for debugging
    console.log('Request Config:', config);
    return config;
}, function (error) {
    // Do something with request error
    console.error('Request Error:', error);
    return Promise.reject(error);
});

// // Add a response interceptor
// instance.interceptors.response.use(function (response) {
//     // Log the response data for debugging
//     console.log('Apis Response', response);
//     return response;
// }, function (error) {
//     // Log the error message for debugging
//     console.log('Api Error', error.message);
//     return Promise.reject(error);
// });

instance.interceptors.response.use(function (response) {
    console.log('Apis Response', response);
    return response;
}, async function (error) {
    console.log('Api Error', error.message);

    const originalRequest = error.config;
    const status = error.response?.status;

    const isAuthRoute = originalRequest?.url?.includes('/auth/login')
        || originalRequest?.url?.includes('/auth/refresh')
        || originalRequest?.url?.includes('/auth/register');

    if (status === 401 && !originalRequest._retry && !isAuthRoute) {
        originalRequest._retry = true;
        try {
            await instance.post('/auth/refresh');
            return instance(originalRequest);
        } catch (refreshError) {
            console.log('Refresh Token Error:', refreshError.message);
            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
});