import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import helpers from './helpers.js';
import { v4 as uuidv4 } from 'uuid';

class TimerActionButton extends React.Component {
	render() {
		const timerIsRunning = this.props.timerIsRunning;
		const onClick = timerIsRunning ? 
			this.props.onStopClick : 
			this.props.onStartClick;
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

class ToggleableTimerForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};

		this.handleFormOpen = this.handleFormOpen.bind(this);
		this.handleFormClose = this.handleFormClose.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormOpen() {
		this.setState({ isOpen: true });
	}

	handleFormClose() {
		this.setState({ isOpen: false });		
	}

	handleFormSubmit(timer) {
		this.props.onFormSubmit(timer);
		this.setState({ isOpen: false });
	}

	render() {
		if (this.state.isOpen) {
			return (
				<TimerForm 
					onFormSubmit={this.handleFormSubmit}
					onFormClose={this.handleFormClose}
				/>
			);
		}

		return (
			<div className="ui basic content center aligned segment">
				<button 
					className="ui basic button icon"
					onClick={this.handleFormOpen}
				>
					<i className="plus icon" />
				</button>
			</div>
		);
	}
}
ToggleableTimerForm.propTypes = {
	isOpen: PropTypes.bool,
	onFormSubmit: PropTypes.func
};

class TimerForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title || '',
			project: this.props.project || ''
		};
		this.titleRef = React.createRef();

		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleProjectChange = this.handleProjectChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.titleRef.current.focus();
	}

	handleTitleChange(e) {
		this.setState({ title: e.target.value });
	}
	
	handleProjectChange(e) {
		this.setState({ project: e.target.value });
	}

	handleSubmit() {
		this.props.onFormSubmit({
			id: this.props.id,
			title: this.state.title,
			project: this.state.project
		});
	}

	render() {
		const submitText = this.props.id ? 'Update' : 'Create';

		return (
			<div className="ui centered card">
				<div className="content">
					<div className="ui form">
						<div className="field">
							<label>Title</label>
							<input 
								ref={this.titleRef}
								type="text" 
								value={this.state.title} 
								onChange={this.handleTitleChange}
							/>
						</div>
						<div className="field">
							<label>Project</label>
							<input 
								type="text" 
								value={this.state.project} 
								onChange={this.handleProjectChange}
							/>
						</div>
						<div className="ui two bottom attached buttons">
							<button 
								className="ui basic blue button"
								onClick={this.handleSubmit}
							>
								{submitText}
							</button>
							<button 
								className="ui basic red button"
								onClick={this.props.onFormClose}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
TimerForm.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	project: PropTypes.string,
	onFormSubmit: PropTypes.func,
	onFormClose: PropTypes.func
};

class EditableTimer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editFormOpen: false
		};

		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleTrashClick = this.handleTrashClick.bind(this);
		this.handleFormClose = this.handleFormClose.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleStartClick = this.handleStartClick.bind(this);
		this.handleStopClick = this.handleStopClick.bind(this);
	}

	openEditForm() {
		this.setState({ editFormOpen: true });
	}

	closeEditForm() {
		this.setState({ editFormOpen: false });
	}

	handleEditClick() {
		this.openEditForm();
	}

	handleFormClose() {
		this.closeEditForm();	
	}

	handleFormSubmit(timer) {
		this.props.onFormSubmit(timer);
		this.closeEditForm();
	}

	handleTrashClick() {
		this.props.onTrashClick(this.props.id);
	}

	handleStartClick() {
		this.props.onStartClick(this.props.id);
	}
	
	handleStopClick() {
		this.props.onStopClick(this.props.id);
	}

	render() {
		if (this.state.editFormOpen) {
			return (
				<TimerForm
					id={this.props.id}
					title={this.props.title}
					project={this.props.project}
					onFormClose={this.handleFormClose}
					onFormSubmit={this.handleFormSubmit}
				/>
			);
		}

		return (
			<Timer
				id={this.props.id}
				title={this.props.title}
				project={this.props.project}
				elapsed={this.props.elapsed}
				runningSince={this.props.runningSince}
				onEditClick={this.handleEditClick}
				onTrashClick={this.handleTrashClick}
				onStartClick={this.handleStartClick}
				onStopClick={this.handleStopClick}
			/>
		);
	}
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

class EditableTimerList extends React.Component {
	render() {
		const timers = this.props.timers.map(timer => (
			<EditableTimer 
				key={timer.id}
				id={timer.id}
				title={timer.title}
				project={timer.project}
				elapsed={timer.elapsed}
				runningSince={timer.runningSince}
				onFormSubmit={this.props.onFormSubmit}
				onTrashClick={this.props.onTrashClick}
				onStartClick={this.props.onStartClick}
				onStopClick={this.props.onStopClick}
			/>
		));

		return (
			<div id="timers">
				{timers}
			</div>
		);
	}
}
EditableTimerList.propTypes = {
	timers: PropTypes.array,
	onFormSubmit: PropTypes.func,
	onTrashClick: PropTypes.func,
	onStartClick: PropTypes.func,
	onStopClick: PropTypes.func
};

class TimersDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timers: [
				{
					id: uuidv4(),
					title: 'Practice Squat',
					project: 'Gym Chores',
					elapsed: 5456099,
					runningSince: Date.now()
				},
				{
					id: uuidv4(),
					title: 'Bake squash',
					project: 'Kitchen Chores',
					elapsed: 1273998,
					runningSince: null
				}
			]
		};

		this.handleCreateFormSubmit = this.handleCreateFormSubmit.bind(this);
		this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
		this.handleTrashClick = this.handleTrashClick.bind(this);
		this.handleStartClick = this.handleStartClick.bind(this);
		this.handleStopClick = this.handleStopClick.bind(this);
	}

	handleCreateFormSubmit(timer) {
		this.createTimer(timer);
	}

	handleEditFormSubmit(timer) {
		this.updateTimer(timer);
	}

	handleTrashClick(id) {
		this.deleteTimer(id);
	}

	handleStartClick(id) {
		this.startTimer(id);
	}

	handleStopClick(id) {
		this.stopTimer(id);
	}

	createTimer(timer) {
		const timersCopy = helpers.deepCopy(this.state.timers);
		timersCopy.push({
			id: uuidv4(),
			title: timer.title || 'Timer',
			project: timer.project || 'Project',
			elapsed: 0,
			runningSince: null
		});

		this.setState({ timers: timersCopy });
	}
	
	updateTimer(timer) {
		const updatedTimersCopy = this.state.timers.map(timerCopy => {
			if (timerCopy.id === timer.id) {
				return { ...timerCopy, ...timer };
			}

			return { ...timerCopy };
		});

		this.setState({ timers: updatedTimersCopy });
	}

	deleteTimer(id) {
		const timersCopy = helpers.deepCopy(this.state.timers);
		const updatedTimersCopy = timersCopy.filter(timer => timer.id !== id);

		this.setState({ timers: updatedTimersCopy });
	}

	startTimer(id) {
		const updatedTimersCopy = this.state.timers.map(timer => {
			if (timer.id === id) {
				return { ...timer, runningSince: Date.now() };
			}

			return { ...timer };
		});

		this.setState({ timers: updatedTimersCopy });
	}

	stopTimer(id) {
		const updatedTimersCopy = this.state.timers.map(timer => {
			if (timer.id === id) {
				const lastElapsed = Date.now() - timer.runningSince;

				return ({ 
					...timer,
					elapsed: timer.elapsed + lastElapsed,
					runningSince: null 
				});
			}

			return { ...timer };
		});

		this.setState({ timers: updatedTimersCopy });
	}

	render() {
		return (
			<div className="ui three column centered grid">
				<div className="column">
					<EditableTimerList 
						timers={this.state.timers}
						onFormSubmit={this.handleEditFormSubmit}
						onTrashClick={this.handleTrashClick}
						onStartClick={this.handleStartClick}
						onStopClick={this.handleStopClick}
					/>
					<ToggleableTimerForm 
						onFormSubmit={this.handleCreateFormSubmit}
					/>
				</div>
			</div>
		);
	}
}


ReactDOM.render(
	<TimersDashboard />,
	document.getElementById('content')
);
