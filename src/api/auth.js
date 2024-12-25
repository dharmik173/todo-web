import { api } from './axios';

// API FOR SIGNUP
export const signupUser = async (userData) => {
    try {
        const response = await api.post("/user/signup", userData);
        return response;
    } catch (error) {
        console.error("Error signing up:", error.response?.data || error.message);
        throw error.response?.data || { message: "Signup failed" };
    }
};

// API FOR LOGIN 
export const loginUser = async (credentials) => {
    try {
        const response = await api.post("/user/login", credentials);
        return response;
    } catch (error) {
        console.error("Error logging in:", error.response?.data || error.message);
        throw error.response?.data || { message: "Login failed" };
    }
};

// API FOR LOGOUT
export const logoutUser = async () => {
    try {
        const response = await api.get("/user/logout");
        return response;
    } catch (error) {
        console.error("Error logging in:", error.response?.data || error.message);
        throw error.response?.data || { message: "Login failed" };
    }
};
