export const signupFields = {
    firstName: {
        type: 'text',
        label: 'First Name:',
        placeholder: 'First Name',
        required: true
    },
    lastName: {
        type: 'text',
        label: 'Last Name:',
        placeholder: 'Last Name',
        required: true
    },
    dob: {
        type: 'date',
        label: 'Date of Birth:',
        required: true
    },
    email: {
        type: 'email',
        label: 'Email:',
        placeholder: 'Email',
        required: true
    },
    phone: {
        type: 'phone',
        label: 'Phone:',
        required: true
    },
    gender: {
        type: 'select',
        label: 'Gender:',
        options: [
            { value: '', label: 'Select Gender', disabled: true },
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'prefer-not', label: 'Prefer not to say' }
        ],
        required: true
    },
    address: {
        type: 'text',
        label: 'Address:',
        placeholder: 'Address',
        required: true
    },
    city: {
        type: 'text',
        label: 'City:',
        placeholder: 'City',
        required: true
    },
    password: {
        type: 'password',
        label: 'Password:',
        placeholder: 'Password',
        required: true,
        minLength: 6
    }
};

export const loginFields = {
    email: {
        type: 'email',
        label: 'Email:',
        placeholder: 'Email',
        required: true
    },
    password: {
        type: 'password',
        label: 'Password:',
        placeholder: 'Password',
        required: true,
        minLength: 6
    }
};

export const fieldGroups = {
    signup: [
        ['firstName', 'lastName'],
        ['dob', 'email'],
        ['phone', 'gender'],
        ['address', 'city'],
        ['password']
    ],
    login: [
        ['email'],
        ['password']
    ]
};