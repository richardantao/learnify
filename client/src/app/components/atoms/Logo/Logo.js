import React from "react";

export default ({ href, className, src, alt }) => { 
    return (
        <a href={href}>
            <img 
                src={src} 
                className={className}
                alt={alt}
            />
        </a> 
    );
};  