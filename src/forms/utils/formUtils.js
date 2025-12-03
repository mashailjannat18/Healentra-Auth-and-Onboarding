import { signupFields, loginFields, fieldGroups } from '../fields/formFields';

export const getFormFields = (formType) => {
    return formType === 'signup' ? signupFields : loginFields;
};

export const getFieldGroups = (formType) => {
    return fieldGroups[formType] || [];
};

export const isFieldRequired = (formType, fieldName) => {
    const fields = getFormFields(formType);
    return fields[fieldName]?.required || false;
};

export const getFieldConfig = (formType, fieldName) => {
    const fields = getFormFields(formType);
    return fields[fieldName] || {};
};