import { STATIC_ROUTES } from '~/utils/staticRoutes.js';
import mixin from '../../mixin/sweetAlert.js';

const config = {
    headers: { 'Content-Type': 'application/json' }
};

const handleUnauthorizedError = () => {
    // Handle the 401 error: this could be a logout or token refresh
    mixin.methods.createSwalAlert('Session expired. Please log in again.', 'error');
    // Example: Redirect to login
    window.location.href = STATIC_ROUTES.LOGIN; // You can modify this based on your routing
};

const getRequest = async (axios, cookies, URL, params, configParam) => {
    if(cookies) {
        let countryData = cookies?.get('countryData');
        (URL.includes('?')) ? URL += `&` : URL += `?`;
        URL += `currency=${countryData?.currency || 'USD'}&locale=${countryData?.locale || 'en-US'}`;
    }
    try {
        config.headers = configParam ? { ...configParam.headers, ...config.headers } : config.headers;
        const response = await axios.get(URL, config);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            handleUnauthorizedError();
        } else {
            mixin.methods.createSwalAlert(error.message || 'Internal Server Error', 'error');
        }
        return { data: { message: error.message, success: false } };
    }
};

const updateCartItem = async (axios, URL, formData, cookies) => {
    try {
        // Add locale and currency in apiUrl
        let country = cookies?.get('countryData') || { currency: 'USD', locale: 'en-US' };
        formData.currency = country?.currency || 'USD';
        formData.locale = country?.locale || 'en-US';
        const response = await axios.post(URL, formData, config);
        return response;
    } catch (error) {

        if (error.response && error.response.status === 401) {
           return handleUnauthorizedError();
        }

        if (error.response && error.response.status === 404) {
            return { data: { message: error.message, success: false } };
        }else {
            mixin.methods.createSwalAlert(error.message || 'Internal Server Error', 'error');
        }
        return { data: { message: error.message, success: false } };
    }
};

const postRequest = async (axios, URL, formData, cookies = null, configParam) => {
    try {
        // Add locale and currency in apiUrl
        if(cookies){
         let country = cookies?.get('countryData') || { currency: 'USD', locale: 'en-US' };
         formData.currency = country?.currency || 'USD';
         formData.locale = country?.locale || 'en-US'; }
         config.headers = configParam ? { ...configParam.headers, ...config.headers } : config.headers;
        const response = await axios.post(URL, formData, config);
        return response;
    } catch (error) {
        const status = error.response?.status;

        if (status === 401 || status === 422 || status === 403) {
            let msg = error.response?.data?.error || error.response?.data?.message || 'Internal Server Error';
            let code = error.response?.data?.code || null;
            return { data: { message: msg, success: false, status, code } };
        } else {
            // mixin.methods.createSwalAlert(error.message || 'Internal Server Error', 'error');
            return { data: { message: error.message ?? error, success: false } };
        }
    }
};

const putRequest = async (axios, URL, formData, configParam) => {
    try {
        config.headers = configParam ? { ...configParam.headers, ...config.headers } : config.headers;
        const response = await axios.put(URL, formData, config);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            let msg = error.response?.data && error.response?.data?.error ? error.response?.data?.error : 'Internal Server Error';
            return { data: { message: msg, success: false } };
            // handleUnauthorizedError();
        } else {
            mixin.methods.createSwalAlert(error.message || 'Internal Server Error', 'error');
        }
        return { data: { message: error.message, success: false } };
    }
};

const getProductFitlerList = async (axios, params, cookies) => {
    try {
        // Add locale and currency in query params
        let country = cookies?.get('countryData') || { currency: 'USD', locale: 'en-US' };
        params += `&currency=${country?.currency || 'USD'}&locale=${country?.locale || 'en-US'}`;

        let url = `product-search?${params}`;
        const response = await axios.get(url, config);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            handleUnauthorizedError();
        } else {
            mixin.methods.createSwalAlert(error.message || 'Internal Server Error', 'error');
        }
        return { data: { message: error.message, success: false } };
    }
};

const getFitleredProductList = async (apiUrl, axios, params, cookies, signal = null) => {
    try {
        // Add locale and currency in query params
        let country = cookies?.get('countryData') || { currency: 'USD', locale: 'en-US' };
        params += `&currency=${country?.currency || 'USD'}&locale=${country?.locale || 'en-US'}`;

        let url = `${apiUrl}?${params}`;
        const requestConfig = signal ? { ...config, signal } : config;
        const response = await axios.get(url, requestConfig);
        return response;
    } catch (error) {
        // Request was intentionally cancelled — return sentinel, no toast
        if (
            error.code === 'ERR_CANCELED' ||
            error.name === 'CanceledError' ||
            error.name === 'AbortError'
        ) {
            return { aborted: true };
        }
        if (error.response && error.response.status === 401) {
            handleUnauthorizedError();
        } else {
            mixin.methods.createSwalAlert(error.message || 'Internal Server Error', 'error');
        }
        return { data: { message: error.message, success: false } };
    }
};

export default { getRequest, updateCartItem, postRequest, getProductFitlerList, putRequest, getFitleredProductList };
