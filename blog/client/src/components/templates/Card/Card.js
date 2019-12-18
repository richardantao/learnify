import React, { Component } from "react";

import "./Card.scss";

export default class Card extends Component {
    render() {
        return (
            <div className="card">
                <img src={this.props.src} className="blog-thumbnail" type="image/jpeg" alt={this.props.alt}/>
                <div>
                    <h2><a href={this.props.href}>{this.props.title}</a></h2>
                    <h4>{this.props.date}</h4>
                    <p>{this.props.text}</p>
                </div>
            </div>
        );
    };
};