import React, { useEffect, useState } from 'react';
import { useOnboardingFormHandlers } from '../../forms/handlers/onboarding/formHandlers';
import { useOnboardingHook } from '../../hooks/useOnboardingHook';
import {
    Step1About,
    Step2Education,
    Step3Experience,
    Step4Address,
    Step5Documents
} from './onboarding/steps/index';
import '../../styles/home/onboarding/onboardingmodal.css';

export default function OnboardingModal({ isOpen, onClose }) {
    const { getSpecialities } = useOnboardingHook();
    const [specializations, setSpecializations] = useState([]);
    
    const {
        formData,
        errors,
        currentStep,
        isSubmitting,
        steps,
        handleInputChange,
        handleArrayFieldChange,
        handleSpecializationSelect,
        handleRemoveSpecialization,
        handleAddCertificate,
        handleRemoveCertificate,
        handleAddExperience,
        handleRemoveExperience,
        handleFileUpload,
        handleNextStep,
        handlePreviousStep,
        handleSubmit,
        handleReset,
    } = useOnboardingFormHandlers();

    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                const response = await getSpecialities();
                console.log("Specializations: ", response);
                setSpecializations(response || []);
            } catch (error) {
                console.error('Error fetching specializations:', error);
            }
        };

        if (isOpen) {
            fetchSpecializations();
            handleReset();
        }
    }, [isOpen, getSpecialities]);

    if (!isOpen) {
        return null;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const success = await handleSubmit(onClose);
        if (success) {
            console.log('User completed onboarding!');
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1About
                        formData={formData}
                        errors={errors}
                        specializations={specializations}
                        handleInputChange={handleInputChange}
                        handleSpecializationSelect={handleSpecializationSelect}
                        handleRemoveSpecialization={handleRemoveSpecialization}
                    />
                );
            case 2:
                return (
                    <Step2Education
                        formData={formData}
                        errors={errors}
                        handleArrayFieldChange={handleArrayFieldChange}
                        handleAddCertificate={handleAddCertificate}
                        handleRemoveCertificate={handleRemoveCertificate}
                    />
                );
            case 3:
                return (
                    <Step3Experience
                        formData={formData}
                        errors={errors}
                        handleArrayFieldChange={handleArrayFieldChange}
                        handleAddExperience={handleAddExperience}
                        handleRemoveExperience={handleRemoveExperience}
                    />
                );
            case 4:
                return (
                    <Step4Address
                        formData={formData}
                        errors={errors}
                        handleInputChange={handleInputChange}
                    />
                );
            case 5:
                return (
                    <Step5Documents
                        formData={formData}
                        errors={errors}
                        handleFileUpload={handleFileUpload}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="onboarding-modal-overlay">
            <div className="onboarding-modal-content">
                <div className="onboarding-head">
                    <div className="onboarding-modal-header">
                        <h2>Complete your onboarding</h2>
                        <p>Provide your complete detail to proceed</p>
                    </div>

                    <div className="onboarding-steps-container">
                        {steps.map((step, index) => (
                            <div key={step.number} className="onboarding-step-wrapper">
                                <div className="stepItem">
                                    <div className={`onboarding-step-circle ${currentStep > step.number ? 'completed' : ''} ${currentStep === step.number ? 'active' : ''}`}>
                                        {currentStep > step.number ? '✓' : step.number}
                                    </div>
                                    <span className={`onboarding-step-name ${currentStep === step.number ? 'active' : ''}`}>
                                        {step.name}
                                    </span>
                                </div>
                                {index < steps.length - 1 && <div className="onboarding-step-connector"></div>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="onboarding-form-content">
                    <form onSubmit={handleFormSubmit}>
                        <div className="stepContent">
                            {renderStepContent()}
                        </div>
                    </form>
                </div>

                <div className="onboarding-modal-actions">
                    {currentStep > 1 && (
                        <button 
                            type="button" 
                            onClick={handlePreviousStep} 
                            className="onboarding-button-secondary"
                            disabled={isSubmitting}
                        >
                            Back
                        </button>
                    )}
                
                    <div style={{flex: 1}}></div>
                
                    {currentStep < steps.length ? (
                        <button 
                            type="button" 
                            onClick={handleNextStep} 
                            className="onboarding-button-primary"
                            disabled={isSubmitting}
                        >
                            Next
                        </button>
                    ) : (
                        <button 
                            type="submit"
                            className="onboarding-button-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Complete Onboarding'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}