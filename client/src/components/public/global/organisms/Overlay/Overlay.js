import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./Overlay.scss";

export default class Overlay extends Component {
    state = {
        active: false
    };

    toggle = () => {
        const { active } = this.state;
        this.setState({ active: !active });
    };

    render() {
        const { active } = this.state;
        
        return (
            <>
                <Link to="#menu" onClick={this.toggle}>
                    <FontAwesomeIcon icon={faBars}/>
                </Link>                

                { active ? (
                    <div id="overlay">
                        <Link to="#closeMenu" className="cancel" onClick={this.toggle}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </Link>

                        <nav role="navigation" id="overlay-content">
                            <Link to="/about" onClick={this.toggle}>About</Link>
                            <Link to="/team" onClick={this.toggle}>Team</Link>
                            <Link to="/blog" onClick={this.toggle}>Blog</Link>
                            <Link to="/contact" onClick={this.toggle}>Contact</Link>
                        </nav>
                    </div>
                    
                ):  <div styles={{display: "none"}}></div>}
            </>
        );
    }; 
};