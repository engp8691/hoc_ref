import React, { Component } from "react";
import logProps from "./logProps";

class FancyButton extends Component {
	render() {
		return (<button className="FancyButton" onClick={this.props.handleClick}> {this.props.children} </button>);
	}
}

export default logProps(FancyButton);
