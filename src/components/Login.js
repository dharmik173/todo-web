import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../api/auth";
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

const Login = ({ setAuth }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const data = await loginUser({ email, password });
            setSuccess("Login successful!");
            if (data) {
                if (
                    data.data.message === "login Successfully" &&
                    data.status === 200
                ) {
                    if(data.data.user && data.data.user.status==="not verified"){

                        navigate(`/verify?email=${email}`);
                    }else{
                        localStorage.setItem("UserToken", data.data.token);
                        localStorage.setItem("UserState", JSON.stringify(data.data.user));
    
                        setAuth(true);
                        navigate("/home");
                    }
                   
                }
            }
        } catch (err) {
            setError(err?.message || "An error occurred");
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
                    Login
                </Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
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
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Login"}
                    </Button>
                    <Typography align="center" sx={{ mt: 2 }}>
                        New user?{" "}
                        <Link
                            to="/signup"
                            style={{ textDecoration: "none", color: "#1976d2" }}
                        >
                            Signup
                        </Link>
                    </Typography>
                    <Typography align="center" sx={{ mt: 2 }}>
                        Forgot password?{" "}
                        <Link
                            to="/forgot-password"
                            style={{ textDecoration: "none", color: "#1976d2" }}
                        >
                            Click here
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
