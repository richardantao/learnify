import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn/*, faTwitter*/ } from "@fortawesome/free-brands-svg-icons";

import "./Footer.scss";

export default () => {
    return (
        <footer className="footer" role="contentinfo">
            <div className="footer-internal">
                <div>
                    <h3>Learnify</h3>
                    <p>Building the Foundations for Student Success.</p>
                </div>
                <div>
                    <h5>Company</h5>
                    <Link to="/about" className="btn">About Us</Link>
                    <Link to="/team" className="btn">Team</Link>
                    <Link to="/blog" className="btn">Blog</Link>
                    <Link to="/contact" className="btn">Contact Us</Link>
                </div>
                <div>
                    <h5>Explore</h5>
                    <Link to="/docs">What is Learnify?</Link>
                    <Link to="/docs#why">Why use Learnify?</Link>
                    {/* <Link to="/docs/developers">Developers</Link> */}
                </div>
                <div>
                    <h5>Resources</h5>
                    <Link to="/docs/terms">Terms of Service</Link>
                    <Link to="/docs/privacy">Privacy Policy</Link>
                    <Link to="/docs/cookies">Cookie Policy</Link>
                    <Link to="/docs/sitemap">Sitemap</Link>
                </div>
                <div>
                    <h5>System</h5>
                    <Link to="/docs/changelog">Changelog</Link>
                    <Link to="/docs/status">System Status</Link>
                </div>
            </div>
            <div className="footer-public">
                <div className="copyright">
                    <p>Copyright <i className="far fa-copyright"></i> {year} Learnify. All rights reserved.</p>
                </div>
                <div>
                    <Link to="https://www.facebook.com/learnify.ca/" class="social" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebookF}/>
                    </Link>
                    <Link to="https://www.linkedin.com/company/learnify" class="social" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedinIn}/>
                    </Link>
                    <Link to="https://www.instagram.com/learnify.ca" class="social" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram}/>
                    </Link>
                    {/* <Link to="https://twitter.com/learnify_ca" class="social" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter}/>
                    </Link> */}
                </div>
            </div>
        </footer>
    );
};        

const year = new Date().getFullYear();