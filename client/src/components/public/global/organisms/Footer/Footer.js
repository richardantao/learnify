import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn/*, faTwitter*/ } from "@fortawesome/free-brands-svg-icons";

import "./Footer.scss";

const Footer = props => {
    return (
        <footer className="footer" role="contentinfo">
            <div className="footer-internal">
                <div>
                    <h3>Learnify</h3>
                    <p>Building the Foundations for Student Success.</p>
                </div>
                <div>
                    <h5>Company</h5>
                    <a href="/about">About Us</a>
                    <a href="/team">Team</a>
                    <a href="/blog">Blog</a>
                    <a href="/contact">Contact Us</a>
                </div>
                <div>
                    <h5>Explore</h5>
                    <a href="/docs">What is Learnify?</a>
                    <a href="/docs#why">Why use Learnify?</a>
                    {/* <a href="/docs/developers">Developers</a> */}
                </div>
                <div>
                    <h5>Resources</h5>
                    <a href="/docs/terms">Terms of Service</a>
                    <a href="/docs/privacy">Privacy Policy</a>
                    <a href="/docs/cookies">Cookie Policy</a>
                    <a href="/docs/sitemap">Sitemap</a>
                </div>
                <div>
                    <h5>System</h5>
                    <a href="/docs/changelog">Changelog</a>
                    <a href="/docs/status">System Status</a>
                </div>
            </div>
            <div className="footer-public">
                <div className="copyright">
                    <p>Copyright <i className="far fa-copyright"></i> {year} Learnify. All rights reserved.</p>
                </div>
                <div>
                    <a href="https://www.facebook.com/learnify.ca/" class="social" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebookF}/>
                    </a>
                    <a href="https://www.linkedin.com/company/learnify" class="social" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedinIn}/>
                    </a>
                    <a href="https://www.instagram.com/learnify.ca" class="social" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram}/>
                    </a>
                    {/* <a href="https://twitter.com/learnify_ca" class="social" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter}/>
                    </a> */}
                </div>
            </div>
        </footer>
    );
};        

const year = new Date().getFullYear();

export default Footer;