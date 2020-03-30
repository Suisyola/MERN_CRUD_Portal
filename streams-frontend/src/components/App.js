import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Footer from './Footer';
import Header from './Header';
import history from '../history';
import Login from './login/Login';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';

class App extends React.Component {
	render() {
		return (
			<div>
				<Router history={history}>
					<div>
						<Header />

						<Container text style={{ marginTop: '7em' }}>
							<Switch>
								<Route path='/' exact component={StreamList}></Route>
								<Route path='/login' exact component={Login}></Route>
								<Route
									path='/streams/new'
									exact
									component={StreamCreate}
								></Route>
								<Route
									path='/streams/delete/:id'
									exact
									component={StreamDelete}
								></Route>
								<Route
									path='/streams/edit/:id'
									exact
									component={StreamEdit}
								></Route>
								<Route path='/streams/:id' exact component={StreamShow} />
							</Switch>
						</Container>

						<Footer />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
