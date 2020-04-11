import React from "react";

/* -- Atoms -- */
import Empty from "../../atoms/Empty";

/* -- Organisms -- */
import ListHeader from "../../molecules/ListHeader";
import ListBody from "../../molecules/ListBody";

import "./List.scss";

export default ({ header, action, data, empty, needHeader }) => {
    return (
        <>
            { needHeader ? 
                <>
                    <ListHeader header={header} action={action} />
                    <hr/>
                    <ListBody data={ data ? data : <Empty empty={empty}/>} />
                </>
            : <ListBody data={ data ? data : <Empty empty={empty}/>} />
            }            
        </>
    );
};