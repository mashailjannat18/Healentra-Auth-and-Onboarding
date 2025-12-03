import { useState, useCallback } from 'react';
import { useOnboardingHook } from '../../../hooks/useOnboardingHook';
import { initialOnboardingValues, initialOnboardingErrors, onboardingSteps } from '../../values/onboarding/initialValues';

export const useOnboardingFormHandlers = () => {
    const { onboardingSubmit } = useOnboardingHook();

    const [formData, setFormData] = useState(initialOnboardingValues);
    const [errors, setErrors] = useState(initialOnboardingErrors);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateOnboardingStep = (step, formData) => {
        const errors = {};
        
        switch (step) {
            case 1:
                const specializationError = validationRules.specialization(formData.specialization, formData);
                if (specializationError) errors.specialization = specializationError;
                
                const yearsError = validationRules.yearsOfExperience(formData.yearsOfExperience, formData);
                if (yearsError) errors.yearsOfExperience = yearsError;
                
                const aboutError = validationRules.about(formData.about, formData);
                if (aboutError) errors.about = aboutError;
                break;
                
            case 2:
                if (formData.certificates.length === 0) {
                    errors.certificates = 'Please add at least one certificate';
                } else {
                    formData.certificates.forEach((cert, index) => {
                        const nameError = validationRules.certificateName(cert.name, formData, index);
                        if (nameError) errors[`certificateName_${index}`] = nameError;
                        
                        const institutionError = validationRules.certificateInstitution(cert.institution, formData, index);
                        if (institutionError) errors[`certificateInstitution_${index}`] = institutionError;
                        
                        const startError = validationRules.certificateStartDate(cert.startDate, formData, index);
                        if (startError) errors[`certificateStartDate_${index}`] = startError;
                        
                        const endError = validationRules.certificateEndDate(cert.endDate, formData, index);
                        if (endError) errors[`certificateEndDate_${index}`] = endError;
                    });
                }
                break;
                
            case 3:
                if (formData.experiences.length === 0) {
                    errors.experiences = 'Please add at least one work experience';
                } else {
                    formData.experiences.forEach((exp, index) => {
                        const hospitalError = validationRules.experienceHospital(exp.hospital, formData, index);
                        if (hospitalError) errors[`experienceHospital_${index}`] = hospitalError;
                        
                        const positionError = validationRules.experiencePosition(exp.position, formData, index);
                        if (positionError) errors[`experiencePosition_${index}`] = positionError;
                        
                        const startError = validationRules.experienceStartDate(exp.startDate, formData, index);
                        if (startError) errors[`experienceStartDate_${index}`] = startError;
                        
                        const endError = validationRules.experienceEndDate(exp.endDate, formData, index);
                        if (endError) errors[`experienceEndDate_${index}`] = endError;
                    });
                }
                break;
                
            case 4:
                const streetError = validationRules.streetAddress(formData.streetAddress, formData);
                if (streetError) errors.streetAddress = streetError;
                
                const cityError = validationRules.city(formData.city, formData);
                if (cityError) errors.city = cityError;
                
                const stateError = validationRules.state(formData.state, formData);
                if (stateError) errors.state = stateError;
                
                const countryError = validationRules.country(formData.country, formData);
                if (countryError) errors.country = countryError;
                
                const zipError = validationRules.zipCode(formData.zipCode, formData);
                if (zipError) errors.zipCode = zipError;
                break;
                
            case 5:
                const licenseError = validationRules.medicalLicense(formData.medicalLicense, formData);
                if (licenseError) errors.medicalLicense = licenseError;
                
                const deaError = validationRules.deaCertificate(formData.deaCertificate, formData);
                if (deaError) errors.deaCertificate = deaError;
                
                const boardError = validationRules.boardCertification(formData.boardCertification, formData);
                if (boardError) errors.boardCertification = boardError;
                
                const diplomaError = validationRules.medicalSchoolDiploma(formData.medicalSchoolDiploma, formData);
                if (diplomaError) errors.medicalSchoolDiploma = diplomaError;
                
                const idError = validationRules.governmentID(formData.governmentID, formData);
                if (idError) errors.governmentID = idError;
                break;
        }
        
        return errors;
    };

    const validateField = (fieldName, value, formData, index = null) => {
        const rule = validationRules[fieldName];
        if (rule) {
            return rule(value, formData, index);
        }
        return '';
    };

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        const error = validateField(name, value, formData);
        if (error) {
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    }, [formData]);

    const handleArrayFieldChange = useCallback((arrayName, index, field, value) => {
        setFormData(prev => {
            const newArray = [...prev[arrayName]];
            if (newArray[index]) {
                newArray[index] = {
                    ...newArray[index],
                    [field]: value
                };
            }
            return {
                ...prev,
                [arrayName]: newArray
            };
        });

        const baseFieldName = arrayName === 'certificates' ? 'certificate' : 'experience';
        const fieldKey = `${baseFieldName}${field.charAt(0).toUpperCase() + field.slice(1)}`;
        const errorKey = `${fieldKey}_${index}`;
        
        const error = validateField(fieldKey, value, formData, index);
        if (error) {
            setErrors(prev => ({
                ...prev,
                [errorKey]: error
            }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[errorKey];
                return newErrors;
            });
        }
    }, [formData]);

    const handleSpecializationSelect = useCallback((e) => {
        const selectedId = e.target.value;
        if (selectedId && !formData.specialization.includes(selectedId)) {
            const newSpecializations = [...formData.specialization, selectedId];
            setFormData(prev => ({
                ...prev,
                specialization: newSpecializations
            }));
            
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.specialization;
                return newErrors;
            });
            
            e.target.value = '';
        }
    }, [formData.specialization]);

    const handleRemoveSpecialization = useCallback((index) => {
        setFormData(prev => ({
            ...prev,
            specialization: prev.specialization.filter((_, i) => i !== index)
        }));
    }, []);

    const handleAddCertificate = useCallback(() => {
        setFormData(prev => ({
            ...prev,
            certificates: [
                ...prev.certificates,
                {
                    id: Date.now(),
                    name: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                }
            ]
        }));
        
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.certificates;
            return newErrors;
        });
    }, []);

    const handleRemoveCertificate = useCallback((index) => {
        setFormData(prev => ({
            ...prev,
            certificates: prev.certificates.filter((_, i) => i !== index)
        }));
    }, []);

    const handleAddExperience = useCallback(() => {
        setFormData(prev => ({
            ...prev,
            experiences: [
                ...prev.experiences,
                {
                    id: Date.now(),
                    hospital: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                }
            ]
        }));
        
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.experiences;
            return newErrors;
        });
    }, []);

    const handleRemoveExperience = useCallback((index) => {
        setFormData(prev => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== index)
        }));
    }, []);

    const handleFileUpload = useCallback((fieldName, file) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: file
        }));

        const error = validateField(fieldName, file, formData);
        if (error) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: error
            }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        }
    }, [formData]);

    const handleNextStep = useCallback(() => {
        const newErrors = validateOnboardingStep(currentStep, formData);

        if (Object.keys(newErrors).length === 0) {
            setErrors({});
            setCurrentStep(prev => prev + 1);
        } else {
            setErrors(newErrors);
        }
    }, [currentStep, formData]);

    const handlePreviousStep = useCallback(() => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            setErrors({});
        }
    }, [currentStep]);

    const handleSubmit = useCallback(async (onClose) => {
        const newErrors = validateOnboardingStep(currentStep, formData);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }

        try {
            setIsSubmitting(true);

            const submissionData = new FormData();

            formData.specialization.forEach(id => {
                submissionData.append('specialities[]', id);
            });

            submissionData.append('experience', formData.yearsOfExperience || '');
            submissionData.append('about', formData.about || '');
            submissionData.append('NoOfYearExperience', formData.yearsOfExperience || '');
            submissionData.append('consultationFee', '0');
            submissionData.append('languages', 'English');

            const education = formData.certificates.map(cert => ({
                degree: cert.name,
                institute: cert.institution,
                certificateStartDate: cert.startDate || '',
                certificateEndDate: cert.endDate || '',
                description: cert.description || ''
            }));
            submissionData.append('education', JSON.stringify(education));

            const experiences = formData.experiences.map(exp => ({
                hospital: exp.hospital,
                position: exp.position,
                from: exp.startDate || '',
                to: exp.endDate || '',
                description: exp.description || ''
            }));
            submissionData.append('experiences', JSON.stringify(experiences));

            submissionData.append('address[street]', formData.streetAddress || '');
            submissionData.append('address[city]', formData.city || '');
            submissionData.append('address[state]', formData.state || '');
            submissionData.append('address[country]', formData.country || '');
            submissionData.append('address[zipCode]', formData.zipCode || '');

            if (formData.medicalLicense) submissionData.append('medicalLicense', formData.medicalLicense);
            if (formData.deaCertificate) submissionData.append('deaCertificate', formData.deaCertificate);
            if (formData.boardCertification) submissionData.append('boardCertification', formData.boardCertification);
            if (formData.medicalSchoolDiploma) submissionData.append('medicalSchoolDiploma', formData.medicalSchoolDiploma);
            if (formData.governmentID) submissionData.append('governmentId', formData.governmentID);

            console.log('Final FormData submission:');
            for (let [key, value] of submissionData.entries()) {
                if (value instanceof File) {
                    console.log(`${key}: ${value.name} (${value.size} bytes)`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            }

            const response = await onboardingSubmit(submissionData);

            if (!response.success) {
                console.error('Onboarding submission failed:', response.error);
                return false;
            }

            setFormData(initialOnboardingValues);
            setErrors(initialOnboardingErrors);
            setCurrentStep(1);
            setIsSubmitting(false);

            if (onClose) onClose();
            return true;
        } catch (error) {
            console.error('Onboarding submission failed:', error);
            setIsSubmitting(false);
            return false;
        }
    }, [currentStep, formData, onboardingSubmit]);

    const handleReset = useCallback(() => {
        setFormData(initialOnboardingValues);
        setErrors(initialOnboardingErrors);
        setCurrentStep(1);
        setIsSubmitting(false);
    }, []);

    return {
        formData,
        errors,
        currentStep,
        isSubmitting,
        steps: onboardingSteps,
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
    };
};