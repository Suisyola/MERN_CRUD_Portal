import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import LoginForm from './LoginForm';

class Login extends React.Component {
	onSubmit = (formValues) => {
		this.props.signIn(formValues);
	};

	render() {
		return (
			<div>
				<LoginForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

export default connect(null, { signIn })(Login);
