import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { LoggedInConsumer } from './LoggedInContext'

const ProtectedRoute = ({ component: Component, ...rest }) => {

    return (

        <LoggedInConsumer>
            {
                ({ loggedIn }) => (
                    <Route
                        render={props =>
                            loggedIn ? <Component {...props} /> : <Redirect to="/" />
                        }
                        {...rest}
                    />
                )
            }
        </LoggedInConsumer>
    )
}

export default ProtectedRoute