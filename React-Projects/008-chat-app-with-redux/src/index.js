import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App.js';
import chat from './reducers.js';

ReactDOM.render(
	<Provider 
		store={createStore(chat)}
	>
		<App />
	</Provider>,
	document.getElementById('root')
);
