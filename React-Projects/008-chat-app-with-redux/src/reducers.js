import { combineReducers } from 'redux';

const activeThreadId = (state = 'thread-1234', action) => {
	switch (action.type) {
		case 'OPEN_THREAD':
			return action.id;
		default:
			return state;
	}
};

const message = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_MESSAGE':
			return {
				id: action.id,
				timestamp: action.timestamp,
				text: action.text,
			};
		case 'DELETE_MESSAGE':
			if (state.id === action.id) return;
			return state;
		default:
			return state;
	}

};

const messages = (state = [], action) => {
	switch (action.type) {
		case 'ADD_MESSAGE':
			return [
				...state,
				message(undefined, action),
			];
		case 'DELETE_MESSAGE':
			return state.filter(m => message(m, action));
		default:
			return state;
	}
};

const threads = (
	state = [
		{
			id: 'thread-1234',
			title: 'Jane Doe',
			messages: messages(undefined, {})
		},
		{
			id: 'thread-5678',
			title: 'Wolverine',
			messages: messages(undefined, {})
		},
	], 
	action
) => {
	switch (action.type) {
		case 'ADD_MESSAGE':
		case 'DELETE_MESSAGE':
			return state.map(t => {
				if (t.id === action.threadId) {
					return {
						...t,
						messages: messages(t.messages, action),
					};
				}
				return t;
			});
		default:
			return state;
	}
};

const chat = combineReducers({
	activeThreadId,
	threads,
});

export { 
	activeThreadId, 
	message,
	messages, 
	threads, 
	chat,
};
export default chat;





















