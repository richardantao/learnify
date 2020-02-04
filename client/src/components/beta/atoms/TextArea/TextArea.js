import React, { Component } from "react";
import Input from "reactstrap/input";

export default class TextArea extends Component {
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const { name, placeholder, value, rows, cols } = this.props;

        return (
            <Input
                name={name}
                type="textarea"
                placeholder={placeholder}
                value={value}
                onChange={this.handleChange}
                rows={rows}
                cols={cols}
            />
        );
    };
};