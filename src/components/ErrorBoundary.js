import React, { Component } from 'react';

/* With this component we want to wrap other components such as the
CardList component and if it fails we can catch it in the ErrorBoundary. */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true })
    }

    render() {
        if (this.state.hasError) {
            return <h1>Oooops! That is not good.</h1>
        }
        return this.props.children
    }
}

export default ErrorBoundary;