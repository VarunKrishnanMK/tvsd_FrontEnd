import axios from "axios";
import { toast } from 'react-hot-toast';

const baseAPIUrl = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
    baseURL: baseAPIUrl || 'http://localhost:3500/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.method === 'trace') {
        throw new Error('TRACE method is not allowed');
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export function setupAxiosInterceptors(navigateFunction) {
    apiClient.interceptors.response.use((response) => response, (err) => {

        const backendMsg = err.response?.data?.error;
        const isTokenExpired = backendMsg === 'Token expired';

        const uiMsg = isTokenExpired
            ? 'Your session has expired. Please sign-in again to continue.'
            : backendMsg || 'Something went wrong.';

        toast.error(uiMsg, {
            style: {
                borderRadius: '15px',
                background: 'gray',
                color: '#fff',
            },
            iconTheme: {
                primary: 'red',
                secondary: '#FFFAEE',
            },
        });

        if (isTokenExpired) {
            setTimeout(() => navigateFunction('/login', { replace: true }), 1000);
        }
        return Promise.reject(err);
    });
}


// User Account
export const verifyLogin = async (data) => {
    let responseData = await apiClient.post(`${baseAPIUrl}/login`, data);
    return responseData;
}

export const getUserDetails = async () => {
    let responseData = await apiClient.post(`${baseAPIUrl}/getUser`);
    return responseData;
}


// Bank Account
export const getBankAccounts = async (data) => {
    let responseData = await apiClient.post(`${baseAPIUrl}/getBankAccounts`, data);
    return responseData;
}

export const createBankAccounts = async (data) => {
    let responseData = await apiClient.post(`${baseAPIUrl}/createBankAccount`, data);
    return responseData;
}


// Beneficiary Account
export const getBeneficiaryAccounts = async (data) => {
    let responseData = await apiClient.post(`${baseAPIUrl}/getBeneficiaryAccounts`, data);
    return responseData;
}

export const createBeneficiaryAccounts = async (data) => {
    let responseData = await apiClient.post(`${baseAPIUrl}/createBeneficiaryAccount`, data);
    return responseData;
}


// Invoices
export const getInvoices = async (data) => {
    let responseData = await apiClient.post(`${baseAPIUrl}/getInvoices`, data);
    return responseData;
}

export const createInvoice = async (data) => {
    let responseData = await apiClient.post(`${baseAPIUrl}/createInvoice`, data);
    return responseData;
}