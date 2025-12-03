export const validationRules = {
    specialization: (value) => {
        if (!value || value.length === 0) return 'Please select at least one specialization';
        return '';
    },
    
    yearsOfExperience: (value) => {
        if (!value) return 'Years of experience is required';
        const num = parseInt(value);
        if (isNaN(num)) return 'Please enter a valid number';
        if (num < 0) return 'Years of experience cannot be negative';
        if (num > 50) return 'Years of experience cannot exceed 50';
        return '';
    },
    
    about: (value) => {
        if (!value || !value.trim()) return 'Please tell us about yourself';
        if (value.trim().length < 10) return 'Please provide a more detailed description (minimum 10 characters)';
        if (value.trim().length > 2000) return 'Description is too long (maximum 2000 characters)';
        return '';
    },
    
    certificateName: (value, formData, index) => {
        if (!value || !value.trim()) return 'Certificate name is required';
        if (value.trim().length > 100) return 'Certificate name is too long (maximum 100 characters)';
        return '';
    },
    
    certificateInstitution: (value, formData, index) => {
        if (!value || !value.trim()) return 'Institution name is required';
        if (value.trim().length > 200) return 'Institution name is too long (maximum 200 characters)';
        return '';
    },
    
    certificateStartDate: (value, formData, index) => {
        if (!value) return 'Start date is required';
        if (index !== null && index !== undefined) {
            const certificate = formData.certificates[index];
            if (certificate?.endDate && new Date(value) > new Date(certificate.endDate)) {
                return 'Start date cannot be after end date';
            }
        }
        return '';
    },
    
    certificateEndDate: (value, formData, index) => {
        if (!value) return 'End date is required';
        if (index !== null && index !== undefined) {
            const certificate = formData.certificates[index];
            if (certificate?.startDate && new Date(value) < new Date(certificate.startDate)) {
                return 'End date cannot be before start date';
            }
        }
        return '';
    },
    
    experienceHospital: (value, formData, index) => {
        if (!value || !value.trim()) return 'Hospital name is required';
        if (value.trim().length > 200) return 'Hospital name is too long (maximum 200 characters)';
        return '';
    },
    
    experiencePosition: (value, formData, index) => {
        if (!value || !value.trim()) return 'Position is required';
        if (value.trim().length > 100) return 'Position title is too long (maximum 100 characters)';
        return '';
    },
    
    experienceStartDate: (value, formData, index) => {
        if (!value) return 'Start date is required';
        if (index !== null && index !== undefined) {
            const experience = formData.experiences[index];
            if (experience?.endDate && new Date(value) > new Date(experience.endDate)) {
                return 'Start date cannot be after end date';
            }
        }
        return '';
    },
    
    experienceEndDate: (value, formData, index) => {
        if (!value) return 'End date is required';
        if (index !== null && index !== undefined) {
            const experience = formData.experiences[index];
            if (experience?.startDate && new Date(value) < new Date(experience.startDate)) {
                return 'End date cannot be before start date';
            }
        }
        return '';
    },

    streetAddress: (value) => {
        if (!value || !value.trim()) return 'Street address is required';
        if (value.trim().length > 200) return 'Street address is too long (maximum 200 characters)';
        return '';
    },
    
    city: (value) => {
        if (!value || !value.trim()) return 'City is required';
        if (value.trim().length > 100) return 'City name is too long (maximum 100 characters)';
        return '';
    },
    
    state: (value) => {
        if (!value || !value.trim()) return 'State is required';
        if (value.trim().length > 100) return 'State name is too long (maximum 100 characters)';
        return '';
    },
    
    country: (value) => {
        if (!value || !value.trim()) return 'Please select your country';
        return '';
    },
    
    zipCode: (value) => {
        if (!value || !value.trim()) return 'ZIP code is required';
        if (!/^\d{5}(-\d{4})?$/.test(value.trim())) return 'Please enter a valid ZIP code';
        return '';
    },
    
    medicalLicense: (value) => {
        if (!value) return 'Medical license is required';
        if (!(value instanceof File)) return 'Please upload a valid file';
        if (value.size > 10 * 1024 * 1024) return 'File size must be less than 10MB';
        if (!['application/pdf', 'image/jpeg', 'image/png'].includes(value.type)) {
            return 'File must be PDF, JPEG, or PNG';
        }
        return '';
    },
    
    deaCertificate: (value) => {
        if (!value) return 'DEA certificate is required';
        if (!(value instanceof File)) return 'Please upload a valid file';
        if (value.size > 10 * 1024 * 1024) return 'File size must be less than 10MB';
        if (!['application/pdf', 'image/jpeg', 'image/png'].includes(value.type)) {
            return 'File must be PDF, JPEG, or PNG';
        }
        return '';
    },
    
    boardCertification: (value) => {
        if (!value) return 'Board certification is required';
        if (!(value instanceof File)) return 'Please upload a valid file';
        if (value.size > 10 * 1024 * 1024) return 'File size must be less than 10MB';
        if (!['application/pdf', 'image/jpeg', 'image/png'].includes(value.type)) {
            return 'File must be PDF, JPEG, or PNG';
        }
        return '';
    },
    
    medicalSchoolDiploma: (value) => {
        if (!value) return 'Medical school diploma is required';
        if (!(value instanceof File)) return 'Please upload a valid file';
        if (value.size > 10 * 1024 * 1024) return 'File size must be less than 10MB';
        if (!['application/pdf', 'image/jpeg', 'image/png'].includes(value.type)) {
            return 'File must be PDF, JPEG, or PNG';
        }
        return '';
    },
    
    governmentID: (value) => {
        if (!value) return 'Government ID is required';
        if (!(value instanceof File)) return 'Please upload a valid file';
        if (value.size > 10 * 1024 * 1024) return 'File size must be less than 10MB';
        if (!['application/pdf', 'image/jpeg', 'image/png'].includes(value.type)) {
            return 'File must be PDF, JPEG, or PNG';
        }
        return '';
    }
};