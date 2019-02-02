import React, { Component } from "react";

function logProps(WrappedComponent) {
  class LogProps extends Component {
  	state = {
      searchTerm: ''
    }

    componentDidUpdate(prevProps) {
      console.log("before update", prevProps);
      console.log("after update", this.props);
    }

	handleSearch = event => {
		console.log(15, event);

      this.setState({ searchTerm: event.target.value })
    }

    render() {
      const { forwardRef, ...rest } = this.props;
	  console.log(12, forwardRef);
	  console.log(13, forwardRef.current);
	  console.log(14, WrappedComponent);
      return <WrappedComponent onChange={this.handleSearch} {...rest} ref={forwardRef} />;
    }
  }

  const forwardRef = (props, ref) => {
    return <LogProps forwardRef={ref} {...props} />;
  };

  const name = WrappedComponent.displayName || WrappedComponent.name;
  forwardRef.displayName = `logProps(${name})`;

  return React.forwardRef(forwardRef);
}

export default logProps;

