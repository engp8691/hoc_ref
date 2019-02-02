import React, { Component } from "react";
import FancyButton from './FancyButton';
import TextInput from "./TextInput";

class App extends Component {
	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
	}

	focusInput = () => {
		console.log(12, this.inputRef.current);
		this.inputRef.current.focus();
	};

	render() {
		return (
			<React.Fragment>
				<TextInput ref={this.inputRef} />

				<FancyButton handleClick={this.focusInput} ref={this.inputRef} > Click Me </FancyButton>
			</React.Fragment>
		);
	}
}

export default App;

