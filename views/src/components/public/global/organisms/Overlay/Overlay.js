import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./Overlay.scss";

export default class Overlay extends Component {
    state = {
        active: false
    };

    toggle = () => {
        const { active } = this.state;
        
        this.setState({
            active: !active
        });
    };

    render() {
        const { active } = this.state;
        
        return (
            <>
                <a href="#menu" onClick={this.toggle}>
                    <FontAwesomeIcon icon={faBars}/>
                </a>                

                { active ? (
                    <div id="overlay">
                        <a href="#closeMenu" className="cancel" onClick={this.toggle}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </a>

                        <nav role="navigation" id="overlay-content">
                            <a href="/about" onClick={this.toggle}>About</a>
                            <a href="/team" onClick={this.toggle}>Team</a>
                            <a href="/blog" onClick={this.toggle}>Blog</a>
                            <a href="/contact" onClick={this.toggle}>Contact</a>
                        </nav>
                    </div>
                    
                ):  <div styles={{display: "none"}}></div>}
            </>
        );
    }; 
};