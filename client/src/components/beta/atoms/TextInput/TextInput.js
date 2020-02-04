import React, { Component } from "react";
import Input from "reactstrap/input";

export class TextInput extends Component {
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
                type=""
                placeholder={placeholder}
                value={value}
                onChange={this.handleChange}
                { ...this.props.required ? (
                    required
                ): null}
            />
        );
    };
};