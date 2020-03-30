import _ from 'lodash';
import {
	CREATE_STREAM,
	EDIT_STREAM,
	DELETE_STREAM,
	FETCH_STREAM,
	FETCH_STREAMS
} from '../actions/types';

export default (state = {}, action) => {
	// state is an object which encapsulates a number of key value pairs.
	// the key is the ID of the stream.
	// the value contains the properties (e.g. title, descrption, userId, id) of the stream

	switch (action.type) {
		case FETCH_STREAM:
			return { ...state, [action.payload._id]: action.payload };
		case FETCH_STREAMS:
			// ... is property spread notation. This is used to combine the 2 objects, state and _.mapKeys.
			// _.mapKeys uses action.payload.id as the key for each key-value pair
			return { ...state, ..._.mapKeys(action.payload, '_id') };
		case CREATE_STREAM:
			// this is to add a new key value pair to existing state.
			// the key is [action.payload.id]
			// the square bracket is computed properties, which is an ES6 feature. It allows the names of object properties
			// in JavaScript object literal notation to be determined dynamically
			// the value is action.payload
			return { ...state, [action.payload._id]: action.payload };
		case DELETE_STREAM:
			// from the deleteStream action, the payload stores the ID of the stream being deleted
			// the logic omits the stream based on the ID, since ID is the key in the key/value pair
			return _.omit(state, action.payload);
		case EDIT_STREAM:
			return { ...state, [action.payload._id]: action.payload };
		default:
			return state;
	}
};
