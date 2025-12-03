import { useCallback } from 'react';
import { signupDoctor, loginUser } from '../api/services/auth';

export const useAuth = () => {
    const signup = useCallback(async (payload) => {
        try {
            const response = await signupDoctor(payload);
            return { success: true, data: response.data };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data || error.message,
                status: error.response?.status
            };
        }
    }, []);

    const login = useCallback(async (payload) => {
        try {
            const response = await loginUser(payload);
            return { success: true, data: response.data };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data || error.message,
                status: error.response?.status
            };
        }
    }, []);

    return {
        signup,
        login
    };
};