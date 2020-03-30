import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Divider, Popup } from 'semantic-ui-react';
import { signOut } from '../actions';

class Header extends React.Component {
	onClickSignOut = () => {
		this.props.signOut();
	};

	renderSignInOut = () => {
		const auth = this.props.auth;

		if (auth && auth.isSignedIn) {
			return (
				<div className='item'>
					<Popup
						content='Click to logout'
						key={auth.email}
						header={`You are logged in as ${auth.userId}`}
						trigger={
							<a
								href='/'
								onClick={this.onClickSignOut}
								style={{ cursor: 'pointer' }}
							>
								Logout
							</a>
						}
					/>
				</div>
			);
		}
		return (
			<Link to='/login' className='item'>
				Login
			</Link>
		);
	};
	render() {
		return (
			<React.Fragment>
				<div className='ui secondary menu'>
					<Link to='/' className='item'>
						Streamy
					</Link>
					<div className='right menu'>
						<React.Fragment>
							<Link to='/' className='item'>
								All Streams
							</Link>

							<Divider vertical hidden></Divider>

							{this.renderSignInOut()}
						</React.Fragment>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return { auth: state.auth };
};

export default connect(mapStateToProps, { signOut })(Header);
