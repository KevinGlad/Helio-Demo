import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { updateOne } from '../crud'
import { uriBase, apiVer } from '../config'

const EditUserModal = (props) => {

    const [show, setShow] = useState(false);
    const [userName, setUserName] = useState(props.user.userName)
    const [password, setPassword] = useState(props.user.password)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userNameOnChangeHandler = (event) => {

        event.preventDefault()
        setUserName(event.target.value)
    }

    const passwordOnChangeHandler = (event) => {

        event.preventDefault()
        setPassword(event.target.value)
    }

    const saveOnClickHandler = (event) => {

        event.preventDefault()

        try {
            updateOne(`${uriBase}/${apiVer}/users/${props.user.userName}`, { userName, password })
            console.log("Updated")

        }
        catch (err) {
            console.log(err.message)
        }

        setShow(false)
        props.refresh()
    }

    return (
        <React.Fragment>

            <Button variant="primary" onClick={handleShow}>Edit</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Editing ${userName}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="editUserModalUserName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={userNameOnChangeHandler} value={userName} />
                        </Form.Group>

                        <Form.Group controlId="editUserModalPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={passwordOnChangeHandler} value={password} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={saveOnClickHandler}>
                        Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );

};

export default EditUserModal;