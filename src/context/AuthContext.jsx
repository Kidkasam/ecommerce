import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

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

    const login = (email, password) => {
        // Mocking auth logic
        if (email && password) {
            const mockUser = {
                name: email.split("@")[0],
                email: email,
                token: "fake-jwt-token",
            };
            setUser(mockUser);
            toast.success(`Welcome back, ${mockUser.name}!`, {
                icon: '👤',
                style: { borderRadius: '10px', background: '#333', color: '#fff' },
            });
            return true;
        }
        return false;
    };

    const register = (name, email, password) => {
        // Mocking auth logic
        const newUser = { name, email, token: "fake-jwt-token" };
        setUser(newUser);
        toast.success(`Account created! Welcome, ${name}.`, {
            icon: '✨',
            style: { borderRadius: '10px', background: '#333', color: '#fff' },
        });
        return true;
    };

    const logout = () => {
        setUser(null);
        toast.info("Logged out", {
            icon: '👋',
            style: { borderRadius: '10px', background: '#333', color: '#fff' },
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
