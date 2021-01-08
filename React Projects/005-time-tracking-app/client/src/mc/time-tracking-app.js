// mc project clone
// status: unfinished
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';

class Button extends React.Component {
	render() {
		return (
			<button 
				className={this.props.className}
				onClick={this.props.onClick}
			>{this.props.text}</button>
		);
	}
}
Button.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
	onClick: PropTypes.func
};

class FormGroup extends React.Component {
	render() {
		return (
			<div className="form-group">
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<input 
					id={this.props.id} 
					className="form-control" 
					type="text" 
					value={this.props.value}
					onChange={this.props.onChange}
				/>
			</div>
		);
	}
}
FormGroup.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func
};

class ThemedButton extends React.Component {
	render() {
		return (
			<Button 
				className={this.props.color}
				text={this.props.text}
				onClick={this.props.onClick}
			/>
		);
	}
}
ThemedButton.propTypes = {
	color: PropTypes.string,
	text: PropTypes.string,
	onClick: PropTypes.func
};

class Controls extends React.Component {
	render() {
		return (
			<div className="controls">
				{this.props.children}
			</div>
		);
	}
}
Controls.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element)
	])
};

class TimerForm extends React.Component {
	render() {
		return (
			<div className="timer-form">
				<FormGroup 
					id="title" 
					label="Title" 
					value={this.props.titleText} 
					onChange={this.props.onTitleTextChange}
				/>
				<FormGroup 
					id="project" 
					label="Project" 
					value={this.props.projectText} 
					onChange={this.props.onProjectTextChange}
				/>
			<Controls>
				<ThemedButton 
					color="blue" 
					text={this.props.isCreateNew ? 'Create' : 'Update'} 
					onClick={this.props.handleCreateUpdateClick}
				/>
				<ThemedButton 
					color="red" 
					text="Cancel" 
					onClick={this.props.handleCancelClick}
				/>
			</Controls>
			</div>
		);
	}
}
TimerForm.propTypes = {
	isCreateNew: PropTypes.bool,
	titleText: PropTypes.string,
	projectText: PropTypes.string,
	onTitleTextChange: PropTypes.func,
	onProjectTextChange: PropTypes.func,
	handleCreateUpdateClick: PropTypes.func,
	handleCancelClick: PropTypes.func
};

class EditableTimer extends React.Component {
	constructor(props) {
		super(props);
		this.handleStartStopClick = this.handleStartStopClick.bind(this);
		this.handleTodoDeletionClick = this.handleTodoDeletionClick.bind(this);
		this.handleEditTodoClick = this.handleEditTodoClick.bind(this);
	}

	handleStartStopClick() {
		this.props.onStartStopClick(this.props.todo.id);
	}

	handleTodoDeletionClick() {
		this.props.onTodoDeletionClick(this.props.todo.id);
	}

	handleEditTodoClick() {
		this.props.onEditTodoClick(this.props.todo.id);
	}

	render() {
		const todo = this.props.todo;

		return (
			<div className="editable-timer">
				<div className="todo-info">
					<h2 className="title">{todo.title}</h2>
					<small className="project">{todo.project}</small>
					<p className="elapsed">{formatTime(todo.elapsed)}</p>
					<Controls>
						<ThemedButton 
							color="green" 
							text="Edit" 
							onClick={this.handleEditTodoClick}
						/>
						<ThemedButton 
							color="red" 
							text="Delete"
							onClick={this.handleTodoDeletionClick}
						/>
					</Controls>
				</div>
				<Controls>
					<ThemedButton 
						color={this.props.isTicking ? 'red' : 'green'}
						text={this.props.isTicking ? 'Stop' : 'Start'}
						onClick={this.handleStartStopClick}
					/>
				</Controls>
			</div>
		);
	}
}
EditableTimer.propTypes = {
	todo: PropTypes.object,
	isTicking: PropTypes.bool,
	onStartStopClick: PropTypes.func,
	onTodoDeletionClick: PropTypes.func,
	onEditTodoClick: PropTypes.func
};


class EditableTimerList extends React.Component {
	render() {
		const editableTimers = this.props.todos.map(todo => {
			if (todo.id === this.props.todoIDOnEdit) {
				return (
					<TimerForm 
						key={todo.id}
						isCreateNew={false} 
					/>
				);
			}

			const isTicking = this.props.activeTimerIDs.indexOf(todo.id) !== -1;
			const onClick = isTicking ?
				this.props.onStopClick : 
				this.props.onStartClick;
			return (
				<EditableTimer 
					key={todo.id}
					todo={todo}
					isTicking={isTicking}
					onStartStopClick={onClick}
					onTodoDeletionClick={this.props.onTodoDeletionClick}
					onEditTodoClick={this.props.onEditTodoClick}
				/>
			);
		});

		return (
			<div className="editable-timer-list">
				{editableTimers}
			</div>
		);
	}
}
EditableTimerList.propTypes = {
	todos: PropTypes.array,
	activeTimerIDs: PropTypes.array,
	onStartClick: PropTypes.func,
	onStopClick: PropTypes.func,
	onTodoDeletionClick: PropTypes.func,
	onEditTodoClick: PropTypes.func,
	todoIDOnEdit: PropTypes.number,
};

class ToggleableTimerForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isCreateNew: false,
			titleText: '',
			projectText: ''
		};

		this.handleCreateNewClick = this.handleCreateNewClick.bind(this);
		this.handleCreateClick = this.handleCreateClick.bind(this);
		this.handleCancelClick = this.handleCancelClick.bind(this);
		this.handleTitleTextChange = this.handleTitleTextChange.bind(this);
		this.handleProjectTextChange = this.handleProjectTextChange.bind(this);
	}

	handleCreateNewClick() {
		this.setState({ isCreateNew: true });
	}

	handleCreateClick() {
		const title = this.state.titleText;
		const project = this.state.projectText;

		if (!title && !project) {
			return
		}

		this.props.onAddTodo({ title, project });

		this.resetState();
	}

	resetState() {
		this.setState({ 
			isCreateNew: false,
			titleText: '',
			projectText: ''
		});
	}

	handleCancelClick() {
		this.resetState();
	}

	handleTitleTextChange(e) {
		this.setState({ titleText: e.target.value });
	}

	handleProjectTextChange(e) {
		this.setState({ projectText: e.target.value });
	}

	render() {
		return (
			<div className="toggleable-timer-form">
				{this.state.isCreateNew ? 
					(<TimerForm 
						isCreateNew={this.state.isCreateNew}
						titleText={this.state.titleText}
						projectText={this.state.projectText}
						onTitleTextChange={this.handleTitleTextChange}
						onProjectTextChange = {this.handleProjectTextChange}
						handleCreateUpdateClick={this.handleCreateClick}
						handleCancelClick={this.handleCancelClick}
					/>) :
					<Button 
						className="create-btn" 
						text="+"
						onClick={this.handleCreateNewClick}
					/>
				}
			</div>
		);
	}
}
ToggleableTimerForm.propTypes = {
	onAddTodo: PropTypes.func
};

class TimersDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			timerIDs: [],
			todoIDOnEdit: null
		};

		this.handleAddTodo = this.handleAddTodo.bind(this);
		this.handleStartClick = this.handleStartClick.bind(this);
		this.handleStopClick = this.handleStopClick.bind(this);
		this.handleTodoDeletionClick = this.handleTodoDeletionClick.bind(this);
		this.handleEditTodoClick = this.handleEditTodoClick.bind(this);
	}

	componentDidMount() {
		import('./todos.js')
			.then(({ todos }) => this.setState({ todos }))
			.catch(err => console.err(err));
	}

	handleAddTodo(todo) {
		const todosLength = this.state.todos.length;
		let todosCopy;
		let lastID;

		if (todosLength > 0) {
			todosCopy = this.state.todos.map(todo => ({...todo}));
			lastID = todosCopy[todosLength - 1].id;
		} else {
			todosCopy = [];
			lastID = 1;
		}
		todosCopy.push({ ...todo, id: lastID + 1, elapsed: 0 });

		this.setState({ todos: todosCopy });
	}

	handleStartClick(id) {
		const timerIDs = deepCopy(this.state.timerIDs);
		const timerID = {
			id,
			timer: setInterval(() => {
				const todosCopy = deepCopy(this.state.todos);
				for (let todo of todosCopy) {
					if (todo.id === id) {
						todo.elapsed++;
						this.setState({ todos: todosCopy });
						break;
					}
				}
			}, 1000)
		};
		timerIDs.push(timerID);
		this.setState({ timerIDs });
	}

	removeTimerID(id) {
		const timerIDsCopy = deepCopy(this.state.timerIDs);
		for (let i = 0, len = timerIDsCopy.length; i < len; i++) {
			if (timerIDsCopy[i].id === id) {
				clearInterval(timerIDsCopy[i].timer);
				timerIDsCopy.splice(i, 1);
				break;
			}
		}

		this.setState({ timerIDs: timerIDsCopy });
	}

	handleStopClick(id) {
		this.removeTimerID(id);
	}

	handleTodoDeletionClick(id) {
		const todosCopy = deepCopy(this.state.todos);
		const updatedTodosCopy = todosCopy.filter(todo => todo.id !== id);
	
		this.setState({ todos: updatedTodosCopy });
		this.removeTimerID(id);
	}

	getActiveTimerIDs() {
		const timerIDs = this.state.timerIDs;
		const activeTimerIDs = timerIDs.map(timerID => timerID.id);

		return activeTimerIDs;
	}

	handleEditTodoClick(id) {
		console.log('edit', id);
		this.setState({ todoIDOnEdit: id });
	}

	render() {
		const activeTimerIDs = this.getActiveTimerIDs();

		return (
			<div className="timers-dashboard">
				<EditableTimerList 
					todos={this.state.todos}
					activeTimerIDs={activeTimerIDs}
					onStartClick={this.handleStartClick}
					onStopClick={this.handleStopClick}
					onTodoDeletionClick={this.handleTodoDeletionClick}
					todoIDOnEdit={this.state.todoIDOnEdit}
					onEditTodoClick={this.handleEditTodoClick}
				/>
				<ToggleableTimerForm 
					onAddTodo={this.handleAddTodo}
				/>
			</div>
		);
	}
}

function formatTime(seconds) {
	let remainder = seconds;
	const h = parseInt(seconds / 3600);
	remainder %= 3600;
	const m = parseInt(remainder / 60);
	const s = parseInt(remainder % 60);
	return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
}

function deepCopy(targetObj) {
	return targetObj.map(el => ({...el}));
}

ReactDOM.render(
	<TimersDashboard />,
	document.getElementById('root')
);
























