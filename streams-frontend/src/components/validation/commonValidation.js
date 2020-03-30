export const RequiredValidation = (value) => {
	return value || typeof value === 'number' ? undefined : 'Required';
};
