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
			console.log(36, event.target.value);

			const { onChange } = this.props;  
			const validation = this.getValidation();
			this.el.setCustomValidity("");
      
			const updateField = (event) => {
				if (!event) return;

				const { target: { name, value } } = event;
				// It will not run line 109
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
			forceValidate: "true",
			fields: {}
		};
	}

	forceValidate = e => {
		console.log('WTF');
		this.setState({ forceValidate: "true" });
	};

	handleChangeInForm = (name, value, validation) => {
		console.log(109, name, value, validation);

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
				name="firstField"
				label="Required field"
				required
				customerrors={{ valueMissing: "Rellena el campo amigo" }}
				forcevalidate={this.state.forceValidate}
				onChange={this.handleChangeInForm}
			/>
			<button onClick={this.forceValidate}>Validate Now!</button>
			</form>
		);
	}
}

export default ValidationForm;

