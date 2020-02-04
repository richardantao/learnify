import React, { Component } from "react";
import { Input } from "reactstrap";

export default class Select extends Component {
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    
    render() {
        const { name, placeholder, value, options } = this.props;

        return (
            <Input
                name={name}
                type="select"
                placeholder={placeholder}
                value={value}
                onChange={this.handleChange}
            >
                {options.map(option => {
                    <option>
                        {option}
                    </option>
                })}
            </Input>
        );
    };  
};