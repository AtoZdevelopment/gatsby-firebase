import React, { useState } from "react"
import { navigate } from "gatsby"
import Firebase from "./firebase"

const Register = props => {
  return (
    <Firebase.Consumer>
      {firebase => <RegisterForm {...firebase} {...props} />}
    </Firebase.Consumer>
  )
}

const handleParams = (verifyEmail, params) => {
  let paramObj = new URLSearchParams(params.substring(1))
  let mode = paramObj.get("mode")
  let code = paramObj.get("oobCode")
  console.log("mode: ", mode)
  console.log("code: ", code)

  if (mode === "verifyEmail") {
    verifyEmail(code)
  }
}

function RegisterForm({ register, user, verifyEmail, params }) {
  const [email, setEmail] = useState(``)
  const [username, setUsername] = useState(``)
  const [password, setPassword] = useState(``)

  const handleSubmit = event => {
    event.preventDefault()
    register(email, password, username)
  }

  const verify = () => {
    handleParams(verifyEmail, params)
  }

  return (
    <>
      {!!params ? verify() : undefined}
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
