import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { userLoggedIn } from "../api/services/home";

export const useUser = () => {
    const token = useSelector((state) => state.login.token);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = useCallback(async () => {
        if (!token) {
            setLoading(false);
            setError("No token found");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await userLoggedIn();
            setUser(response.data);
            
            console.log("User fetched successfully:", response.data);
        } catch (err) {
            console.error("Failed to fetch user:", err);
            setError(err.response?.data?.message || "Failed to load user");
            
            if (err.response?.status === 401) {
                
            }
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return { user, loading, error, refetch: fetchUser };
};