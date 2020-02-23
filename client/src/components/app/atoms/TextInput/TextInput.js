import React from "react";
import Input from "reactstrap/input";

export default ({ name, placeholder, value }) => {
    return (
        <Input
            name={name}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={this.handleChange}
            { ...this.props.required ? (
                required
            ): null}
        />
    );
};