import React from "react";
import { useLocation } from "react-router-dom";
import Helmet from "react-helmet";

import "./NotFound.scss";

const NotFound = () => {    
    const location = useLocation();

    return (
        <main role="main" id="not-found">
            <Helmet>
                <title>404 Error</title>
            </Helmet>

            <h1>Resource Not Found</h1>
            <p>
                We couldn't find anything at located at <code>{location.pathname}</code>
            </p>

            <a href="/">Back to Blog</a>
        </main>
    );
};

export default NotFound;