import React, { Component } from "react";
import { Link } from "react-router-dom";

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
                <Link to="#sideMenu" className="hamburger" onClick={this.toggle}>
                    <FontAwesomeIcon icon={faBars}/>
                </Link>   

                { active ? (
                    <div id="side-overlay">
                        <Link onClick={this.toggle} to="#closeSideMenu" className="cancel">
                            <FontAwesomeIcon icon={faTimes}/>
                        </Link>

                        <nav role="navigation" id="side-overlay-content">
                            <Link to="/docs">What is Learnify?</Link>
                            {/* <Link to="/docs/Linkpi">Developers</Link> */}
                            <Link to="/docs/terms">Terms of Service</Link>
                            <Link to="/docs/privacy">Privacy Policy</Link>
                            <Link to="/docs/cookies">Cookie Policy</Link>
                            <Link to="/docs/sitemap">Sitemap</Link>
                            <Link to="/docs/changelog">Changelog</Link>
                            <Link to="/docs/status">System</Link>
                        </nav>
                    </div>
                    
                ):  <div styles={{display: "none"}}></div>}
            </>
        );
    };
};

