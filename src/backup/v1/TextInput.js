import React, { Component } from "react";

class TextInput extends Component {
	constructor(props) {
		super(props);
		this.state = {title: ""};
	}

	componentDidMount(){
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(13, prevProps, prevState);
	}

	handleChange(event) {
		this.setState({title: event.target.value})
	}

	render() {
		console.log(18, this.props.inputRef);

		// return (<input ref={this.props.inputRef} type="text" />);
		return (<input ref={this.props.inputRef} type="text" name="title" value={this.state.title} onChange={this.handleChange.bind(this)}/>);
	}
}

// export default logProps(TextInput);
export default TextInput;

