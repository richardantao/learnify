import React, { Component } from "react";
import { ModalHeader } from "reactstrap";

export default class ModalHeader extends Component {
    state = {
        
    };
    
    toggle = () => {
        this.setState({

        });
    }; 
    
    render() {
        return <ModalHeader toggle={this.toggle}>{props.text}</ModalHeader>
    };
}