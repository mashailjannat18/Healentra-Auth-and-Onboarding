export const validationRules = {
    firstName: (value) => !value.trim() ? 'First name is required' : '',
    lastName: (value) => !value.trim() ? 'Last name is required' : '',
    dob: (value) => !value ? 'Date of birth is required' : '',
    email: (value) => {
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
        return '';
    },
    phone: (value) => {
        if (!value) return 'Phone number is required';
        if (value.replace(/\D/g, '').length < 4) return 'Phone number is too short';
        return '';
    },
    gender: (value) => !value ? 'Gender is required' : '',
    address: (value) => !value.trim() ? 'Address is required' : '',
    city: (value) => !value.trim() ? 'City is required' : '',
    password: (value) => {
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
    }
};