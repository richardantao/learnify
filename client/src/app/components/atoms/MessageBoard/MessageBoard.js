import React from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export default ({ isOpen, toggle, header, body, footer }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{header}</ModalHeader>
            <ModalBody>
                {body}
            </ModalBody>
            <ModalFooter>
                <Button>{footer}</Button>
            </ModalFooter>
        </Modal>
    );
};