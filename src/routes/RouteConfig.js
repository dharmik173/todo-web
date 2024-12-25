// routes/RouteConfig.js
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../components/Login";
import TodoList from "../components/TodoList";
import SignupForm from "../components/SignupForm";
import VerifyUser from "../components/VerifyUser";
import ForgotPassword from "../components/ForgotPassword ";

const RouteConfig = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("UserToken"));

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem("UserToken"));
        };
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
            <Route
                path="/signup"
                element={isAuthenticated ? <Navigate to="/home" /> : <SignupForm />}
            />
            <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/home" /> : <Login setAuth={setIsAuthenticated} />}
            />
            <Route
                path="/home"
                element={isAuthenticated ? <TodoList setAuth={setIsAuthenticated} /> : <Navigate to="/login" />}
            />
            <Route
                path="/verify"
                element={isAuthenticated ? <TodoList setAuth={setIsAuthenticated} /> : <VerifyUser/>}
            />
            <Route
                path="/forgot-password"
                element={isAuthenticated ? <TodoList setAuth={setIsAuthenticated} /> : <ForgotPassword />}
            />
        </Routes>
    );
};

export default RouteConfig;
