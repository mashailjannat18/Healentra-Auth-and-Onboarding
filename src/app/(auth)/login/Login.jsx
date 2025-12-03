import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/auth/login.css';
import Logo from '../../../assets/logo.svg';
import { Eye, EyeOff } from 'lucide-react';
import { useLoginFormHandlers } from '../../../forms/handlers/formHandlers';

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    
    const {
        formData,
        errors,
        isDisabled,
        handleChange,
        handleBlur,
        submitLogin
    } = useLoginFormHandlers();

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin(navigate);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-left-side">
                <img src={Logo} alt="logo" className="login-logo" width="242" height="52" />
                <p className="login-heading">Sign In</p>
                <p className="login-login-text">
                    Don't have an account? <a href="/" className="login-login-link">Create Now</a>
                </p>

                <form onSubmit={handleSubmit} className="login-form-grid">
                    {/* Email Field */}
                    <div className="login-column">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`login-input ${errors.email ? 'login-error' : ''}`}
                        />
                        {errors.email && <span className="login-error-message">{errors.email}</span>}
                    </div>

                    {/* Password Field with toggle */}
                    <div className="login-column">
                        <label htmlFor="password">Password:</label>
                        <div className="login-password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`login-input login-full-width ${errors.password ? 'login-error' : ''}`}
                            />
                            <button
                                type="button"
                                className="login-password-toggle"
                                onClick={togglePasswordVisibility}
                                tabIndex="-1"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && <span className="login-error-message">{errors.password}</span>}
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className={`login-button ${isDisabled ? 'login-button-disabled' : ''}`} 
                        disabled={isDisabled}
                    >
                        Sign In
                    </button>
                </form>
            </div>

            <div className="login-right-side"></div>
        </div>
    );
}