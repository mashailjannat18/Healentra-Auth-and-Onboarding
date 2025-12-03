import React from 'react';

export default function Step3Experience({ 
    formData, 
    errors, 
    handleArrayFieldChange, 
    handleAddExperience, 
    handleRemoveExperience 
}) {
    return (
        <>
            <div className="sectionHeader">
                <h3>Work Experience</h3>
                <button type="button" onClick={handleAddExperience} className="addButton">
                    + Add Experience
                </button>
            </div>

            {formData.experiences.map((experience, index) => (
                <div key={experience.id} className="experienceItem">
                    <div className="itemHeader">
                        <h4>Experience #{index + 1}</h4>
                        <button
                            type="button"
                            onClick={() => handleRemoveExperience(index)}
                            className="deleteButton"
                        >
                            🗑️ Delete
                        </button>
                    </div>

                    <div className="onboarding-form-group">
                        <label>Hospital/Clinic Name *</label>
                        <input
                            type="text"
                            value={experience.hospital}
                            onChange={(e) => handleArrayFieldChange('experiences', index, 'hospital', e.target.value)}
                            placeholder="e.g., General Hospital"
                        />
                        {errors[`experienceHospital_${index}`] && (
                            <span className="onboarding-error-message">{errors[`experienceHospital_${index}`]}</span>
                        )}
                    </div>

                    <div className="onboarding-form-group">
                        <label>Position/Role *</label>
                        <input
                            type="text"
                            value={experience.position}
                            onChange={(e) => handleArrayFieldChange('experiences', index, 'position', e.target.value)}
                            placeholder="e.g., Senior Surgeon"
                        />
                        {errors[`experiencePosition_${index}`] && (
                            <span className="onboarding-error-message">{errors[`experiencePosition_${index}`]}</span>
                        )}
                    </div>

                    <div className="onboarding-row">
                        <div className="onboarding-form-group half">
                            <label>Start Date *</label>
                            <input
                                type="date"
                                value={experience.startDate}
                                onChange={(e) => handleArrayFieldChange('experiences', index, 'startDate', e.target.value)}
                                className='startDateInput'
                            />
                            {errors[`experienceStartDate_${index}`] && (
                                <span className="onboarding-error-message">{errors[`experienceStartDate_${index}`]}</span>
                            )}
                        </div>
                        <div className="onboarding-form-group half">
                            <label>End Date *</label>
                            <input
                                type="date"
                                value={experience.endDate}
                                onChange={(e) => handleArrayFieldChange('experiences', index, 'endDate', e.target.value)}
                                className='endDateInput'
                            />
                            {errors[`experienceEndDate_${index}`] && (
                                <span className="onboarding-error-message">{errors[`experienceEndDate_${index}`]}</span>
                            )}
                        </div>
                    </div>

                    <div className="onboarding-form-group">
                        <label>Description (Optional)</label>
                        <textarea
                            value={experience.description}
                            onChange={(e) => handleArrayFieldChange('experiences', index, 'description', e.target.value)}
                            rows="3"
                            placeholder="Describe your responsibilities and achievements..."
                        />
                    </div>
                </div>
            ))}

            {formData.experiences.length === 0 && (
                <p className="no-items-message">No work experiences added yet. Click "Add Experience" to get started.</p>
            )}
            {errors.experiences && <span className="onboarding-error-message">{errors.experiences}</span>}
        </>
    );
}