import React from "react"
import { Link } from "gatsby"
import Firebase from "../components/firebase"
import Layout from "../components/layout"

const Home = () => {
  return (
    <Firebase.Consumer>
      {firebase => <HomePage {...firebase} />}
    </Firebase.Consumer>
  )
}

function HomePage({ user }) {
  return (
    <Layout>
      <h1>Page Not Found! Sorry {user ? user.displayname : "world"}!</h1>
      <p>
        {user ? (
          <>
            You are logged in, so check your{" "}
            <Link to="/app/profile">profile</Link>
          </>
        ) : (
          <>
            You should <Link to="/app/login">log in</Link> to see restricted
            content
          </>
        )}
      </p>
    </Layout>
  )
}

export default Home
