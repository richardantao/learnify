import React from "react";

const Hx = props => { 
    return (
        <>
            {  props.level === 1 ? (
                <h1>{props.title}</h1> 
            ): props.level === 2 ? (
                <h2>{props.title}</h2>
            ): props.level === 3 ? (
                <h3>{props.title}</h3>
            ): props.level === 4 ? (
                <h4>{props.title}</h4> 
            ): props.level === 5 ? (
                <h5>{props.title}</h5> 
            ):  <h6>{props.title}</h6> 
            }
        </>
    );
};

export default Hx; 