import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { verifyOtp } from "../api/verification"; // Mocked API calls
import { resendOtp } from "../api/verification";

const VerifyUser = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const email = new URLSearchParams(location.search).get("email");

    const handleVerify = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);


        try {
            const response = await verifyOtp({ email,verificationCode:otp });
            if (response.status === 200) {
                setLoading(true)
                setSuccess("Verification successful! Redirecting...");
                setTimeout(() => {
                    navigate("/login");
                }, 500);
            } else {
                throw new Error("Invalid OTP. Please try again.");
            }
        } catch (err) {
            setError(err.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await resendOtp({ email });
            if (response.status === 200) {
                setSuccess("OTP has been resent to your email.");
            } else {
                throw new Error("Failed to resend OTP. Please try again later.");
            }
        } catch (err) {
            setError(err.message || "An error occurred.");
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
                    Verify Your Account
                </Typography>
                <Typography sx={{ mt: 2, mb: 2 }}>
                    We have sent a verification email to <strong>{email}</strong>. Please enter the 6-digit OTP to verify your account.
                </Typography>
                {success && <Alert severity="success">{success}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
                <Box component="form" onSubmit={handleVerify} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="otp"
                        label="Enter OTP"
                        name="otp"
                        inputProps={{
                            maxLength: 6, 
                            inputMode: "numeric", 
                            pattern: "[0-9]*", 
                        }}
                        autoFocus
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Verify"}
                    </Button>
                </Box>
                <Typography align="center" sx={{ mt: 2 }}>
                    Didn't receive an OTP?{" "}
                    <Button onClick={handleResend} disabled={loading}>
                        Resend OTP
                    </Button>
                </Typography>
            </Box>
        </Container>
    );
};

export default VerifyUser;
