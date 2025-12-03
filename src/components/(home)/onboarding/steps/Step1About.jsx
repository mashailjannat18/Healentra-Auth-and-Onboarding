import React from 'react';

export default function Step1About({ 
    formData, 
    errors, 
    specializations, 
    handleInputChange, 
    handleSpecializationSelect, 
    handleRemoveSpecialization 
}) {
    return (
        <>
            <div className="onboarding-form-group">
                <label>Field of Specialization *</label>
                <select onChange={handleSpecializationSelect} defaultValue="">
                    <option value="" disabled>Choose your specialization</option>
                    {!specializations.length ? (
                        <option value="" disabled>Loading specializations...</option>
                    ) : (
                        specializations.map((spec) => (
                            <option key={spec.id} value={spec.id}>
                                {spec.name}
                            </option>
                        ))
                    )}
                </select>
                <div className="specializationTags">
                    {formData.specialization.map((specId, index) => {
                        const spec = specializations.find(s => s.id === specId);
                        return (
                            <span key={index} className="onboarding-tag">
                                {spec?.name || 'Unknown'}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSpecialization(index)}
                                    className="tagRemove"
                                >
                                    ×
                                </button>
                            </span>
                        );
                    })}
                </div>
            
                {errors.specialization && <span className="onboarding-error-message">{errors.specialization}</span>}
            </div>

            <div className="onboarding-form-group">
                <label>Years of Experience *</label>
                <input
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    min="0"
                    max="50"
                    placeholder="Enter years of experience"
                />
                {errors.yearsOfExperience && <span className="onboarding-error-message">{errors.yearsOfExperience}</span>}
            </div>

            <div className="onboarding-form-group">
                <label>About Yourself *</label>
                <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Tell us about your professional background and interests..."
                />
                {errors.about && <span className="onboarding-error-message">{errors.about}</span>}
            </div>
        </>
    );
}