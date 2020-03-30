import React from 'react';
import { reduxForm, Field } from 'redux-form';

class StreamForm extends React.Component {
	renderError = ({ error, touched }) => {
		if (touched && error) {
			return (
				<div className='ui error message'>
					<div className='error'>{error}</div>
				</div>
			);
		}
	};

	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete='off'></input>
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
				className='ui form error'
			>
				<Field
					name='title'
					component={this.renderInput}
					label='Enter Title'
				></Field>
				<Field
					name='description'
					component={this.renderInput}
					label='Enter Description'
				></Field>
				<button className='ui button primary'>Submit</button>
			</form>
		);
	}
}

export default reduxForm({ form: 'streamForm' })(StreamForm);
