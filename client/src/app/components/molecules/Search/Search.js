import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Form, Input, Button, Row, Col } from "reactstrap"; 

class Search extends Component {
    state = {
        input: ""
    };

    static propTypes = {
        error: PropTypes.object.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });  
            };
        };
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { input } = this.state;
        const { } = this.props;
        
        
    };

    render() {
        const { input } = this.state;

        return (
            <>
                <Form onSubmit={this.handleSubmit} id="search" inline>
                    <Input
                        name="input"
                        type="text"
                        value={input}
                        onChange={this.handleChange}
                        placeholder="Search.."
                    />
                
                    <Button type="submit" className="search-submit">
                        Search
                    </Button>     
                </Form>
            </>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = {  };

export default connect(mapStateToProps, mapDispatchToProps)(Search);