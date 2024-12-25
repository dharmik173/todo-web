import { api } from "./axios";

// API TO VERIFY USER OTP
export const verifyOtp = async (userObj) => {
    try {
        const response = await api.put("/user/verify",userObj);
        return response;
    } catch (error) {
        console.error("Error fetching todo:", error.response?.data || error.message);
        throw error.response?.data || { message: "unable to fetch data" };
    }
};

// API TO RESEND OTP TO USER
export const resendOtp = async (email) => {
    try {
        const response = await api.post("/user/resend-otp",email);
        return response;
    } catch (error) {
        console.error("Error fetching todo:", error.response?.data || error.message);
        throw error.response?.data || { message: "unable to fetch data" };
    }
};

// API TO OTP FOR FORGOT PASSWORD USER
export const forgotPasswordSendOtp = async (email) => {
    try {
        const response = await api.post("/user/forgot-password/send-otp",email);
        return response;
    } catch (error) {
        console.error("Error fetching todo:", error.response?.data || error.message);
        throw error.response?.data || { message: "unable to fetch data" };
    }
};

// API TO VERIFY FORGOT PASSWORD USER OTP
export const forgotPasswordVerifyOtp = async (obj) => {
    try {
        const response = await api.post("/user/forgot-password/verify-otp",obj);
        return response;
    } catch (error) {
        console.error("Error fetching todo:", error.response?.data || error.message);
        throw error.response?.data || { message: "unable to fetch data" };
    }
};