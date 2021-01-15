import React from "react"
import Firebase from "./firebase"

const Profile = () => {
  return (
    <Firebase.Consumer>
      {firebase => <ProfileInner {...firebase} />}
    </Firebase.Consumer>
  )
}

const ProfileInner = ({ user }) => (
  <>
    <h1>Your profile</h1>
    <ul>
      <p>username: {user.displayName}</p>
      <p>mail: {user.email}</p>
      <p>verified: {user.emailVerified ? "yes" : "no"}</p>
    </ul>
  </>
)
export default Profile
