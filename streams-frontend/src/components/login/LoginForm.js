import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { RequiredValidation } from '../validation/commonValidation';

class LoginForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className='ui left icon left aligned container'>
					<i className='attention icon red'></i>
					<label className='ui red '>{error}</label>
				</div>
			);
		}
	}

	renderInput = ({ type, input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label className='ui left aligned container'>{label}</label>
				<input {...input} autoComplete='off' type={type} />
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<form
				onSubmit={this.props.handleSubmit(this.onSubmit)}
				className='ui form error center aligned two column grid'
			>
				<div className='column'>
					<h2 className='ui image header'>
						<div className='content'>Log-in to your account</div>
					</h2>
					<div className='ui large form'>
						<div className='ui stacked secondary segment'>
							<Field
								type='text'
								name='email'
								label='E-mail address'
								placeholder='E-mail address'
								component={this.renderInput}
								validate={[RequiredValidation]}
							/>
							<Field
								type='password'
								name='password'
								label='Password'
								placeholder='Password'
								component={this.renderInput}
							/>
							<button className='ui fluid large teal submit button'>
								Login
							</button>
						</div>
					</div>
					<div className='ui message'>
						New to us? <a href='/'>Register</a>
					</div>
				</div>
			</form>
		);
	}
}

const validate = (formValues) => {
	const errors = {};

	if (!formValues.email) {
		errors.email = 'Email cannot be empty';
	}

	if (!formValues.password) {
		errors.password = 'Password cannot be empty';
	}

	return errors;
};

export default reduxForm({ form: 'loginForm', validate: validate })(LoginForm);
