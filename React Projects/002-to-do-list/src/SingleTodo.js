import React from 'react';

const SingleTodo = props => <li>{ props.todo } <button onClick={ props.deleteTodo }>&times;</button></li>;

export default SingleTodo;
