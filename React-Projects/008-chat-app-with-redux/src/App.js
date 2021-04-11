import React, { useState } from 'react';
import { connect } from 'react-redux';
import { openThread, addMessage, deleteMessage } from './actions.js';
import { formatTime } from './helpers.js';
import './styles.css';

const Tabs = ({ tabs, onClick }) => (
	<div className="thread-tabs">
		{
			tabs.map(t => (
				<button 
					key={t.id}
					className={t.active ? 'tab active' : 'tab'}
					onClick={() => onClick(t.id)}
				>
					{t.title}
				</button>
			))
		}
	</div>
);

const mapStateToTabsProps = (state) => {
	const tabs = state.threads.map(t => ({
		id: t.id,
		title: t.title,
		active: t.id === state.activeThreadId,
	}));

	return { tabs };
};

const mapDispatchToTabsProps = (dispatch) => ({
	onClick: (id) => {
		dispatch(openThread(id));
	},
});

const ThreadTabs = connect(
	mapStateToTabsProps,
	mapDispatchToTabsProps,
)(Tabs);

const MessageList = ({ messages, onClick }) => (
	<div className="thread-messages">
		{
			messages.map(m => (
				<p
					key={m.id}
					onClick={() => onClick(m.id)}
				>
					{m.text}
					<span className="metadata">{formatTime(m.timestamp)}</span>
				</p>
			))
		}
	</div>
);

const TextFieldSubmit = ({ onSubmit }) => {
	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!text) return;
		onSubmit(text);
		setText('');
	};

	const [text, setText] = useState('');
	return (
		<div className="text-field-submit">
			<form 
				onSubmit={handleSubmit}
			>
				<input
					type="text"
					value={text}
					onChange={handleChange}
				/>
				<input
					type="submit"
					value="Send"
				/>
			</form>
		</div>
	);
};

const Thread = ({ messages, onMessageClick, onTextFieldSubmit }) => (
	<div className="thread">
		<MessageList 
			messages={messages}
			onClick={onMessageClick}
		/>
		<TextFieldSubmit 
			onSubmit={onTextFieldSubmit}
		/>
	</div>
);

const mapStateToThreadProps = (state) => {
	const activeThread = state.threads.find(t => t.id === state.activeThreadId);
	return { 
		stateToThreadProps: {
			messages: activeThread.messages
		},
		activeThreadId: state.activeThreadId,
	};
};

const mapDispatchToThreadProps = (dispatch) => ({ dispatch });

const mergeThreadProps = (stateProps, dispatchProps) => ({
	...stateProps.stateToThreadProps,
	onMessageClick: (id) => {
		dispatchProps.dispatch(
			deleteMessage(stateProps.activeThreadId, id)
		);
	},
	onTextFieldSubmit: (text) => {
		dispatchProps.dispatch(
			addMessage(stateProps.activeThreadId, text)
		);
	},
});

const ThreadDisplay = connect(
	mapStateToThreadProps,
	mapDispatchToThreadProps,
	mergeThreadProps,
)(Thread);

const App = () => (
	<div className="chat">
		<div className="container">
			<ThreadTabs />
			<ThreadDisplay />
		</div>
	</div>
);

export default App;
















