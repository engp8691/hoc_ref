import React, { Component } from "react";
import WishMe from "./Greeting";
import Form from "./Hello";
import Calculator from "./Calculator";

class App extends Component {
	render() {
		return (
			<div>
			<Calculator />
			<br/>
			<br/>
			<WishMe />
			<Form />
			</div>
		);
	}
}

export default App;

