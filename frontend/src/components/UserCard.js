import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {deleteOne} from '../crud'
import {uriBase, apiVer} from '../config'

const UserCard = (props) => {

    const deleteOnClickHandler = (event) => {

        deleteOne(`${uriBase}/${apiVer}/users/${props.user.userName}`,props.user)
        .then(result => {
            props.refresh()
        })
        .catch(err => {
            console.log(err.message)
        })
        

    }


    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{props.user.userName}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Button variant="primary">Edit</Button>
                    <Button variant="primary" onClick={deleteOnClickHandler}>Delete</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default UserCard;