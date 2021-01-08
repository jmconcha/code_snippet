const { createStore } = Redux;
const { combineReducers } = Redux;
const { Component } = React;

const todo = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				id: action.id,
				text: action.text,
				completed: false
			};
		case 'TOGGLE_TODO':
				if (state.id === action.id) {
					return { 
						...state, completed: 
						!state.completed 
					};
				}
				return state;
		default:
			return state;
	}

};

const todos = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				todo(undefined, action)
			];
		case 'TOGGLE_TODO':
			return state.map(t => todo(t, action));
		default:
			return state;
	}
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default:
			return state;
	};
};

const ListItem = ({ text, completed }) => {
	if (completed) {
		return (
			<li><del>{text}</del></li>
		);
	}

	return (
		<li>{text}</li>
	);
};

const FilterableTodoList = ({ todos }) => {
	const todoList = todos.map(todo =>
		<ListItem
			key={todo.id}
			text={todo.text}
			completed={todo.completed}
		/>
	);

	return (
		<div className="FilterableTodoList">
			<ul>{todoList}</ul>
		</div>
	);
};

const TodoFilter = () => {
	return (
		<div className="TodoFilter">
			<button>Show all</button>
			<button>Show Completed</button>
		</div>
	);
};

let id = 0;
class TodoForm extends Component {
	constructor(props) {
		super(props);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormSubmit(e) {
		e.preventDefault();
		const text = this.inputRef.value;
		if (!text) {
			return;
		}

		const action = {
			type: 'ADD_TODO',
			id: id++,
			text
		};
		store.dispatch(action);
	};

	render() {
		return (
			<div className="TodoForm">
				<form onSubmit={this.handleFormSubmit}>
					<input 
						type="text"
						ref={node => this.inputRef = node}
					/>
					<button type="submit">Add</button>
				</form>
			</div>
		);
	}
};

const TodoApp = ({ state }) => {
	return (
		<div className="TodoApp">
			<TodoForm />
			<TodoFilter />
			<FilterableTodoList 
				todos={state.todos}
				visibilityFilter={state.visibilityFilter}
			/>
		</div>
	);
};

/*const state = {
	todos: [
		{
			id: 0,
			text: 'Learn React',
			completed: true
		}, 
		{
			id: 1,
			text: 'React Developer',
			completed: false
		}

	],
	visibilityFilter: 'SHOW_ALL'
};*/

const render = () => {
	ReactDOM.render(
		<TodoApp 
			state={store.getState()}
		/>,
		document.getElementById('root')
	);
};

const todoApp = combineReducers({
	todos,
	visibilityFilter
});
const store = createStore(todoApp);
store.subscribe(render);
render();

























