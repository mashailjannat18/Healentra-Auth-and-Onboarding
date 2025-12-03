import React from 'react';

export default function Step2Education({ 
    formData, 
    errors, 
    handleArrayFieldChange, 
    handleAddCertificate, 
    handleRemoveCertificate 
}) {
    return (
        <>
            <div className="sectionHeader">
                <h3>Education & Certificates</h3>
                <button type="button" onClick={handleAddCertificate} className="addButton">
                    + Add Certificate
                </button>
            </div>

            {formData.certificates.map((certificate, index) => (
                <div key={certificate.id} className="certificateItem">
                    <div className="itemHeader">
                        <h4>Certificate #{index + 1}</h4>
                        <button
                            type="button"
                            onClick={() => handleRemoveCertificate(index)}
                            className="deleteButton"
                        >
                            🗑️ Delete
                        </button>
                    </div>

                    <div className="onboarding-form-group">
                        <label>Certificate Name *</label>
                        <input
                            type="text"
                            value={certificate.name}
                            onChange={(e) => handleArrayFieldChange('certificates', index, 'name', e.target.value)}
                            placeholder="e.g., Medical Board Certification"
                        />
                        {errors[`certificateName_${index}`] && (
                            <span className="onboarding-error-message">{errors[`certificateName_${index}`]}</span>
                        )}
                    </div>

                    <div className="onboarding-form-group">
                        <label>Institution Name *</label>
                        <input
                            type="text"
                            value={certificate.institution}
                            onChange={(e) => handleArrayFieldChange('certificates', index, 'institution', e.target.value)}
                            placeholder="e.g., Harvard Medical School"
                        />
                        {errors[`certificateInstitution_${index}`] && (
                            <span className="onboarding-error-message">{errors[`certificateInstitution_${index}`]}</span>
                        )}
                    </div>

                    <div className="onboarding-row">
                        <div className="onboarding-form-group half">
                            <label>Start Date *</label>
                            <input
                                type="date"
                                value={certificate.startDate}
                                onChange={(e) => handleArrayFieldChange('certificates', index, 'startDate', e.target.value)}
                                className='startDateInput'
                            />
                            {errors[`certificateStartDate_${index}`] && (
                                <span className="onboarding-error-message">{errors[`certificateStartDate_${index}`]}</span>
                            )}
                        </div>
                        <div className="onboarding-form-group half">
                            <label>End Date *</label>
                            <input
                                type="date"
                                value={certificate.endDate}
                                onChange={(e) => handleArrayFieldChange('certificates', index, 'endDate', e.target.value)}
                                className='endDateInput'
                            />
                            {errors[`certificateEndDate_${index}`] && (
                                <span className="onboarding-error-message">{errors[`certificateEndDate_${index}`]}</span>
                            )}
                        </div>
                    </div>

                    <div className="onboarding-form-group">
                        <label>Description (Optional)</label>
                        <textarea
                            value={certificate.description}
                            onChange={(e) => handleArrayFieldChange('certificates', index, 'description', e.target.value)}
                            rows="3"
                            placeholder="Additional details about this certificate..."
                        />
                    </div>
                </div>
            ))}

            {formData.certificates.length === 0 && (
                <p className="no-items-message">No certificates added yet. Click "Add Certificate" to get started.</p>
            )}
            {errors.certificates && <span className="onboarding-error-message">{errors.certificates}</span>}
        </>
    );
}