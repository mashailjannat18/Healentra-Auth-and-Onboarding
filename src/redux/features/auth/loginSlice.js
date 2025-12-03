import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    isAuthenticated: false,
    user: null
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
    },
});

export const {
    setToken,
} = loginSlice.actions;

export default loginSlice.reducer;