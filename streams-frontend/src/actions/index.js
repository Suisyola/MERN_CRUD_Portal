import stream from '../apis/streams';
import history from '../history';

import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	FETCH_STREAM,
	FETCH_STREAMS,
	EDIT_STREAM,
	DELETE_STREAM
} from './types';
import streams from '../apis/streams';

export const signIn = (userCredential) => {
	return async (dispatch) => {
		const response = await stream.post('/login', userCredential);

		dispatch({
			type: SIGN_IN,
			payload: response.data
		});

		history.push('/');
	};
};

export const signOut = () => {
	return { type: SIGN_OUT };
};

export const createStream = (formValues) => {
	// getState is used to get the values from state
	return async (dispatch, getState) => {
		const { userId } = getState().auth;
		const response = await stream.post('/streams', {
			...formValues,
			createdBy: userId
		});

		dispatch({ type: CREATE_STREAM, payload: response.data });
		history.push('/');
	};
};

export const deleteStream = (id) => {
	return async (dispatch) => {
		await streams.delete(`/streams/${id}`);

		dispatch({ type: DELETE_STREAM, payload: id });
		history.push('/');
	};
};

export const editStream = (id, formValues) => {
	return async (dispatch) => {
		const response = await streams.patch(`/streams/${id}`, formValues);

		dispatch({ type: EDIT_STREAM, payload: response.data });
		history.push('/');
	};
};

export const fetchStream = (id) => {
	return async (dispatch) => {
		const response = await stream.get(`/streams/${id}`);

		// dispatch the Action object to all Reducers
		dispatch({
			type: FETCH_STREAM,
			payload: response.data
		});
	};
};

export const fetchStreams = () => {
	return async (dispatch) => {
		const response = await stream.get('/streams');

		dispatch({
			type: FETCH_STREAMS,
			payload: response.data
		});
	};
};
