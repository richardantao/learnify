import React from "react";
import Select from "react-select";

export default ({ value, placeholder, noOptionsMessage, options, className }) => {
    return ( 
        <Select 
            value={value}  
            placeholder={placeholder}
            noOptionsMessage={noOptionsMessage} 
            options={options}
            className={className}
        />
    );
};  