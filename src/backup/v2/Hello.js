import React, { Component } from 'react';

function forwardRefHOC(WrappedComponent){
	class LogMessage extends Component{
		constructor(props) {
			super(props);
			this.state = { counter: 0 };
		}

		componentDidMount(){
			this.updateState();
		}

		componentDidUpdate(previousProps, previousState){
			console.log(7, previousState);
			console.log(8, previousProps);
		}

		updateState(){
			this.setState({counter: this.state.counter + 1});
		}

		render(){
			const {forwardedRef, ...rest} = this.props;

			return <WrappedComponent ref={forwardedRef} {...rest} />
		}
	}

	return React.forwardRef((props, ref) => {
		return (<LogMessage {...props} forwardedRef={ref} />);
	});
}

const RedButton = React.forwardRef((props, ref)=>{
	const {onClick} = props;

	const handleClick = () => { onClick(); }

	return (
		<button style={{backgroundColor: 'red', color: 'white'}} ref={ref} onClick={handleClick} >
			{props.children}
		</button>
	);
});

const TextInput = React.forwardRef((props, ref)=>{
	const {onChange} = props;

	return (
		<input ref={ref} onChange={onChange} />
	)
});

const HelloRedButton = forwardRefHOC(RedButton);
const FancyTextInput = forwardRefHOC(TextInput);

class Form extends Component{

	constructor(props){
		super(props);
		this.buttonRef = React.createRef();
		this.inputRef = React.createRef();
	}

	handleButtonClick(e){
		this.inputRef.current.focus();
		
		console.log(this.buttonRef.current);
	}

	handleChange(e){
		console.log(this.inputRef.current.value);
	}

	render(){
		return (
			<div className="MyForm">
				<FancyTextInput ref={this.inputRef} onChange={(e)=>this.handleChange(e)} />
				<HelloRedButton ref={this.buttonRef} onClick={this.handleButtonClick.bind(this)}>Click me! </HelloRedButton>
			</div>
		);
	}
}

export default Form;


