import React from "react";
import Input from "reactstrap/input";

export default ({ name, placeholder, value, rows, cols }) => {
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