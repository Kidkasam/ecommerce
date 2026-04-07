import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirm: '',
    });
    const [step, setStep] = useState(1); // 1 for register, 2 for OTP
    const [otp, setOtp] = useState('');

    const { register, verifyOtp } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const success = await register(formData);
        if (success) {
            setStep(2); // Move to OTP verification step
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const success = await verifyOtp(formData.email, otp);
        if (success) {
            navigate('/login');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="auth-container"
        >
            <div className="auth-card">
                <h2>{step === 1 ? 'Join KFITS' : 'Verify Email'}</h2>
                <p>{step === 1 ? 'Register to unlock exclusive benefits' : 'Enter the OTP sent to your email'}</p>
                
                {step === 1 ? (
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="input-group">
                            <label>First Name</label>
                            <input type="text" name="first_name" placeholder="John" value={formData.first_name} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Last Name</label>
                            <input type="text" name="last_name" placeholder="Doe" value={formData.last_name} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Email Address</label>
                            <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Phone Number</label>
                            <input type="text" name="phone_number" placeholder="1234567890" value={formData.phone_number} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input type="password" name="password_confirm" placeholder="••••••••" value={formData.password_confirm} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="auth-btn">Create Account</button>
                    </form>
                ) : (
                    <form onSubmit={handleOtpSubmit}>
                        <div className="input-group">
                            <label>Enter 6-digit OTP</label>
                            <input type="text" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength="6" />
                        </div>
                        <button type="submit" className="auth-btn">Verify Email</button>
                    </form>
                )}
                
                {step === 1 && (
                    <p className="auth-footer">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default Register;
