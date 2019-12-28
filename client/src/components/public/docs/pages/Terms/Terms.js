import React, { Component } from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import SideNav from "../../organisms/SideNav";
import Footer from "../../../global/organisms/Footer";

import "../../Docs.scss";

export default class Terms extends Component {
    state = {
        childHeight: 0
    };

    componentDidMount() {
        const childHeight = this.mainElement.clientHeight;

        this.setState({
            childHeight
        });
    };

    // fix inefficiency
    componentDidUpdate(prevProps, prevState) {
        // const { childHeight } = this.state;
        // if(childHeight !== prevState.childHeight) {
        //     this.setState({
        //         childHeight
        //     });
        // };

        setTimeout(() => {
            const childHeight = this.mainElement.clientHeight;

            this.setState({
                childHeight
            });
        }, 1000);
    };

    render() {
        const { childHeight } = this.state;

        return (
            <>
                <Helmet>
                    <title>Learnify | Terms of Service</title>
                </Helmet>
                <div id="public">
                    <Header/>
                    <SideNav siblingHeight={childHeight}/>
                    <main className="docs" role="main" ref={ (mainElement) => { this.mainElement = mainElement } }>
                        <h1>Terms of Service</h1>
                        <div>
                            <h3>1. Terms</h3>
                            <p>
                                By accessing the website at <a href="https://learnify.ca">https://learnify.ca</a> you are agreeing to be bound by these terms of
                                service, all applicable laws and regulations, and agree that you are responsible for compliance 
                                with any applicable local laws. If you do not agree with any of these terms, you are prohibited
                                from using or accessing this site. The materials contained in this website are protected by 
                                applicable copyright and trademark law.
                            </p>
                        </div>
                        <div>
                            <h3>2. Use License</h3>
                            <ol type="a">
                                <li>
                                    Permission is granted to temporarily download one copy of the materials (information or software) 
                                    on Learnify's website for personal, non-commercial transitory viewing only. This is the grant of a license, 
                                    not a transfer of title, and under this license you may not:
                                </li>
                                <ol type="i">
                                    <li>
                                        modify or copy the materials;
                                    </li>
                                    <li>
                                        use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
                                    </li>
                                    <li>
                                        attempt to decompile or reverse engineer any software contained on Learnify's website;
                                    </li>
                                    <li>
                                        remove any copyright or other proprietary notations from the materials; or
                                    </li>
                                    <li>
                                        transfer the materials to another person or "mirror" the materials on any other server.
                                    </li>
                                </ol>
                                <li>
                                    This license shall automatically terminate if you violate any of these restrictions and may be terminated 
                                    by Learnify at any time. Upon terminating your viewing of these materials or upon the termination of this license, 
                                    you must destroy any downloaded materials in your possession whether in electronic or printed format.
                                </li>
                            </ol>
                        </div>
                        <div>
                            <h3>3. Beta Program</h3>
                            <p>
                                Users registered in the Beta Program are susceptible to experience bugs, errors, and other problems. As a beta user and early adopter of Learnify, 
                                you have commited to reporting bugs, and providing meaningful feedback on the performance of the application to improve the future user experience for all users.
                            </p>
                            <p>
                                Users who are registered Beta Testers are eligible to receive special privileges, and must fullfill the requirements outlined in the Beta Agreement in order to
                                maintain their Beta Tester status, and the privileges associated with the program.
                            </p>
                        </div>
                        <div>
                            <h3>4. Disclaimer</h3>
                            <ol type="a">
                                <li>
                                    The materials on Learnify's website are provided on an 'as is' basis. Learnify makes no warranties, 
                                    expressed or implied, and hereby disclaims and negates all other warranties including, without 
                                    limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, 
                                    or non-infringement of intellectual property or other violation of rights.            
                                </li>
                                <li>
                                    Further, Learnify does not warrant or make any representations concerning the accuracy, likely results, 
                                    or reliability of the use of the materials on its website or otherwise relating to such materials or 
                                    on any sites linked to this site.
                                </li>
                            </ol>
                        </div>
                        <div>
                            <h3>5. Limitations</h3>
                            <p>
                                In no event shall Learnify or its suppliers be liable for any damages (including, without limitation, damages 
                                for loss of data or profit, or due to business interruption) arising out of the use or inability to use 
                                the materials on Learnify's website, even if Learnify or a Learnify authorized representative has been notified orally 
                                or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on 
                                implied warranties, or limitations of liability for consequential or incidental damages, these limitations 
                                may not apply to you.
                            </p>
                        </div>
                        <div>
                            <h3>6. Accuracy of Materials</h3>
                            <p>The materials appearing on Learnify's website could include technical, typographical, or photographic errors. 
                                Learnify does not warrant that any of the materials on its website are accurate, complete or current. Learnify may 
                                make changes to the materials contained on its website at any time without notice. However Learnify does not 
                                make any commitment to update the materials.
                            </p>
                        </div>
                        <div>
                            <h3>7. Links</h3>
                            <p>Learnify has not reviewed all of the sites linked to its website and is not responsible for the contents of any 
                                such linked site. The inclusion of any link does not imply endorsement by Learnify of the site. Use of any such 
                                linked website is at the user's own risk.
                            </p>
                        </div>
                        <div>
                            <h3>8. Modifications</h3>
                            <p>
                                Learnify may revise these terms of service for its website at any time without notice. By using this website you 
                                are agreeing to be bound by the then current version of these terms of service.
                            </p>
                        </div>
                        <div>
                            <h3>9. Governing Law</h3>
                            <p>
                                These terms and conditions are governed by and construed in accordance with the laws of Canada and you irrevocably submit 
                                to the exclusive jurisdiction of the courts in that province/state or location.
                            </p>
                        </div>
                    </main>
                    <Footer/>
                </div>
            </>
        );
    };
};  