import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = async (email, password) => {
        try {
            const response = await api.post('users/login/', { email, password });
            const data = response.data;
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            
            const profileRes = await api.get('users/profile/', {
                headers: { Authorization: `Bearer ${data.access}` }
            });
            const userData = profileRes.data;

            setUser({ ...userData, token: data.access });
            toast.success(`Welcome back, ${userData.first_name || email.split("@")[0]}!`, {
                icon: '👤',
                style: { borderRadius: '10px', background: '#333', color: '#fff' },
            });
            return true;
        } catch (error) {
            toast.error(error.response?.data?.detail || "Login failed. Please check your credentials.", {
                style: { borderRadius: '10px', background: '#333', color: '#fff' },
            });
            return false;
        }
    };

    const register = async (userData) => {
        try {
            await api.post('users/register/', userData);
            toast.success(`Account created! Please verify your email with the OTP sent.`, {
                icon: '✨',
                style: { borderRadius: '10px', background: '#333', color: '#fff' },
            });
            return true;
        } catch (error) {
            toast.error(error.response?.data?.email?.[0] || "Registration failed", {
                style: { borderRadius: '10px', background: '#333', color: '#fff' },
            });
            return false;
        }
    };

    const verifyOtp = async (email, otp) => {
        try {
            await api.post('users/verify-otp/', { email, otp });
            toast.success(`Email verified successfully! You can now log in.`, {
                icon: '✅',
                style: { borderRadius: '10px', background: '#333', color: '#fff' },
            });
            return true;
        } catch (error) {
            toast.error(error.response?.data?.error || "OTP verification failed", {
                style: { borderRadius: '10px', background: '#333', color: '#fff' },
            });
            return false;
        }
    };

    const logout = () => {
        const refresh = localStorage.getItem('refresh_token');
        if (refresh) {
            api.post('users/logout/', { refresh }).catch(err => console.log(err));
        }
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
        toast.info("Logged out", {
            icon: '👋',
            style: { borderRadius: '10px', background: '#333', color: '#fff' },
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, verifyOtp }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
