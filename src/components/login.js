import React, { useState } from "react"
import { navigate } from "gatsby"
import Firebase from "./firebase"

const Login = () => {
  return (
    <Firebase.Consumer>
      {firebase => <LoginForm {...firebase} />}
    </Firebase.Consumer>
  )
}

const LoginForm = ({ login, user }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  if (user) {
    navigate(`/app/profile`)
  }
  return (
    <>
      <h1>Log in</h1>
      <form
        method="post"
        onSubmit={event => {
          event.preventDefault()
          login(email, password)
          navigate(`/app/profile`)
        }}
      >
        <label>
          Email
          <input
            type="text"
            name="email"
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Log In" />
      </form>
    </>
  )
}

export default Login
