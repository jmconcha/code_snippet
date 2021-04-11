import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import db from './firebase.config.js';
import helpers from './helpers.js';

const TimerForm = ({
	id, 
	title, 
	project, 
	onCancelClick, 
	onFormSubmit
}) => {
	const handleTitleInputChange = (e) => {
		setTitleInput(e.target.value);
	};

	const handleProjectInputChange = (e) => {
		setProjectInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!titleInput || !projectInput) {
			return;
		}

		onFormSubmit({
			id,
			title: titleInput,
			project: projectInput,
		});

		setTitleInput('');
		setProjectInput('');
	};

	const [titleInput, setTitleInput] = useState(title || '');
	const [projectInput, setProjectInput] = useState(project || '');

	return (
		<form 
			className="timer-form"
			onSubmit={handleSubmit}
		>
			<div className="form-group">
				<label htmlFor="title">Title</label>
				<input 
					id="title" 
					className="form-control" 
					type="text" 
					required={true}
					value={titleInput}
					onChange={handleTitleInputChange}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="project">Project</label>
				<input 
					id="project" 
					className="form-control" 
					type="text" 
					required={true}
					value={projectInput} 
					onChange={handleProjectInputChange}
				/>
			</div>
			<div className="controls">
				<button 
					type="submit"
					className="btn btn-blue"
				>
					{ id ? 'Update' : 'Create' }
				</button>
				<button
					type="button"
					className="btn btn-red"
					onClick={onCancelClick}
				>
					Cancel
				</button>
			</div>
		</form>
	);
};
TimerForm.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	project: PropTypes.string,
	onCancelClick: PropTypes.func,
	onFormSubmit: PropTypes.func,
};

class Timer extends React.Component {
	componentDidMount() {
		this.forceUpdateIntervalId = setInterval(
			() => this.forceUpdate(),
			50
		);
	}

	componentWillUnmount() {
		clearInterval(this.forceUpdateIntervalId);
	}
	
	render() {		
		const elapsed = this.props.runningSince ? 
			this.props.elapsed + Date.now() - this.props.runningSince :
			this.props.elapsed;
		const formattedElapsed = helpers.renderElapsedString(elapsed);

		return (
			<div className="timer">
				<div className="todo-info">
					<div className="header">
						<h2 className="title">
							{this.props.title}
						</h2>
						<small className="project">
							{this.props.project}
						</small>
					</div>
					<div className="main-content">
						<p className="elapsed">
							{formattedElapsed}
						</p>
						<div className="controls">
							<button 
								className="btn btn-edit"
								onClick={this.props.onEditClick}
							>
								<i className="fa fa-edit"></i>
							</button>
							<button 
								className="btn btn-delete"
								onClick={this.props.onDeleteClick}
							>
								<i className="fa fa-trash-alt"></i>
							</button>
						</div>
					</div>
				</div>
				<div className="footer">
					<div className="controls">
						<button
							className={`btn btn-${this.props.btnColorTheme}`}
							onClick={this.props.onBtnClick}
						>
							{this.props.btnLabel}
						</button>
					</div>
				</div>
			</div>
		);
	}
}
Timer.propTypes = {
	title: PropTypes.string,
	project: PropTypes.string,
	elapsed: PropTypes.number,
	runningSince: PropTypes.number,
	btnColorTheme: PropTypes.string,
	btnLabel: PropTypes.string,
	onBtnClick: PropTypes.func,
	onEditClick: PropTypes.func,
	onDeleteClick: PropTypes.func,
};

const EditableTimer = ({ 
	id,
	title,
	project,
	elapsed,
	runningSince,
	onUpdateFormSubmit,
	onDeleteClick,
	onStartClick,
	onStopClick
}) => {
	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleDeleteClick = () => {
		onDeleteClick(id);
	};
	
	const handleStartClick = () => {
		onStartClick(id);
	};

	const handleStopClick = () => {
		onStopClick(id);
	};

	const handleCancelClick = () => {
		setIsEditing(false);
	};

	const handleFormSubmit = (attrs) => {
		setIsEditing(false);
		onUpdateFormSubmit(attrs);
	};

	const [isEditing, setIsEditing] = useState(false);

	if (isEditing) {
		return (
			<TimerForm 
				id={id}
				title={title}
				project={project}
				onCancelClick={handleCancelClick}
				onFormSubmit={handleFormSubmit}
			/>
		);
	}

	return (
		<Timer 
			title={title}
			project={project}
			elapsed={elapsed}
			runningSince={runningSince}
			btnColorTheme={runningSince ? 'red' : 'green'}
			btnLabel={runningSince ? 'Stop' : 'Start'}
			onBtnClick={runningSince ? 
				handleStopClick : 
				handleStartClick
			}
			onEditClick={handleEditClick}
			onDeleteClick={handleDeleteClick}
		/>
	);
};
EditableTimer.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	project: PropTypes.string,
	elapsed: PropTypes.number,
	runningSince: PropTypes.number,
	onUpdateFormSubmit: PropTypes.func,
	onDeleteClick: PropTypes.func,
	onStartClick: PropTypes.func,
	onStopClick: PropTypes.func,
};

const EditableTimerList = ({
	timers,
	onUpdateFormSubmit,
	onDeleteClick,
	onStartClick,
	onStopClick,
}) => {
	return (
		<div className="editable-timer-list">
			{timers.map(t => (
				<EditableTimer 
					key={t.id}
					{...t}
					onUpdateFormSubmit={onUpdateFormSubmit}
					onDeleteClick={onDeleteClick}
					onStartClick={onStartClick}
					onStopClick={onStopClick}
				/>
			))}
		</div>
	);
};
EditableTimerList.propTypes = {
	timers: PropTypes.array,
	onUpdateFormSubmit: PropTypes.func,
	onDeleteClick: PropTypes.func,
	onStartClick: PropTypes.func,
	onStopClick: PropTypes.func,
};

const ToggleableTimerForm = ({ onCreateFormSubmit }) => {
	const handleCreateClick = () => {
		setIsOpen(true);
	};

	const handleFormCancelClick = () => {
		setIsOpen(false);
	};

	const handleFormSubmit = (todo) => {
		setIsOpen(false);
		onCreateFormSubmit(todo);
	};

	const [isOpen, setIsOpen] = useState(false);
	
	if (isOpen) {
		return (
			<TimerForm
				onFormSubmit={handleFormSubmit}
				onCancelClick={handleFormCancelClick}
			/>
		);
	}

	return (
		<div className="toggleable-timer-form">
			<button 
				className="btn btn-create-timer"
				onClick={handleCreateClick}
			>
				<i className="fa fa-plus"></i>
			</button>
		</div>
	);
};
ToggleableTimerForm.propTypes = {
	onCreateFormSubmit: PropTypes.func,
};

const TimersDashboard = () => {
	const handleCreateFormSubmit = (timer) => {
		const id = uuidv4();
		const date = Date.now();

		setTimers([
			...timers,
			{
				id,
				date,
				title: timer.title,
				project: timer.project,
				elapsed: 0,
				runningSince: null,
			},
		]);

		saveTimerOnFirestore({
			id,
			date,
			title: timer.title,
			project: timer.project,
		});
	};

	const handleUpdateFormSubmit = (attrs) => {
		setTimers(
			timers.map(t => {
				if (t.id === attrs.id) {
					return {
						...t,
						title: attrs.title,
						project: attrs.project,
					};
				}
				return t;
			})
		);

		updateTimerOnFirestore(attrs);
	};

	const handleDeleteClick = (id) => {
		setTimers(
			timers.filter(t => t.id !== id)
		);

		deleteTimerOnFirestore(id);
	};

	const handleStartClick = (id) => {
		const now = Date.now();

		setTimers(
			timers.map(t => {
				if (t.id === id) {
					return {
						...t,
						runningSince: now,
					};
				}
				return t;
			})
		);

		startTimerOnFirestore({ 
			id,
			start: now,
		});
	};

	const handleStopClick = (id) => {
		const now = Date.now();
		let elapsed;

		setTimers(
			timers.map(t => {
				if (t.id === id) {
					elapsed = t.elapsed + now - t.runningSince
					return {
						...t,
						elapsed,
						runningSince: null,
					};
				}
				return t;
			})
		);

		stopTimerOnFirestore({
			id,
			elapsed,
		});
	};

	const saveTimerOnFirestore = (timer) => {
		db.collection('timers')
			.doc(timer.id)
			.set({
				date: timer.date,
				title: timer.title,
				project: timer.project,
				elapsed: 0,
				runningSince: null,
			});
	};

	const updateTimerOnFirestore = (attrs) => {
		db.collection('timers')
			.doc(attrs.id)
			.update({
				title: attrs.title,
				project: attrs.project,
			});
	};

	const deleteTimerOnFirestore = (id) => {
		db.collection('timers')
			.doc(id)
			.delete();
	};

	const startTimerOnFirestore = (data) => {
		db.collection('timers')
			.doc(data.id)
			.update({
				runningSince: data.start,
			});
	};

	const stopTimerOnFirestore = (data) => {
		db.collection('timers')
			.doc(data.id)
			.update({
				runningSince: null,
				elapsed:  data.elapsed,
			});
	};

	const fetchTimers = () => {
		db.collection('timers')
			.orderBy('date')
			.get()
			.then(snapshot => {
				const timers = [];
				
				snapshot.forEach(doc => {
					timers.push({
						id: doc.id,
						...doc.data(),
					});
				});

				setTimers(timers);
			});
	};

	const [timers, setTimers] = useState([]);
	useEffect(() => {
		fetchTimers();

		const unsubscribe = db.collection('timers')
			.onSnapshot(fetchTimers);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<div className="wrapper">
			<div className="timers-dashboard">
				<EditableTimerList 
					timers={timers}
					onUpdateFormSubmit={handleUpdateFormSubmit}
					onDeleteClick={handleDeleteClick}
					onStartClick={handleStartClick}
					onStopClick={handleStopClick}
				/>
				<ToggleableTimerForm 
					onCreateFormSubmit={handleCreateFormSubmit}
				/>
			</div>
		</div>
	);
};

export default TimersDashboard;


































