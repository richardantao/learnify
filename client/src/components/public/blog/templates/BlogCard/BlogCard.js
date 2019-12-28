import React, { Component } from "react";

import "./BlogCard.scss";

export default class BlogCard extends Component {
    render() {
        const { src, alt, href, title, date, text } = this.props;

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
};