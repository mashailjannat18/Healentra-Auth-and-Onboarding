export const initialOnboardingValues = {
    specialization: [],
    yearsOfExperience: '',
    about: '',
    certificates: [],
    experiences: [],
    streetAddress: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    medicalLicense: null,
    deaCertificate: null,
    boardCertification: null,
    medicalSchoolDiploma: null,
    governmentID: null,
};

export const initialOnboardingErrors = {};

export const onboardingSteps = [
    { number: 1, name: 'About' },
    { number: 2, name: 'Education' },
    { number: 3, name: 'Experience' },
    { number: 4, name: 'Address' },
    { number: 5, name: 'Documents' }
];