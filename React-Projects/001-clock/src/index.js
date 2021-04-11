import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component {
	constructor(props) {
  	super(props);

		this.state = {
	    time: (new Date()).toLocaleTimeString()
		};
	}

	componentDidMount() {
        this.timerID = setInterval(
	    () => this.tick(), 
	    1000
	);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
	    time: (new Date()).toLocaleTimeString()
	});
    }

    render() {
        return (
	    <div>
		{this.state.time}
	    </div>
	);
	}
}

ReactDOM.render(
	<Clock />,
	document.getElementById('root')
);
