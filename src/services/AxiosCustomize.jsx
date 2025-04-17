import axios from "axios"

const instance = axios.create({
    baseURL: "https://web-production-fa13.up.railway.app",
});

const adafruit = axios.create({
    baseURL: "https://io.adafruit.com/api/v2/NgoKhang/feeds"
});


// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        if (response && response.data) return response.data;
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger

        // Do something with response error
        let res = {};
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            res.data = error.response.data;
            res.status = error.response.status;
            res.headers = error.response.headers;

        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser 
            // and an instance of http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        return res
    });

export { instance, adafruit };
