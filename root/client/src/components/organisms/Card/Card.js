import React, { Component } from "react";

import { Row, Col } from "reactstrap";

import "./Card.scss";

export default class Card extends Component {
    render() {
        return (
            <Row>
                <Col>
                    <div className="card">
                        <img src={this.props.src} className="headshot" alt={this.props.alt}/>
                        <div>
                            <h2>{this.props.person}</h2>
                            <h3>{this.props.title}</h3>
                            <p>
                                {this.props.description}
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    };
};
