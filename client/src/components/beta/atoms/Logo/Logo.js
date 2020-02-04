import React from "react";

const Logo = props => {
    return (
        <a href={props.href}>
            <img src={props.src} alt={props.alt}/>
        </a>
    );
};  

export default Logo;