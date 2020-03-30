import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Image, Menu, Popup } from 'semantic-ui-react';
import { signOut } from '../actions';

class Header extends React.Component {
	onClickSignOut = () => {
		this.props.signOut();
	};

	renderSignInOut = () => {
		const auth = this.props.auth;

		if (auth && auth.isSignedIn) {
			return (
				<Menu.Item position='right'>
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
				</Menu.Item>
			);
		}
		return (
			<Menu.Item as={Link} to='/login' position='right'>
				Login
			</Menu.Item>
		);
	};

	render() {
		return (
			<Menu fixed='top' inverted>
				<Container>
					<Menu.Item as={Link} to='/' header>
						<Image
							size='mini'
							src='https://react.semantic-ui.com/logo.png'
							style={{ marginRight: '1.5em' }}
						/>
						The Streaming Project
					</Menu.Item>
					<Menu.Item as={Link} to='/'>
						Home
					</Menu.Item>

					<Dropdown item simple text='Dropdown'>
						<Dropdown.Menu>
							<Dropdown.Item>List Item</Dropdown.Item>
							<Dropdown.Item>List Item</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Header>Header Item</Dropdown.Header>
							<Dropdown.Item>
								<i className='dropdown icon' />
								<span className='text'>Submenu</span>
								<Dropdown.Menu>
									<Dropdown.Item>List Item</Dropdown.Item>
									<Dropdown.Item>List Item</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown.Item>
							<Dropdown.Item>List Item</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>

					{this.renderSignInOut()}
				</Container>
			</Menu>
		);
	}
}

const mapStateToProps = (state) => {
	return { auth: state.auth };
};

export default connect(mapStateToProps, { signOut })(Header);
