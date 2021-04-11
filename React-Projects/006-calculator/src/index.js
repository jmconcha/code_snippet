import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const KeyButton = (props) => {
	const button = props.button;

	return (
		<button 
			className={button.className}
			onClick={props.onClick}
		>
			{button.value}
		</button>
	);
};

const EquationBar = (props) => {
	return (
		<form 
			className="equation-form"
			onSubmit={props.onSubmit}
		>
			<input 
				type="text"
				className="equation-text"
				value={props.equationText}
				onChange={props.onChange}
			/>
		</form>
	);
};

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			equationText: '',
		};

		this.handleEquationTextChange = this.handleEquationTextChange.bind(this);
		this.handleEquationTextSubmit = this.handleEquationTextSubmit.bind(this);
		this.handleEqualButtonClick = this.handleEqualButtonClick.bind(this);
	}

	handleEquationTextChange(e) {
		const target = e.target;
		let equationText = target.type === 'text' ? 
			target.value : 
			this.state.equationText + target.textContent;

		/*const filteredEquationText = filterEquation(equationText);

		this.setState({ equationText: filteredEquationText });*/

		this.setState({ equationText });
	}

	handleEquationTextSubmit(e) {
		if (Number(this.state.equationText) === 0) {
			return;
		}

		this.setState((prevState) => {
			const equationText = prevState.equationText.replace(/×/g, '*').replace(/÷/g, '/');
			const equationResult = Math.round(
					eval(equationText) * 1000000
			) / 1000000;
			
			return { equationText: equationResult.toString() };
		});

		if (e) {
			e.preventDefault();
		}
	}

	handleEqualButtonClick(e) {
		switch (e.target.textContent) {
			case 'AC':
				this.setState({
					equationText: ''
				});
				break;
			case 'CE':
				this.setState((prevState) => {
					const equationText = prevState.equationText.slice(0, -1);

					return { equationText };
				});
				break;
			case '%':
				if (Number(this.state.equationText) === 0) {
					return;
				}

				this.setState((prevState) => (
					{ equationText: String(prevState.equationText / 100) }
				));
				break;
			case '=':
					this.handleEquationTextSubmit();
					break;
			default:
				this.handleEquationTextChange(e);
		}
	}

	render() {
		const keyButtons = this.props.buttons.map((button, i) => 
			<KeyButton 
				key={button.value} 
				button={button}
				onClick={this.handleEqualButtonClick}
			/>
		);

		return (
			<div className="calculator">
				<EquationBar 
					equationText={this.state.equationText} 
					onChange={this.handleEquationTextChange}
					onSubmit={this.handleEquationTextSubmit}
				/>
				{keyButtons}
			</div>
		);
	}
}

/*function filterEquation(equation) {
	if (equation === '' || equation.length === 1) {
		return equation;
	}

  const firstDigitIndex = equation.search(/[0-9]/);
  let firstOperator = '';
  
  if (firstDigitIndex > 0) {
    firstOperator = equation[firstDigitIndex - 1];
    equation = equation.substring(firstDigitIndex);
  }

  const nums = equation.split(/[^0-9]/).filter((num) => Boolean(num));
  const operators = equation.split(/[0-9]/).filter((oprtr) => Boolean(oprtr));
  let parsedEquation = '';
  let i;
	let length = nums.length - 1;
  
  for (i = 0; i < length; i++) {
    parsedEquation += nums[i] + operators[i];
  }

  return firstOperator + parsedEquation + nums[i];
}*/

const BUTTONS = [
	{className: 'btn operator', value: 'AC'},
	{className: 'btn operator', value: 'CE'},
	{className: 'btn operator', value: '%'},
	{className: 'btn operator', value: '÷'},
	{className: 'btn digit', value: '7'},
	{className: 'btn digit', value: '8'},
	{className: 'btn digit', value: '9'},
	{className: 'btn operator', value: '×'},
	{className: 'btn digit', value: '4'},
	{className: 'btn digit', value: '5'},
	{className: 'btn digit', value: '6'},
	{className: 'btn operator', value: '+'},
	{className: 'btn digit', value: '1'},
	{className: 'btn digit', value: '2'},
	{className: 'btn digit', value: '3'},
	{className: 'btn operator', value: '-'},
	{className: 'btn digit', value: '0'},
	{className: 'btn dot', value: '.'},
	{className: 'btn btn-equals operator', value: '='},
]

ReactDOM.render(
	<Calculator buttons={BUTTONS} />,
	document.getElementById('root')
);
