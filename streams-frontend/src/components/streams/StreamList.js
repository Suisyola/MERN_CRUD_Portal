import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions/index';

class StreamList extends React.Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	renderAdmin(stream) {
		if (stream.createdBy === this.props.currentUserId) {
			return (
				<div className='right floated content'>
					<Link
						to={`/streams/edit/${stream._id}`}
						className='ui button primary'
					>
						Edit
					</Link>
					<Link
						to={`/streams/delete/${stream._id}`}
						className='ui button negative'
					>
						Delete
					</Link>
				</div>
			);
		}
	}

	renderList() {
		return this.props.streams.map((stream) => {
			return (
				<div className='item' key={stream._id}>
					<div className='ui grid'>
						<div className='four wide column'>
							<i className='massive middle aligned icon camera' />
						</div>
						<div className='seven wide column'>
							<div className='content'>
								<Link to={`/streams/${stream._id}`} className='header'>
									{stream.title}
								</Link>
								<br />
								<div className='description'>{stream.description}</div>
							</div>
						</div>
						<div className='five wide column middle aligned'>
							{this.renderAdmin(stream)}
						</div>
					</div>
				</div>
			);
		});
	}

	renderCreate() {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link to='/streams/new' className='ui button primary'>
						Create Stream
					</Link>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className='ui celled list'>{this.renderList()}</div>
				{this.renderCreate()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		// object.values() method returns the enumerable property values of state.streams.
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn
	};
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
