import React from 'react';

const nameHoC = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {name: ""};
        }

        componentDidMount() {
           this.setState({name: "Michael"});
        }

        render() {
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
            super(props);
            this.state = { message: "" };
        }

        componentDidMount() {
           this.setState({message: "Good Night"});
        }

        render() {
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
        const {name, message} = this.props;

        return(
            <div>
                <h1>Hello {name}! {message}</h1>
            </div>
        )
    }
}


const multiply = (x) => (y) => x * y;
const result = multiply(4)(5);

export default withWishesHoC(nameHoC(WishMe));


