import React from 'react'
import { uriBase, apiVer } from '../config'

const LoggedInContext = React.createContext()

const LoggedInProvider = (props) => {

    let [users, setUsers] = React.useState([])
    let [loggedIn, setLoggedIn] = React.useState(false)

    // toDo
    // function to update password
    // if user exists then set new password
    const updatePass = (username, password) => {

        let rtnValue = false

        let foundUser = users.findIndex(user => user.username === username)

        if (foundUser !== -1) {
            // is found

            // copy array
            let tmpUsers = [...users]

            // update password
            tmpUsers[foundUser].password = password

            // set new state
            setUsers(tmpUsers)

            rtnValue = true
        }

        return rtnValue

    }

    // function to check user
    const checkUser = (username, password) => {

        let rtnValue = false
        // if username and password match return true

        fetch(`${uriBase}/${apiVer}/login`,
            {
                method: "POST",
                "Content-Type": "application/json",
                body: JSON.stringify({ username, password })
            })
            .then(httpResponse => {

                if (!httpResponse.ok) {
                    throw new Error("Login Error")
                }

                // convert json from endpoint into a js object
                return httpResponse.json()
            })
            .then(response => {

                if (response.hasOwnProperty('authenticated')) {

                    setLoggedIn(response.authenticated)
                    rtnValue = response.authenticated

                }
            })
            .catch(error => {
                console.log(error.message)
            })

        return rtnValue

    }


    // function to add a user
    const addUser = (username, password) => {

        let rtnValue = false

        // check to see if user exists
        if (users.findIndex(element => username === element.username) === -1) {

            // not found
            let tmpUsers = [...users]
            tmpUsers.push({ username, password })
            setUsers(tmpUsers)
            rtnValue = true
        } else {
            throw new Error("User Already Exists")
        }

        return rtnValue
    }

    return (
        <LoggedInContext.Provider value={{ users, setUsers, loggedIn, updatePass, checkUser, addUser }} >
            {props.children}
        </LoggedInContext.Provider>
    )

}

const LoggedInConsumer = LoggedInContext.Consumer
export { LoggedInContext, LoggedInProvider, LoggedInConsumer }