import React from 'react'
import { uriBase, apiVer } from '../config'

const LoggedInContext = React.createContext()

const LoggedInProvider = (props) => {

    let [users, setUsers] = React.useState([])
    let [loggedIn, setLoggedIn] = React.useState(false)

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

    return (
        <LoggedInContext.Provider value={{ users, setUsers, loggedIn, checkUser}} >
            {props.children}
        </LoggedInContext.Provider>
    )

}

const LoggedInConsumer = LoggedInContext.Consumer
export { LoggedInContext, LoggedInProvider, LoggedInConsumer }