import axios from "axios";
import { toast } from "sonner";
import { authStore } from "../../redux/store/authStore";

const apiClient = axios.create({
    baseURL: "https://dgbeorwuitdiy.cloudfront.net",
});

apiClient.interceptors.request.use((config) => {
    const state = authStore.getState();
    const token = state.login.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['Content-Type'] = 'application/json';
    return config;
});

export const api = async ({
    url,
    method = "get",
    params = {},
    payload = {},
}) => {
    try {
        let response;

        switch (method.toLowerCase()) {
            case "get":
                response = await apiClient.get(url, { params });
                break;
            case "post":
                response = await apiClient.post(url, payload, { params });
                break;
            case "put":
                response = await apiClient.put(url, payload, { params });
                break;
            case "patch":
                response = await apiClient.patch(url, payload);
                break;
            case "delete":
                response = await apiClient.delete(url, { data: payload });
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }

        return response;
    } catch (error) {
        console.error("API error:", error);

        if (error?.code === "ERR_NETWORK") {
            toast.error("Network error. Please check your connection.");
        } else if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
        }

        throw error;
    }
};