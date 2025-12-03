import { api } from "../../../base";

export const onboarding = async (data) => {
    return await api({
        url: "/api/doctor/onboarding",
        method: "put",
        data,
    });
};

export const specialities = async () => {
    const response = await api({
        url: "/api/speciality",
        method: "get",
    });
    return response;
};