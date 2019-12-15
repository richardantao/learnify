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
                    {/* <div>
                        <h5>Company</h5>
                        <a href="/about">About Us</a>
                        <a href="/blog">Blog</a>
                        <a href="/contact">Contact Us</a>
                        <a href="https://careers.learnify.ca">Join the Team</a>
                    </div>
                    <div>
                        <h5>Documentation</h5>
                        <a href="https://docs.learnify.ca/what">What is Learnify?</a>
                        <a href="https://docs.learnify.ca/what#why">Why use Learnify?</a>
                    </div>
                    <div>
                        <h5>Resources</h5>
                        <a href="https://docs.learnify.ca/terms">Terms of Service</a>
                        <a href="https://docs.learnify.ca/privacy">Privacy Policy</a>
                        <a href="https://docs.learnify.ca/cookies">Cookie Policy</a>
                    </div>
                    <div>
                        <h5>System</h5>
                        <a href="https://docs.learnify.ca/changelog">Changelog</a>
                        <a href="https://docs.learnify.ca/status">System Status</a>
                    </div> */}
            </div>
            <div id="footer-public">
                <div id="copyright">
                    <p>Copyright <i class='far fa-copyright'></i> {year} Learnify. All rights reserved.</p>
                </div>
                <div>
                    <a href="https://facebook.com" class="social" target="_blank"><i class="fab fa-facebook"></i></a>
                    <a href="https://www.linkedin.com/company/learnify" class="social" target="_blank"><i class="fab fa-linkedin"></i></a>
                    <a href="https://www.instagram.com/learnify.ca" class="social" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://twitter.com/learnify_ca" class="social" target="_blank"><i class="fab fa-twitter-square"></i></a>
                </div>
            </div>
        </footer>
        );
    }
};

const year = new Date().getFullYear();

