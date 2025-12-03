import React from 'react';

export default function Step5Documents({ formData, errors, handleFileUpload }) {
    return (
        <>
            <div className="sectionHeader">
                <h3>Required Documents</h3>
                <p className="file-instructions">Please upload all required documents (PDF, JPG, PNG, DOC, DOCX)</p>
            </div>

            <div className="onboarding-row">
                <div className="onboarding-form-group half">
                    <label>Medical License *</label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.png,.doc,.docx"
                        onChange={(e) => handleFileUpload('medicalLicense', e.target.files[0])}
                    />
                    {errors.medicalLicense && <span className="onboarding-error-message">{errors.medicalLicense}</span>}
                </div>
                <div className="onboarding-form-group half">
                    <label>DEA Certificate *</label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.png,.doc,.docx"
                        onChange={(e) => handleFileUpload('deaCertificate', e.target.files[0])}
                    />
                    {errors.deaCertificate && <span className="onboarding-error-message">{errors.deaCertificate}</span>}
                </div>
            </div>

            <div className="onboarding-row">
                <div className="onboarding-form-group half">
                    <label>Board Certification *</label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.png,.doc,.docx"
                        onChange={(e) => handleFileUpload('boardCertification', e.target.files[0])}
                    />
                    {errors.boardCertification && <span className="onboarding-error-message">{errors.boardCertification}</span>}
                </div>
                <div className="onboarding-form-group half">
                    <label>Medical School Diploma *</label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.png,.doc,.docx"
                        onChange={(e) => handleFileUpload('medicalSchoolDiploma', e.target.files[0])}
                    />
                    {errors.medicalSchoolDiploma && <span className="onboarding-error-message">{errors.medicalSchoolDiploma}</span>}
                </div>
            </div>

            <div className="onboarding-form-group">
                <label>Government Issued ID *</label>
                <input
                    type="file"
                    accept=".pdf,.jpg,.png,.doc,.docx"
                    onChange={(e) => handleFileUpload('governmentID', e.target.files[0])}
                />
                {errors.governmentID && <span className="onboarding-error-message">{errors.governmentID}</span>}
            </div>
        </>
    );
}