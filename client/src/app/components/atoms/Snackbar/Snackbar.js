import React, { useState } from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export default ({ header, body, footer }) => {
    const [isOpen, toggle] = useState(false);

    return (
        <Modal isOpen={isOpen} toggle={() => toggle(!isOpen)}>
            <ModalHeader toggle={() => toggle(!isOpen)}>{header}</ModalHeader>
            <ModalBody>
                {body}
            </ModalBody>
            <ModalFooter>
                <Button>{footer}</Button>
            </ModalFooter>
        </Modal>
    );
};