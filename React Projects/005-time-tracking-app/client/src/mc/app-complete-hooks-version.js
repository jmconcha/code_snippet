import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import helpers from './helpers.js';
import client from './client.js';

function TimerActionButton(props) {
	const timerIsRunning = props.timerIsRunning;
	const onClick = timerIsRunning ? 
		props.onStopClick : 
		props.onStartClick;
	const buttonColor = timerIsRunning ? 'red' : 'green';
	const buttonText = timerIsRunning ? 'Stop' : 'Start';
	const className = `ui bottom attached ${buttonColor} basic button`;

	return (
		<div
			className={className}
			onClick={onClick}
		>
			{buttonText}
		</div>
	);
}
TimerActionButton.propTypes = {
	timerIsRunning: PropTypes.bool,
	onStartClick: PropTypes.func,
	onStopClick: PropTypes.func
};

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.forceUpdateIntervalID = null;

		this.handleStopClick = this.handleStopClick.bind(this);
	}

	componentDidMount() {
		this.forceUpdateIntervalID = setInterval(() => this.forceUpdate(), 50);
	}

	componentWillUnmount() {
		clearInterval(this.forceUpdateIntervalID);
	}

	handleStopClick() {
		this.props.onStopClick();
	}
	render() {
		const elapsedString = helpers.renderElapsedString(
			this.props.elapsed, this.props.runningSince);

		return (
			<div className="ui centered card">
				<div className="content">
					<div className="header">
						{this.props.title}
					</div>
					<div className="meta">
						{this.props.project}
					</div>
					<div className="center aligned description">
						<h2>
							{elapsedString}
						</h2>
					</div>
					<div className="extra content">
						<span 
							className="right floated edit icon"
							onClick={this.props.onEditClick}
						>
							<i className="edit icon" />
						</span>
						<span 
							className="right floated trash icon"
							onClick={this.props.onTrashClick}
						>
							<i className="trash icon" />
						</span>
					</div>
				</div>
				<TimerActionButton 
					timerIsRunning={!!this.props.runningSince}
					onStartClick={this.props.onStartClick}
					onStopClick={this.handleStopClick}
				/>
			</div>
		);
	}
}
Timer.propTypes = {
	title: PropTypes.string,
	project: PropTypes.string,
	elapsed: PropTypes.number,
	runningSince: PropTypes.number,
	onEditClick: PropTypes.func,
	onTrashClick: PropTypes.func,
	onStartClick: PropTypes.func,
	onStopClick: PropTypes.func
};

function ToggleableTimerForm(props) {
	function handleFormOpen() {
		setIsOpen(true);
	}

	function handleFormClose() {
		closeTimerForm();
	}

	function handleFormSubmit(timer) {
		closeTimerForm();
		props.onFormSubmit(timer);
	}

	function closeTimerForm() {
		setIsOpen(false);
	}
	
	const [isOpen, setIsOpen] = useState(false);
	if (isOpen) {
		return (
			<TimerForm 
				onFormSubmit={handleFormSubmit}
				onFormClose={handleFormClose}
			/>
		);
	}

	return (
		<div className="ui basic content center aligned segment">
			<button 
				className="ui basic button icon"
				onClick={handleFormOpen}
			>
				<i className="plus icon" />
			</button>
		</div>
	);
}
ToggleableTimerForm.propTypes = {
	isOpen: PropTypes.bool,
	onFormSubmit: PropTypes.func
};

function TimerForm(props) {
	function handleTitleChange(e) {
		setTitle(e.target.value);
	}
	
	function handleProjectChange(e) {
		setProject(e.target.value);
	}

	function handleSubmit() {
		props.onFormSubmit({
			id: props.id,
			title: title,
			project: project
		});
	}
	
	const submitText = props.id ? 'Update' : 'Create';

	const titleRef = useRef();
	const [title, setTitle] = useState(props.title || '');
	const [project, setProject] = useState(props.project || '');
	useEffect(() => {
		titleRef.current.focus();
	}, []);

	return (
		<div className="ui centered card">
			<div className="content">
				<div className="ui form">
					<div className="field">
						<label>Title</label>
						<input 
							ref={titleRef}
							type="text" 
							value={title} 
							onChange={handleTitleChange}
						/>
					</div>
					<div className="field">
						<label>Project</label>
						<input 
							type="text" 
							value={project} 
							onChange={handleProjectChange}
						/>
					</div>
					<div className="ui two bottom attached buttons">
						<button 
							className="ui basic blue button"
							onClick={handleSubmit}
						>
							{submitText}
						</button>
						<button 
							className="ui basic red button"
							onClick={props.onFormClose}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
TimerForm.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	project: PropTypes.string,
	onFormSubmit: PropTypes.func,
	onFormClose: PropTypes.func
};

function EditableTimer(props) {
	function openEditForm() {
		setEditFormOpen(true);
	}

	function closeEditForm() {
		setEditFormOpen(false);
	}

	function handleEditClick() {
		openEditForm();
	}

	function handleFormClose() {
		closeEditForm();	
	}

	function handleFormSubmit(timer) {
		props.onFormSubmit(timer);
		closeEditForm();
	}

	function handleTrashClick() {
		props.onTrashClick(props.id);
	}

	function handleStartClick() {
		props.onStartClick(props.id);
	}
	
	function handleStopClick() {
		props.onStopClick(props.id);
	}

	const [editFormOpen, setEditFormOpen] = useState(false);
	if (editFormOpen) {
		return (
			<TimerForm
				id={props.id}
				title={props.title}
				project={props.project}
				onFormClose={handleFormClose}
				onFormSubmit={handleFormSubmit}
			/>
		);
	}

	return (
		<Timer
			id={props.id}
			title={props.title}
			project={props.project}
			elapsed={props.elapsed}
			runningSince={props.runningSince}
			onEditClick={handleEditClick}
			onTrashClick={handleTrashClick}
			onStartClick={handleStartClick}
			onStopClick={handleStopClick}
		/>
	);
}
EditableTimer.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	project: PropTypes.string,
	elapsed: PropTypes.number,
	runningSince: PropTypes.number,
	editFormOpen: PropTypes.bool,
	onFormSubmit: PropTypes.func,
	onTrashClick: PropTypes.func,
	onStartClick: PropTypes.func,
	onStopClick: PropTypes.func
};

function EditableTimerList(props) {
	const timers = props.timers.map(timer => (
		<EditableTimer 
			key={timer.id}
			id={timer.id}
			title={timer.title}
			project={timer.project}
			elapsed={timer.elapsed}
			runningSince={timer.runningSince}
			onFormSubmit={props.onFormSubmit}
			onTrashClick={props.onTrashClick}
			onStartClick={props.onStartClick}
			onStopClick={props.onStopClick}
		/>
	));

	return (
		<div id="timers">
			{timers}
		</div>
	);
}
EditableTimerList.propTypes = {
	timers: PropTypes.array,
	onFormSubmit: PropTypes.func,
	onTrashClick: PropTypes.func,
	onStartClick: PropTypes.func,
	onStopClick: PropTypes.func
};

function TimersDashboard() {
	function getTimersFromServer() {
		client.getTimers(serverTimers => setTimers(serverTimers));
	}

	function handleCreateFormSubmit(timer) {
		createTimer(timer);
	}

	function handleEditFormSubmit(timer) {
		updateTimer(timer);
	}

	function handleTrashClick(id) {
		deleteTimer(id);
	}

	function handleStartClick(id) {
		startTimer(id);
	}

	function handleStopClick(id) {
		stopTimer(id);
	}

	function createTimer(timer) {
		const timersCopy = helpers.deepCopy(timers);
		const newTimer = {
			id: uuidv4(),
			title: timer.title || 'Timer',
			project: timer.project || 'Project',
			elapsed: 0,
			runningSince: null
		};
		timersCopy.push(newTimer);

		setTimers(timersCopy);
		createTimerOnServer(newTimer);
	}
	
	function createTimerOnServer(newTimer) {
		client.createTimer(newTimer);
	}

	function updateTimer(attrs) {
		const updatedTimersCopy = timers.map(timerCopy => {
			if (timerCopy.id === attrs.id) {
				return { ...timerCopy, ...attrs };
			}

			return { ...timerCopy };
		});

		setTimers(updatedTimersCopy);
		updateTimerOnServer(attrs);
	}

	function updateTimerOnServer(attrs) {
		client.updateTimer(attrs);
	}

	function deleteTimer(id) {
		const timersCopy = helpers.deepCopy(timers);
		const updatedTimersCopy = timersCopy.filter(timer => timer.id !== id);

		setTimers(updatedTimersCopy);
		deleteTimerOnServer({ id });
	}

	function deleteTimerOnServer(id) {
		client.deleteTimer(id);
	}

	function startTimer(id) {
		const now = Date.now();
		const updatedTimersCopy = timers.map(timer => {
			if (timer.id === id) {
				return { ...timer, runningSince: now };
			}

			return { ...timer };
		});

		setTimers(updatedTimersCopy);
		startTimerOnServer({ id, start: now });
	}

	function startTimerOnServer(attrs) {
		client.startTimer(attrs);
	}

	function stopTimer(id) {
		const now = Date.now();
		const updatedTimersCopy = timers.map(timer => {
			if (timer.id === id) {
				const lastElapsed = now - timer.runningSince;

				return ({ 
					...timer,
					elapsed: timer.elapsed + lastElapsed,
					runningSince: null 
				});
			}

			return { ...timer };
		});

		setTimers(updatedTimersCopy);
		stopTimerOnServer({ id, stop: now });
	}

	function stopTimerOnServer(attrs) {
		client.stopTimer(attrs);
	}

	let pollingIntervalID = null;
	const [timers, setTimers] = useState([]);
	useEffect(() => {
		getTimersFromServer();
		pollingIntervalID = setInterval(getTimersFromServer, 5000);

		return () => clearInterval(pollingIntervalID);
	}, []);

	return (
		<div className="ui three column centered grid">
			<div className="column">
				<EditableTimerList 
					timers={timers}
					onFormSubmit={handleEditFormSubmit}
					onTrashClick={handleTrashClick}
					onStartClick={handleStartClick}
					onStopClick={handleStopClick}
				/>
				<ToggleableTimerForm 
					onFormSubmit={handleCreateFormSubmit}
				/>
			</div>
		</div>
	);
}


ReactDOM.render(
	<TimersDashboard />,
	document.getElementById('content')
);
