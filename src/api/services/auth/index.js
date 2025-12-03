import { api } from "../../base";

export const signupDoctor = async (data) => {
    return await api({
        url: "/api/doctor/register",
        method: "post",
        payload: data,
    });
};

export const loginUser = async (data) => {
    const response = await api({
        url: "/api/auth/login",
        method: "post",
        payload: data,
    });
    return response;
};