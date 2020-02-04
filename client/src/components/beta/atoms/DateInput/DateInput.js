import React, { Component } from "react";
import { Input } from "reactstrap";

export default class DateInput extends Component {
    handleChange = e => {
        this.setState({
           [e.target.name]: e.target.value 
        });
    };

    render() {
        const { name, placeholder, value } = this.props;
        return (
            <Input
                name={name}
                type="date"
                placeholder={placeholder}
                value={value}
                onChange={this.handleChange}
            />
        );
    };
};