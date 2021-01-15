import React, { useState } from "react"
import { navigate } from "gatsby"
import Firebase from "./firebase"

const Register = () => {
  return (
    <Firebase.Consumer>
      {firebase => <RegisterForm {...firebase} />}
    </Firebase.Consumer>
  )
}

function RegisterForm({ register }) {
  const [email, setEmail] = useState(``)
  const [username, setUsername] = useState(``)
  const [password, setPassword] = useState(``)

  const handleSubmit = event => {
    event.preventDefault()
    register(email, password)
  }

  return (
    <>
      <h1>Register</h1>

      <form
        method="post"
        onSubmit={event => {
          handleSubmit(event)
          navigate(`/app/profile`)
        }}
      >
        <label>
          Email
          <input
            type="email"
            name="email"
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          Username
          <input
            type="text"
            name="username"
            onChange={e => setUsername(e.target.value)}
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
        <input type="submit" value="Register" />
      </form>
    </>
  )
}

export default Register
