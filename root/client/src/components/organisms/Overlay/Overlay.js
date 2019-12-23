import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./Overlay.scss";

class Overlay extends Component {
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
        
        return(
            <Fragment>
                <a href="#menu" onClick={this.toggle}>
                    <FontAwesomeIcon icon={faBars}/>
                </a>                

                { active ? (
                    <div className="overlay">
                        <a onClick={this.toggle} href="#" className="cancel">
                            <FontAwesomeIcon icon={faTimes}/>
                        </a>

                        <nav role="navigation" className="overlay-content">
                            <a href="/about" onClick={this.toggle}>About</a>
                            <a href="https://team.learnify.ca/" onClick={this.toggle}>Team</a>
                            <a href="https://blog.learnify.ca/" onClick={this.toggle}>Blog</a>
                            <a href="/contact" onClick={this.toggle}>Contact</a>
                        </nav>
                    </div>
                    
                ):  <div styles={{display: "none"}}></div>}
            </Fragment>
            
        );
    }; 
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);