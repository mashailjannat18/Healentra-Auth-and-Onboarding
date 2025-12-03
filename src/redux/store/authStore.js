import { configureStore } from '@reduxjs/toolkit';
import signupReducer from '../features/auth/signupSlice';
import loginReducer from '../features/auth/loginSlice';
import onboardingReducer from '../features/home/onboarding/onboardingSlice'; 

export const authStore = configureStore({
    reducer: {
        signup: signupReducer,
        login: loginReducer,
        onboarding: onboardingReducer,
    },
});