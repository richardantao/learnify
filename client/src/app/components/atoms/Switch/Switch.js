import React, { useState, Component } from "react";
import { ButtonGroup, Button } from "reactstrap";

export default ({ priRef, priTxt, secRef, secTxt, className }) => {
    const [showDefault, toggleSwitch ] = useState(false);

    const globalStateHandler = () => {

    };

    return (
        <ButtonGroup className={className}>
            { showDefault ? 
                <>
                    <Button href={priRef} className="active-switch" onClick={() => toggleSwitch(true)}>
                        {priTxt}
                    </Button>
                    <Button href={secRef} onClick={() => toggleSwitch(false)}>
                        {secTxt}
                    </Button>
                </>
                : 
                <>
                    <Button href={priRef} onClick={() => toggleSwitch(true)}>
                        {priTxt}
                    </Button>
                    <Button href={secRef} className="active-switch" onClick={() => toggleSwitch(false)}>
                        {secTxt}
                    </Button>
                </>
            }
        </ButtonGroup>
    );
};  

// export default class Switch extends Component {
//     static propTypes = {
        
//     };

//     componentDidUpdate(prevProps) {
//         const { meta } = this.props;

//         if(meta.tense !== prevProps.meta.tense) {
            
//         };
//     };

//     render() {
//         return null;
//     };
// };