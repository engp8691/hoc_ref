import React, { Component } from "react";

function logProps(MyComponent) {
	class LogPropsComponent extends Component {
		constructor(props) {
			super(props);
			this.state = {title: "Cao bi De le"};
			console.log(8, this.state);
		}
		
		componentDidUpdate(prevProps) {
			console.log("before update", prevProps);
			console.log("after update", this.props);
		}

		handleChange(event) {
			console.log(16);
			this.setState({title: event.target.value})
        }

		render() {
			const {forwardRef, ...rest } = this.props;
			console.log(23, MyComponent);
			console.log(24, forwardRef);
			console.log(25, rest);

			return <MyComponent {...rest} ref={forwardRef} />;
		}
	}

	const forwardRefHoc = (props, ref) => {
		console.log(33, props);
		console.log(32, ref);
		return <LogPropsComponent forwardRef={ref} {...props} />;
	};

	// const name = MyComponent.displayName || MyComponent.name;
	// forwardRefHoc.displayName = `logProps(${name})`;
	return React.forwardRef(forwardRefHoc);
}

export default logProps;

