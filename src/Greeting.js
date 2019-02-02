import React from 'react';

const nameHoC = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
			console.log(6, "nameHoC", props);
            super(props);
            this.state = {name: ""};
        }

        componentDidMount() {
           this.setState({name: "Michael"});
        }

        render() {
console.log(16, "inner HOC render");
            const {name} = this.state;

            return(
                <div>
                    <WrappedComponent {...this.props} name={name}/>
                </div>
            )
        }
    }
};

const withWishesHoC = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
			console.log(30, "withWishesHoC", props);
            super(props);
            this.state = { message: "" };
        }

        componentDidMount() {
           this.setState({message: "Good Night"});
        }

        render() {
console.log(40, "outer HOC render");
            const { message } = this.state;
            return(
                <div>
                    <WrappedComponent {...this.props} message={message}/>
                </div>
            )
        }
    }
};

class WishMe extends React.Component {
    render() {
		console.log(54, this.props);
        const {name, message} = this.props;

        return(
            <div>
                <h1>Hello {name}! {message}</h1>
            </div>
        )
    }
}


// const multiply = (x) => (y) => x * y;
// const result = multiply(4)(5);

export default nameHoC(withWishesHoC(WishMe));
// export default withWishesHoC(nameHoC(WishMe));


