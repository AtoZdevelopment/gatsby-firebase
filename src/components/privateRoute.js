import React from "react"
import { navigate } from "gatsby"

import Firebase from "./firebase"

const PrivateRoute = props => {
  return (
    <Firebase.Consumer>
      {firebase => <Route {...props} {...firebase} />}
    </Firebase.Consumer>
  )
}

const Route = ({ component: Component, location, user, ...rest }) => {
  if (!user && location.pathname !== `/app/login`) {
    navigate("/app/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
