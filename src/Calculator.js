import React from 'react';

const scaleNames = {
	c: 'Celsius',
	f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
	return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p>The water would boil.</p>;
	}
	return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
	constructor(props) {
		super(props);
		const {scale} = props;
		this.scale = scale;
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		console.log(42, e.target.value, this.scale);
		this.props.onTemperatureChange(e.target.value, this.scale);
	}

	render() {
		const temperature = this.props.temperature;
		const scale = this.props.scale;

		return (
			<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}:</legend>
				<input value={temperature} onChange={this.handleChange} />
			</fieldset>
		);
	}
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		// It is better to bind the event handlers here but 
		// not using arrow function in component instancing
		this.handleTemperatureChange = this.handleTemperatureChange.bind(this);
		this.state = {temperature: '', scale: 'c'};
	}

	handleTemperatureChange(temperature, scale){
		temperature = isNaN(temperature) ? String(temperature).replace(/\D/g,'') : temperature;
		this.setState({scale, temperature});
	}

	render() {
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
		const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

		return (
			<div>
				<TemperatureInput scale="c" temperature={celsius}    onTemperatureChange={this.handleTemperatureChange} />
				<TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleTemperatureChange} />

				<BoilingVerdict celsius={parseFloat(celsius)} />
			</div>
		);
	}
}

export default Calculator;


