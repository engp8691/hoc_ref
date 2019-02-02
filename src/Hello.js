import React from "react";

const forwardRefHOC = (WrappedComponent) => {
	class LogMessage extends React.Component {
		constructor(props) {
			console.log(6, props);
			super();
			this.state = {
				counter: 0
			};
		}

		componentDidMount() {
			this.updateState();
		}

		updateState(){
			this.setState({counter: this.state.counter + 1});
		}

		componentDidUpdate(previousProps, previousState){
			console.log(21, previousState, previousProps);
		}

		handleChange = event => {
			const { onChange } = this.props;  
			const { target: { name, value } } = event;

			this.updateState();
			console.log(29, onChange);
			onChange(name, value);
		}

		render() {
			const {forwardedRef, ...rest} = this.props;
			// Here this onChange is defined again. It is for this class factory
			return <WrappedComponent ref={forwardedRef} {...rest} onChange={this.handleChange} />
		}
	};

	// Here it applies React.forwardRef so that both props and ref in the component can be passed on
	return React.forwardRef((props, ref) => {
		// This runs first, it is using the props from construction of the function component of forwardRefHOC
		console.log(42, props);

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

// const InputField = (props)=>{
const InputField = React.forwardRef((props, ref)=>{
	const {label, name, ...rest } = props;
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input id={name} name={name} ref={ref} {...rest} />
		</div>
	);
});

const FieldWithValidation = forwardRefHOC(InputField);
const HelloRedButton = forwardRefHOC(RedButton);

class Form extends React.Component {
	constructor() {
		super();
		this.inputRef = React.createRef();
		this.buttonRef = React.createRef();

		this.state = {
			counter: 0
		};
	}

	handleChangeInForm = (name, value) => {
		console.log(69, name, value);
		console.log(70, this.inputRef.current.value);
	};

    handleButtonClick(e){
        this.inputRef.current.focus();
    }


	render() {
		// the ref is not a property, it cannot be passed in the props object.
		// But React.forwardRef can pass both the props and ref on to the function object
		return (
			<div>
			<FieldWithValidation
				ref={this.inputRef}
				name="firstField"
				label="Please type in:"
				onChange={this.handleChangeInForm}
			/>

			<HelloRedButton ref={this.buttonRef} onClick={this.handleButtonClick.bind(this)}>Click to focus! </HelloRedButton>
			</div>
		);
	}
}

export default Form;

