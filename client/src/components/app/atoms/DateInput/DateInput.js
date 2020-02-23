import React from "react";
import { Input } from "reactstrap";

export default ({ name, placeholder, value }) => {
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