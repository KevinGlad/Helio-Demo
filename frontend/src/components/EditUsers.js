import React, {useState, useEffect} from 'react'
import {getAll} from '../crud'
import {uriBase, apiVer} from '../config'
import UserCard from './UserCard'

const EditUsers = (props) => {

    const [users, setUsers] = useState([])

    const refresh = () => {

        getAll(`${uriBase}/${apiVer}/users`)
        .then(allUsers => {
            setUsers(allUsers)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect( () => {
        refresh()
    },[])

    return (
        <div>
            <h2>Users</h2>
            {
                users.map( user => {
                    return <UserCard key={user._id} user={user}></UserCard>
                })
            }
        </div>
    );
};

export default EditUsers