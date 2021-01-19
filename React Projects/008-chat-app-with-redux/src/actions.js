import { v4 as uuidv4 } from 'uuid';

const openThread = (id) => ({
	type: 'OPEN_THREAD',
	id,
});

const addMessage = (threadId, text) => ({
	type: 'ADD_MESSAGE',
	threadId,
	id: uuidv4(),
	timestamp: Date.now(),
	text,
});

const deleteMessage = (threadId, id) => ({
	type: 'DELETE_MESSAGE',
	threadId,
	id,
});

export { openThread, addMessage, deleteMessage };
