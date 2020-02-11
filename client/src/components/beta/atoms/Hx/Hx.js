import React from "react";

export default ({ level, title }) => { 
    return (
        <>
            {  level === 1 ? (
                <h1>{title}</h1> 
            ): level === 2 ? (
                <h2>{title}</h2>
            ): level === 3 ? (
                <h3>{title}</h3>
            ): level === 4 ? (
                <h4>{title}</h4> 
            ): level === 5 ? (
                <h5>{title}</h5> 
            ):  <h6>{title}</h6> 
            }
        </>
    );
};