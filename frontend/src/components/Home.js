import React from 'react';
import { Link } from 'react-router-dom'
import {LoggedInConsumer, LoggedInContext} from "./LoggedInContext"

function Home(props) {

    let {users, setUsers, loggedIn} = React.useContext(LoggedInContext)

    const isLoggedIn = () => {

        if (loggedIn) {
            return (<h3>Logged In</h3>)
        } else {
            return (<h3>Not Logged In</h3>)
        }
    }

    const getUsers = () => {

        fetch("http://localhost:3000/api/v1/users",{
            method: "GET",
            "Content-Type": "application/json"
        })
        .then (apiResponse => apiResponse.json())
        .then (dbUsers => {
            console.log(dbUsers)
            setUsers(dbUsers)
        })
    }

    React.useEffect(getUsers,[])

    return (
        <div>
            {
                users.map(user => {
                    return <li key={user._id}>{user.userName}</li>
                })
            }
            <br></br>
            <Link to="signup">Sign Up</Link>
            <br></br>
            <Link to="login">Login</Link>
            <br></br>
            <Link to="forgotpass">Forgot Password</Link>
            <br></br>
            <Link to="admin">Edit Users</Link>
            {isLoggedIn()}

        </div>
    );
}

export default Home;