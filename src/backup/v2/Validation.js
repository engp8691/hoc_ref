import React from "react";
import "./Validation.css";

function withValidation(WrappedComponent) {
	return class extends React.Component {
		constructor() {
			super();
			this.state = {
				valid: true,
				errorMessage: ""
			};
		}

		componentDidMount() {
			this.el.addEventListener("invalid", event => {
				event.preventDefault();
			})
		}

		componentWillReceiveProps(props) {
			console.log(props);
			if (this.props.forceValidate) {
				this.handleChange(false); 
			}
		}

		getValidation() {
			return {
				valid: this.el.checkValidity(),
				errorMessage: this.errorMessage()
			};
		}

		handleChange = event => {
			console.log(35, event.target);
			const { onChange } = this.props;  
			const validation = this.getValidation();
			this.el.setCustomValidity("");
      
			const updateField = (event) => {
				if (!event) return;

				const { target: { name, value } } = event;
				onChange(name, value, validation);
			}

			this.setState(validation, updateField(event));
		}

		errorMessage() {
			const { customErrors } = this.props;
			const validationState = this.el.validity;

			if (customErrors) {
				for (let key in customErrors) {
					if (validationState[key]) {
						this.el.setCustomValidity(customErrors[key]);
					}
				}
			}

			return this.el.validationMessage;
		}

		render() {
			const { errorMessage, valid } = this.state;

			return (
				<div className="FormFieldWithValidation">
					<WrappedComponent
						{...this.props}
						className={!this.state.valid ? "error" : ""}
						onChange={this.handleChange}
						inputRef={el => { this.el = el; }}
					/>
					{errorMessage && <p>{errorMessage}</p>}
				</div>
			);
		}
	};
}

function FormField({ inputRef, label, name, ...rest }) {
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input id={name} name={name} ref={inputRef} {...rest} />
		</div>
	);
}

const FieldWithValidation = withValidation(FormField);

class ValidationForm extends React.Component {
	constructor() {
		super();
		this.state = {
			forceValidate: true,
			fields: {}
		};
	}

	forceValidate = e => {
		console.log('WTF');
		this.setState({ forceValidate: true });
	};

	handleChangeInForm = (name, value, validation) => {
		console.log(109, name, value);
		this.setState(
			{
				fields: {
					...this.state.fields,
					[name]: { value, validation }
				}
			},
			() => console.log(this.state)
		);
	};

	render() {
		return (
			<form onSubmit={e => { e.preventDefault(); }} >
			<h1>Validating a React Form using HTML5 Constraint Validation API</h1>
			<FieldWithValidation
				label="Required field"
				name="firstField"
				required
				customErrors={{ valueMissing: "Rellena el campo amigo" }}
				forceValidate={this.state.forceValidate}
				onChange={this.handleChangeInForm}
			/>
			<FieldWithValidation
				label="Email"
				name="secondField"
				required
				type="email"
				customErrors={{ typeMismatch: "Eso no es un email" }}
				forceValidate={this.state.forceValidate}
				onChange={this.handleChangeInForm}
			/>
			<FieldWithValidation
				label="Minlength 3"
				name="thirdField"
				required
				type="text"
				minLength={3}
				forceValidate={this.state.forceValidate}
				onChange={this.handleChangeInForm}
			/>
			<FieldWithValidation
				label="Alphanumeric"
				name="fouthField"
				required
				type="text"
				pattern="[a-zA-Z0-9 ]+"
				customErrors={{ patternMismatch: "Por favor, inserta un sólo letras y números", valueMissing: "Este campo es justo y necesario" }}
				forceValidate={this.state.forceValidate}
				onChange={this.handleChangeInForm}
			/>
			<FieldWithValidation
				label="Telephone"
				name="fithField"
				required
				type="text"
				pattern="([\d|\(][\h|\(\d{3}\)|\.|\-|\d]{4,}\d)"
				forceValidate={this.state.forceValidate}
				onChange={this.handleChangeInForm}
				customErrors={{ patternMismatch: "Please, type a telephone stupid!", valueMissing: "It's a must" }}          
			/>        
			<button onClick={this.forceValidate}>Validate Now!</button>
			</form>
		);
	}
}

export default ValidationForm;

