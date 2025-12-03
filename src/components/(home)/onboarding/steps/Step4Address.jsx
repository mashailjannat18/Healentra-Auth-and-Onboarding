import React from 'react';

export default function Step4Address({ formData, errors, handleInputChange }) {
    return (
        <>
            <div className="onboarding-form-group">
                <label>Street Address *</label>
                <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="Enter your street address"
                />
                {errors.streetAddress && <span className="onboarding-error-message">{errors.streetAddress}</span>}
            </div>

            <div className="onboarding-row">
                <div className="onboarding-form-group half">
                    <label>City *</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter your city"
                    />
                    {errors.city && <span className="onboarding-error-message">{errors.city}</span>}
                </div>
                <div className="onboarding-form-group half">
                    <label>State *</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Enter your state"
                    />
                    {errors.state && <span className="onboarding-error-message">{errors.state}</span>}
                </div>
            </div>

            <div className="onboarding-row">
                <div className="onboarding-form-group half">
                    <label>Country *</label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                    >
                        <option value="">Select your country</option>
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.country && <span className="onboarding-error-message">{errors.country}</span>}
                </div>
                <div className="onboarding-form-group half">
                    <label>ZIP/Postal Code *</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="Enter ZIP code"
                    />
                    {errors.zipCode && <span className="onboarding-error-message">{errors.zipCode}</span>}
                </div>
            </div>
        </>
    );
}