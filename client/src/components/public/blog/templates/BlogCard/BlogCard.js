import React from "react";

import "./BlogCard.scss";

const BlogCard = ({ src, alt, href, title, date, text }) => {
    return (
        <div className="card">
            <img src={src} className="thumbnail" type="image/jpeg" alt={alt}/>
            <div>
                <h2>
                    <a href={href}>{title}</a>
                </h2>
                <h4>{date}</h4>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default BlogCard;