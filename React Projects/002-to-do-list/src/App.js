import React from 'react';
import SingleTodo from './SingleTodo';

class App extends React.Component {
    constructor() {
        super();
	this.state = {
	    todos: [],
	    currentTodo: ''
	};
    }

    onInputChange = e => {
        this.setState({ currentTodo: e.target.value });
    }

    addTodo = () => {
        this.setState({ todos: [...this.state.todos, this.state.currentTodo], currentTodo: '' });
    }

    deleteTodo = i => {
        let todosCopy = this.state.todos.slice();
        todosCopy.splice(i, 1);

	this.setState({ todos: todosCopy });
    }

    render() {
        let todoList = this.state.todos.map((e, i) => <SingleTodo todo={ e } deleteTodo={ this.deleteTodo } />);

        return (
	    <div>
		<input type="text" placeholder="Something to do..." value={this.state.currentTodo} onChange={ this.onInputChange } />
		<button onClick={ this.addTodo }>Add Todo</button>
		<br />
		{ this.state.todos.length ? <ul>{ todoList }</ul> : 'Nothing to do.' }
	    </div>
	);
    }
}

export default App;
