import React from "react";
import { useLocation } from "react-router-dom";
import Helmet from "react-helmet";

import "./NotFound.scss";

const NotFound = () => {
    const location = useLocation();
    
    return (
        <>
            <Helmet>
                <title>404 Error</title>
            </Helmet>
            <main role="main">
                <h1>Resource Not Found</h1>
                <p>
                    We couldn't find anything located at <code>{location.pathname}</code>.
                </p>

                <a href="/">Back to {}</a>
            </main>
        </>
    );  
};

export default NotFound;