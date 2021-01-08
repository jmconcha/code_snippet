import axios from 'axios';

function getTimers(success) {
	return axios({
		method: 'get',
		url: '/api/timers',
		headers: {
			'Accept': 'application/json'
		}
	}).then(checkStatus)
		.then(parseJSON)
		.then(success);
}

function createTimer(data) {
	return axios({
		method: 'post',
		url: '/api/timers',
		data: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(checkStatus);
}

function updateTimer(data) {
	return axios({
		method: 'put',
		url: '/api/timers',
		data: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(checkStatus);
}

function deleteTimer(data) {
	return axios({
		method: 'delete',
		url: '/api/timers',
		data: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(checkStatus);
}

function startTimer(data) {
	return axios({
		method: 'post',
		url: '/api/timers/start',
		data: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(checkStatus);
}

function stopTimer(data) {
	return axios({
		method: 'post',
		url: '/api/timers/stop',
		data: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(checkStatus);
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		const error = new Error(`HTTP Error ${response.statusText}`);
		error.status = response.statusText;
		error.response = response;
		console.log(error);
		throw error;
	}
}

function parseJSON(response) {
	return response.data;
}

const client = {
	getTimers,
	createTimer,
	updateTimer,
	startTimer,
	stopTimer,
	deleteTimer
};

export default client;
