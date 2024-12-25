import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
    Alert,
    CircularProgress,
} from "@mui/material";

import { forgotPasswordSendOtp, forgotPasswordVerifyOtp, verifyOtp } from "../api/verification";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();


    const handleSendOtp = async () => {
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const response = await forgotPasswordSendOtp({ email });
            if (response.status === 200 && response.data.message === "mail send successfully") {
                setStep(2);
                setMessage("OTP sent to your email.");
            }
        } catch (err) {
            setError(err?.message || "Failed to send OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const response = await forgotPasswordVerifyOtp({ email,password:newPassword,otp  });
            if (response.status === 200 && response.data.message === "password changed successfully") {
                setMessage("Password reset successfully. You can now login.");
                setTimeout(() => {
                    navigate("/login");
                }, 500);
            }
        } catch (err) {
            setError(err?.message || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <Box component="form" sx={{ mt: 1 }}>
                    {/* Email Field: Always visible */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={step === 2 || loading} // Disable after OTP is sent
                    />

                    {error && <Alert severity="error">{error}</Alert>}
                    {message && <Alert severity="success">{message}</Alert>}

                    {step === 1 && (
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSendOtp}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Send OTP"}
                        </Button>
                    )}

                    {step === 2 && (
                        <>
                            {/* OTP Field */}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="otp"
                                label="Enter OTP"
                                name="otp"
                                inputProps={{
                                    maxLength: 6, // Limit to 6 characters
                                    inputMode: "numeric", // Show numeric keyboard on mobile devices
                                    pattern: "[0-9]*", // Accept only numeric input
                                }}
                                autoFocus
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                disabled={loading}
                            />

                            {/* New Password Field */}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="newPassword"
                                label="New Password"
                                name="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                disabled={loading}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleVerifyOtp}
                                disabled={loading ||!newPassword || !otp}
                            >
                                {loading ? <CircularProgress size={24} /> : "Verify OTP & Reset Password"}
                            </Button>
                        </>
                    )}

                </Box>
            </Box>
        </Container>
    );
};

export default ForgotPassword;
