import React, { Component } from "react";

import "./TeamCard.scss";

export default class TeamCard extends Component {
    render() {
        const { src, alt, person, title, description } = this.props;

        return (
            <div className="card">
                <img src={src} className="headshot" type="image/jpeg" alt={alt}/>
                <div>
                    <h2>{person}</h2>
                    <h4>{title}</h4>
                    <p>{description}</p>
                </div>
            </div>
        );
    };
};