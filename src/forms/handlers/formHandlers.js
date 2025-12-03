import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { setToken } from '../../redux/features/auth/loginSlice';
import { validationRules } from '../validations/auth/formValidations';
import {
    initialSignupValues,
    initialLoginValues,
    emptyErrors
} from '../values/auth/initialValues';

const useFormHandler = (formType, initialValues, specificValidation = null) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState(emptyErrors);
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    }, [errors]);

    const handlePhoneChange = useCallback((phone) => {
        setFormData(prev => ({
            ...prev,
            phone
        }));
        
        if (errors.phone) {
            setErrors(prev => ({
                ...prev,
                phone: ''
            }));
        }
    }, [errors]);

    const handleBlur = useCallback((e) => {
        const { name } = e.target;
        const value = formData[name];

        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        const validateField = specificValidation || validationRules[name];
        if (validateField) {
            const error = validateField(value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    }, [formData, specificValidation]);

    const hasErrors = useCallback(() => {
        return Object.values(errors).some(error => error !== '');
    }, [errors]);

    const validateForm = useCallback(() => {
        const newErrors = {};
        
        Object.keys(formData).forEach(field => {
            const validateField = specificValidation || validationRules[field];
            if (validateField) {
                const error = validateField(formData[field]);
                if (error) {
                    newErrors[field] = error;
                }
            }
        });
        
        return newErrors;
    }, [formData, specificValidation]);

    const resetForm = useCallback(() => {
        setFormData(initialValues);
        setErrors(emptyErrors);
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    const setFieldValue = useCallback((field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const setAllTouched = useCallback(() => {
        const allTouched = {};
        Object.keys(formData).forEach(key => {
            allTouched[key] = true;
        });
        setTouched(allTouched);
    }, [formData]);

    return {
        formData,
        errors,
        touched,
        isSubmitting,
        isDisabled: isSubmitting || hasErrors(),
        handleChange,
        handlePhoneChange,
        handleBlur,
        validateForm,
        resetForm,
        setFieldValue,
        setFormData,
        setErrors,
        setTouched,
        setAllTouched,
        setIsSubmitting
    };
};

export const useSignupFormHandlers = () => {
    const { signup, resetSignup } = useAuth();
    const {
        formData,
        errors,
        touched,
        isDisabled,
        handleChange,
        handlePhoneChange,
        handleBlur,
        validateForm,
        setErrors,
        setAllTouched,
        setIsSubmitting,
        resetForm
    } = useFormHandler('signup', initialSignupValues);

    const submitSignup = useCallback(async (navigate) => {
        const newErrors = validateForm();
        setErrors(newErrors);
        setAllTouched();

        const hasError = Object.keys(newErrors).length > 0;
        if (hasError) {
            toast.error('Please correct the errors in the form');
            return false;
        }

        try {
            setIsSubmitting(true);

            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                dob: formData.dob,
                email: formData.email,
                phoneNo: formData.phone,
                gender: formData.gender,
                password: formData.password,
                role: "doctor"
            };

            const result = await signup(payload);

            if (!result.success) {
                if (result.status === 409) {
                    setErrors(prev => ({
                        ...prev,
                        email: 'Email already registered'
                    }));
                    toast.error('This email is already registered');
                } else {
                    toast.error(result.message || 'Registration failed. Please try again.');
                }
                setIsSubmitting(false);
                return false;
            }

            toast.success('Account created successfully! Please log in.');
            navigate('/login');
            resetSignup();
            resetForm();
            
            return true;
        } catch (err) {
            toast.error('Something went wrong. Please try again later.');
            setIsSubmitting(false);
            return false;
        }
    }, [formData, validateForm, signup, resetSignup, setErrors, setAllTouched, setIsSubmitting, resetForm]);

    return {
        formData,
        errors,
        touched,
        isDisabled,
        handleChange,
        handlePhoneChange,
        handleBlur,
        submitSignup
    };
};

export const useLoginFormHandlers = () => {
    const dispatch = useDispatch();
    const { login, resetLogin } = useAuth();
    const {
        formData,
        errors,
        isDisabled,
        handleChange,
        handleBlur,
        validateForm,
        setErrors,
        setAllTouched,
        setIsSubmitting,
        resetForm
    } = useFormHandler('login', initialLoginValues);

    const submitLogin = useCallback(async (navigate) => {
        const newErrors = validateForm();
        setErrors(newErrors);
        setAllTouched();

        const hasError = Object.keys(newErrors).length > 0;
        if (hasError) {
            return false;
        }

        try {
            setIsSubmitting(true);

            const payload = {
                email: formData.email,
                password: formData.password,
                role: "doctor"
            };

            const result = await login(payload);

            if (!result.success) {
                if (result.status === 401) {
                    setErrors(prev => ({
                        ...prev,
                        email: 'Invalid email or password'
                    }));
                }
                setIsSubmitting(false);
                return false;
            }

            dispatch(setToken(result.data.token));

            navigate('/home');
            resetLogin();
            resetForm();
            
            return true;
        } catch (err) {
            setIsSubmitting(false);
            return false;
        }
    }, [formData, validateForm, login, resetLogin, dispatch, setErrors, setAllTouched, setIsSubmitting, resetForm]);

    return {
        formData,
        errors,
        isDisabled,
        handleChange,
        handleBlur,
        submitLogin
    };
};
