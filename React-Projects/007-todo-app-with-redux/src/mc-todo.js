import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import store from './store.js';
import './styles.css';


const Todo = ({ text, completed, onClick }) => {
	const childNode = completed ? <del>{text}</del> : text;

	return (
		<li 
			className={completed ? 'completed': ''}
			onClick={onClick}
		>
			{childNode}
		</li>
	);
};

const getVisibleTodos = (todos, visibilityFilter) => {
	switch (visibilityFilter) {
		case 'SHOW_ALL':
			return todos;
		case 'SHOW_ACTIVE':
			return todos.filter(t => !t.completed);
		case 'SHOW_COMPLETED':
			return todos.filter(t => t.completed);
		default:
			return todos;
	}
};

const FilterableTodoList = ({ 
	todos, 
	visibilityFilter, 
	onTodoClick 
}) => {
	const visibleTodos = getVisibleTodos(todos, visibilityFilter);
	const todoList = visibleTodos.map(todo => 
		<Todo
			key={todo.id}
			{...todo}
			onClick={() => onTodoClick(todo.id)}
		/>
	);

	return (
		<div className="FilterableTodoList">
			<ul>{todoList}</ul>
		</div>
	);
};

const FilterButton = ({ 
	onClick, 
	currentFilter, 
	filter, 
	text 
}) => {	
	if (currentFilter === filter) {
		return (
			<button style={{color: 'blue'}}>
				{text}
			</button>
		);

	}

	return (
		<button onClick={onClick}>
			{text}
		</button>
	);
};

const TodoForm = ({ onSubmit }) => {
	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!text) {
			return;
		}

		setText('');
		onSubmit(text);
	};

	const [text, setText] = useState('');

	return (
		<div className="TodoForm">
			<form onSubmit={handleSubmit}>
				<input 
					type="text"
					value={text}
					onChange={handleChange}
				/>
				<button type="submit">Add</button>
			</form>
		</div>
	);
};

const TodoApp = ({ todos, visibilityFilter }) => {
	const handleFormSubmit = (text) => {
		const action = {
			type: 'ADD_TODO',
			id: uuidv4(),
			text
		};
		store.dispatch(action);
	};

	const handleTodoClick = (id) => {
		const action = {
			type: 'TOGGLE_TODO',
			id
		};
		store.dispatch(action);
	};

	const handleFilterButtonClick = (filter) => {
		const action = {
			type: 'SET_VISIBILITY_FILTER',
			filter
		};
		store.dispatch(action);
	};

	return (
		<div className="TodoApp">
			<TodoForm 
				onSubmit={handleFormSubmit}
			/>
			<div className="TodoFilter">
				<FilterButton 
					onClick={() => handleFilterButtonClick('SHOW_ALL')}
					currentFilter={visibilityFilter}
					filter="SHOW_ALL"
					text="All"
				/>
				<FilterButton 
					onClick={() => handleFilterButtonClick('SHOW_ACTIVE')}
					currentFilter={visibilityFilter}
					filter="SHOW_ACTIVE"
					text="Active"
				/>

				<FilterButton 
					onClick={() => handleFilterButtonClick('SHOW_COMPLETED')}
					currentFilter={visibilityFilter}
					filter="SHOW_COMPLETED"
					text="Completed"
				/>
			</div>
			<FilterableTodoList 
				todos={todos}
				visibilityFilter={visibilityFilter}
				onTodoClick={handleTodoClick}	
			/>
		</div>
	);
};

const render = () => {
	ReactDOM.render(
		<TodoApp 
			{...store.getState()}
		/>,
		document.getElementById('root')
	);
};

store.subscribe(render);
render();

























