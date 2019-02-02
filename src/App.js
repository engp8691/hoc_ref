import React, { Component } from "react";
import AnyVarNameWishMe from "./Greeting";
import Form from "./Hello";
import Calculator from "./Calculator";
import LocationSearch from "./Location";
import ValidationForm from "./Validation";
import FileUpload from "./FileUpload";

class App extends Component {
	render() {
		return (
			<div>
			<Calculator />
			<br/>
			<br/>
			<AnyVarNameWishMe p1="hello" p2="world" />
			<Form />

			<br/>
			<br/>
			<LocationSearch />
			<br/>
			<br/>
			<ValidationForm />
			<br/>
			<br/>
			<FileUpload />
			</div>
		);
	}
}

export default App;

