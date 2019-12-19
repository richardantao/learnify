import React, { Component } from "react";

import "./Footer.scss";

export default class Footer extends Component {
    render() {
        return (
            <footer class="container-fluid" role="contentinfo">
                <div id="footer-internal">
                    <div>
                        <h3>Learnify</h3>
                        <p>Building the Foundations for Student Success.</p>
                    </div>
                    <div>
                        <h5>Company</h5>
                        <a href="https://learnify.ca/about">About Us</a>
                        <a href="https://team.learnify.ca/">Team</a>
                        <a href="https://blog.learnify.ca/">Blog</a>
                        <a href="https://learnify.ca/contact">Contact Us</a>
                    </div>
                    <div>
                        <h5>Explore</h5>
                        <a href="/">What is Learnify?</a>
                        <a href="/#why">Why use Learnify?</a>
                        <a href="/api">Developers</a>
                    </div>
                    <div>
                        <h5>Resources</h5>
                        <a href="/terms">Terms of Service</a>
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/cookies">Cookie Policy</a>
                        <a href="/sitemap">Sitemap</a>
                    </div>
                    <div>
                        <h5>System</h5>
                        <a href="/changelog">Changelog</a>
                        {/* <a href="/status">System Status</a> */}
                    </div>
                </div>
                <div id="footer-public">
                    <div id="copyright">
                        <p>Copyright <i className="far fa-copyright"></i> {year} Learnify. All rights reserved.</p>
                    </div>
                    <div>
                        <a href="https://facebook.com" class="social" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                        <a href="https://www.linkedin.com/company/learnify" className="social" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                        <a href="https://www.instagram.com/learnify.ca" className="social" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                        <a href="https://twitter.com/learnify_ca" className="social" target="_blank" rel="noopener noreferrer"><i classNameName="fab fa-twitter-square"></i></a>
                    </div>
                </div>
            </footer>
        );
    };
};        

const year = new Date().getFullYear();
