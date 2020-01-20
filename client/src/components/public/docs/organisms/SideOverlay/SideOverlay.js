import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./SideOverlay.scss";

export default class Overlay extends Component {
    state = {
        active: false
    };

    componentDidMount() {
        
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
                <a href="#sideMenu" className="hamburger" onClick={this.toggle}>
                    <FontAwesomeIcon icon={faBars}/>
                </a>   

                { active ? (
                    <div id="side-overlay">
                        <a onClick={this.toggle} href="#closeSideMenu" className="cancel">
                            <FontAwesomeIcon icon={faTimes}/>
                        </a>

                        <nav role="navigation" id="side-overlay-content">
                            <a href="/docs">What is Learnify?</a>
                            {/* <a href="/docs/api">Developers</a> */}
                            <a href="/docs/terms">Terms of Service</a>
                            <a href="/docs/privacy">Privacy Policy</a>
                            <a href="/docs/cookies">Cookie Policy</a>
                            <a href="/docs/sitemap">Sitemap</a>
                            <a href="/docs/changelog">Changelog</a>
                            <a href="/docs/status">System</a>
                        </nav>
                    </div>
                    
                ):  <div styles={{display: "none"}}></div>}
            </>
        );
    };
};

