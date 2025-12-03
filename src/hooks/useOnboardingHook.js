import { useCallback } from 'react';
import { specialities, onboarding } from '../api/services/home/onboarding';

export const useOnboardingHook = () => {
    const getSpecialities = useCallback(async () => {
        try {
            const response = await specialities();
            return response.data.data.map(spec => ({
                id: spec._id,
                name: spec.name
            }));
        } catch (error) {
            console.error("Error fetching specialities:", error);
            return [];
        }
    }, []);

    const onboardingSubmit = useCallback(async (payload) => {
        try {
            const response = await onboarding(payload);
            console.log(response);
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
        getSpecialities, 
        onboardingSubmit
    };
};
