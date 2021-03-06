import React from "react"
import { Link, navigate } from "gatsby"
import Firebase from "./firebase"

const NavBar = () => {
  return (
    <Firebase.Consumer>
      {firebase => {
        const { user, logout } = firebase
        let greetingMessage = ""
        if (user) {
          greetingMessage = `Hello ${user.displayname ? user.displayname : ""}`
        } else {
          greetingMessage = "You are not logged in"
        }
        return (
          <div
            style={{
              display: "flex",
              flex: "1",
              justifyContent: "space-between",
              borderBottom: "1px solid #d1c1e0",
            }}
          >
            <span>{greetingMessage}</span>
            <nav>
              <Link to="/">Home</Link>
              {` `}
              <Link to="/app/profile">Profile</Link>
              {` `}
              {user ? (
                <a
                  href="/"
                  onClick={event => {
                    event.preventDefault()
                    logout(() => navigate(`/app/login`))
                  }}
                >
                  Logout
                </a>
              ) : null}
            </nav>
          </div>
        )
      }}
    </Firebase.Consumer>
  )
}

export default NavBar
