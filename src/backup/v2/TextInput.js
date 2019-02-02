import React, { Component } from "react";
import logProps from "./logProps";

class TextInput extends Component {
	setInputRef(input){
		this.inputRef = input;
	}
  render() {
    return <input ref={this.setInputRef.bind(this)} />;
  }
}

export default logProps(TextInput);
