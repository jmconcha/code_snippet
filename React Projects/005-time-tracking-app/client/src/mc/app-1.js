// build a static version of the app
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import helpers from './helpers.js';

class Timer extends React.Component {
	render() {
		const elapsedString = helpers.renderElapsedString(this.props.elapsed);

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
						<span className="right floated edit icon">
							<i className="edit icon" />
						</span>
						<span className="right floated trash icon">
							<i className="trash icon" />
						</span>
					</div>
				</div>
				<div className="ui bottom attached blue basic button">
					Start
				</div>
			</div>
		);
	}
}
Timer.propTypes = {
	title: PropTypes.string,
	project: PropTypes.string,
	elapsed: PropTypes.string
};

class ToggleableTimerForm extends React.Component {
	render() {
		if (this.props.isOpen) {
			return (
				<TimerForm />
			);
		}

		return (
			<div className="ui basic content center aligned segment">
				<button className="ui basic button icon">
					<i className="plus icon" />
				</button>
			</div>
		);
	}
}
ToggleableTimerForm.propTypes = {
	isOpen: PropTypes.bool
};

class TimerForm extends React.Component {
	render() {
		const submitText = this.props.title ? 'Update' : 'Create';

		return (
			<div className="ui centered card">
				<div className="content">
					<div className="ui form">
						<div className="field">
							<label>Title</label>
							<input type="text" defaultValue={this.props.title} />
						</div>
						<div className="field">
							<label>Project</label>
							<input type="text" defaultValue={this.props.project} />
						</div>
						<div className="ui two bottom attached buttons">
							<button className="ui basic blue button">
								{submitText}
							</button>
							<button className="ui basic red button">
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
	title: PropTypes.string,
	project: PropTypes.string
};

class EditableTimer extends React.Component {
	render() {
		if (this.props.editFormOpen) {
			return (
				<TimerForm 
					title={this.props.title}
					project={this.props.project}
				/>
			);
		}

		return (
			<Timer
				title={this.props.title}
				project={this.props.project}
				elapsed={this.props.elapsed}
				runningSince={this.props.runningSince}
			/>
		);
	}
}
EditableTimer.propTypes = {
	title: PropTypes.string,
	project: PropTypes.string,
	elapsed: PropTypes.string,
	editFormOpen: PropTypes.bool,
	runningSince: PropTypes.number
};

class EditableTimerList extends React.Component {
	render() {
		return (
			<div id="timers">
				<EditableTimer 
					title="Learn React"
					project="We Domination"
					elapsed="8986300"
					runningSince={null}
					editFormOpen={false}
				/>
				<EditableTimer 
					title="Learn extreme ironing"
					project="We Domination"
					elapsed="3890985"
					runningSince={null}
					editFormOpen={true}
				/>
			</div>
		);
	}
}

class TimersDashboard extends React.Component {
	render() {
		return (
			<div className="ui three column centered grid">
				<div className="column">
					<EditableTimerList />
					<ToggleableTimerForm
						isOpen={true}
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
