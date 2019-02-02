import React from "react";
import "./Validation.css";

function withValidation(WrappedComponent) {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				valid: "true",
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
			if (this.props.forcevalidate) {
				this.handleChange(false); 
			}
		}

		getValidation() {
			return {
				valid: this.el.checkValidity(),
				errorMessage: this.errorMessage()
			};
		}

		phoneFormat(input){
			input = input.replace(/\D/g,'');
			input = input.substring(0,10);

			var size = input.length;
			if(size === 0){
			}else if(size < 4){
				input = '('+input;
			}else if(size < 7){
				input = '('+input.substring(0,3)+') '+input.substring(3,6);
			}else{
				input = '('+input.substring(0,3)+') '+input.substring(3,6)+'-'+input.substring(6,10);
			}
			return input;
		}

		handleChange = event => {
			const { onChange } = this.props;  
			const validation = this.getValidation();
			this.el.setCustomValidity("");
      
			const updateField = (event) => {
				if (!event) return;

				const { target: { name, value } } = event;
				if(name === "telephone"){
					let cleaned = String(value).replace(/\D/g, '');
					var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
					if (match) {
						cleaned = '(' + match[1] + ') ' + match[2] + '-' + match[3]
						event.target.value = cleaned;
					}else{
						event.target.value = this.phoneFormat(cleaned);
					}
				}
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
			const { errorMessage } = this.state;

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
			forcevalidate: "true",
			fields: {}
		};
	}

	forceValidate = e => {
		this.setState({ forcevalidate: "true" });
	};

	handleChangeInForm = (name, value, validation) => {
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
			<h1>Validating a React Form using HTML5 Constraints</h1>
			<FieldWithValidation
				label="Required field"
				name="firstField"
				required
				customerrors={{ valueMissing: "Rellena el campo amigo" }}
				forcevalidate={this.state.forcevalidate}
				onChange={this.handleChangeInForm}
			/>
			<FieldWithValidation
				label="Email"
				name="secondField"
				required
				type="email"
				pattern="\S+@\S+\.\S+"
				customerrors={{ typeMismatch: "Eso no es un email" }}
				forcevalidate={this.state.forcevalidate}
				onChange={this.handleChangeInForm}
			/>
			<FieldWithValidation
				label="Minlength 3"
				name="thirdField"
				required
				type="text"
				minLength={3}
				forcevalidate={this.state.forcevalidate}
				onChange={this.handleChangeInForm}
			/>
			<FieldWithValidation
				label="Alphanumeric"
				name="fouthField"
				required
				type="text"
				pattern="[a-zA-Z0-9 ]+"
				customerrors={{ patternMismatch: "Por favor, inserta un sólo letras y números", valueMissing: "Este campo es justo y necesario" }}
				forcevalidate={this.state.forcevalidate}
				onChange={this.handleChangeInForm}
			/>
			<FieldWithValidation
				label="Telephone"
				name="telephone"
				required
				type="text"
				pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
				forcevalidate={this.state.forcevalidate}
				onChange={this.handleChangeInForm}
				customerrors={{ patternMismatch: "Please, type a telephone stupid!", valueMissing: "It's a must" }}          
			/>        
			<button onClick={this.forceValidate}>Validate Now!</button>
			</form>
		);
	}
}

export default ValidationForm;

