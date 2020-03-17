import React from "react";
import Helmet from "react-helmet";

import { Row, Col } from "reactstrap";


import AppNav from "../../organisms/AppNav";
import AuthNav from "../../organisms/AuthNav";

export default ({ title, id, page }) => {
    return (
        <>
            <Helmet>
                <meta name="description" content=""/>
                <meta name="keywords" content=""/>
                <title>Learnify | {title}</title>
            </Helmet>
            <Row>
                <Col
                    xs="1"
                    sm="1"
                    md="1"
                    lg="1"  
                    xl="1"
                >   
                    <AppNav/>
                </Col>
                <Col
                    id={id}
                    xs="11"
                    sm="11"
                    md="11"
                    lg="11"
                    xl="11"
                >
                    <AuthNav/>
                    {page}
                </Col>
            </Row>
        </>
    );
};      