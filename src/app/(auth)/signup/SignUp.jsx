import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import '../../../styles/auth/signup.css';
import Logo from '../../../assets/logo.svg';
import { Eye, EyeOff } from 'lucide-react';
import { useSignupFormHandlers } from '../../../forms/handlers/formHandlers';
import { getFieldGroups } from '../../../forms/utils/formUtils';

export default function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const fieldGroups = getFieldGroups('signup');
    
    const {
        formData,
        errors,
        isDisabled,
        handleChange,
        handlePhoneChange,
        handleBlur,
        submitSignup
    } = useSignupFormHandlers();

    const handleSubmit = (e) => {
        e.preventDefault();
        submitSignup(navigate);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const renderFieldGroup = (group) => {
        return (
            <div className="signup-row" key={group.join('-')}>
                {group.map((fieldName) => {
                    if (fieldName === 'phone') {
                        return (
                            <div className="signup-column" key={fieldName}>
                                <label htmlFor={fieldName}>Phone:</label>
                                <PhoneInput
                                    defaultCountry="us"
                                    value={formData[fieldName]}
                                    onChange={handlePhoneChange}
                                    inputProps={{
                                        name: fieldName,
                                        id: fieldName,
                                        className: 'signup-phone-input',
                                        autoFocus: false,
                                        onBlur: handleBlur
                                    }}
                                    inputStyle={{ fontFamily: 'Raleway, sans-serif' }}
                                    countrySelectorStyleProps={{
                                        buttonClassName: `signup-phone-button ${errors[fieldName] ? 'my-phone-error' : ''}`,
                                        dropdownStyleProps: {
                                            className: 'signup-phone-dropdown'
                                        }
                                    }}
                                />
                                {errors[fieldName] && <span className="signup-error-message">{errors[fieldName]}</span>}
                            </div>
                        );
                    }
                    
                    if (fieldName === 'gender') {
                        return (
                            <div className="signup-column" key={fieldName}>
                                <label htmlFor={fieldName}>Gender:</label>
                                <select
                                    id={fieldName}
                                    name={fieldName}
                                    value={formData[fieldName]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`signup-select ${errors[fieldName] ? 'signup-error' : ''}`}
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="prefer-not">Prefer not to say</option>
                                </select>
                                {errors[fieldName] && <span className="signup-error-message">{errors[fieldName]}</span>}
                            </div>
                        );
                    }
                    
                    if (fieldName === 'password') {
                        return (
                            <div className="signup-column" key={fieldName}>
                                <label htmlFor={fieldName}>Password:</label>
                                <div className="signup-password-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id={fieldName}
                                        name={fieldName}
                                        placeholder="Password"
                                        value={formData[fieldName]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`signup-input signup-full-width ${errors[fieldName] ? 'signup-error' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        className="signup-password-toggle"
                                        onClick={togglePasswordVisibility}
                                        tabIndex="-1"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors[fieldName] && <span className="signup-error-message">{errors[fieldName]}</span>}
                            </div>
                        );
                    }
                    
                    const fieldType = fieldName === 'email' ? 'email' : fieldName === 'dob' ? 'date' : 'text';
                    
                    return (
                        <div className="signup-column" key={fieldName}>
                            <label htmlFor={fieldName}>{fieldName === 'dob' ? 'Date of Birth:' : 
                                  fieldName === 'firstName' ? 'First Name:' :
                                  fieldName === 'lastName' ? 'Last Name:' :
                                  fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ':'}</label>
                            <input
                                type={fieldType}
                                id={fieldName}
                                name={fieldName}
                                placeholder={fieldName === 'dob' ? '' : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                                value={formData[fieldName]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`signup-input ${errors[fieldName] ? 'signup-error' : ''}`}
                            />
                            {errors[fieldName] && <span className="signup-error-message">{errors[fieldName]}</span>}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="signup-container">
            <div className="signup-left-side">
                <img src={Logo} alt="logo" className="signup-logo" />
                <p className="signup-heading">Sign Up</p>
                <p className="signup-login-text">
                    Already have an account? <a href="/login" className="signup-login-link">Login</a>
                </p>

                <form onSubmit={handleSubmit} className="signup-form-grid">
                    {fieldGroups.map(renderFieldGroup)}
                    
                    <button type="submit" className={`signup-button ${isDisabled ? 'signup-button-disabled' : ''}`} disabled={isDisabled}>
                        Sign Up
                    </button>
                </form>
            </div>

            <div className="signup-right-side"></div>
        </div>
    );
}