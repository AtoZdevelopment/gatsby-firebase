import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import Login from "../components/login"
import Register from "../components/register"

const App = ({ location }) => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile" component={Profile} />
      <Login path="/app/login" />
      <Register path="/app/register" params={location.search} />
    </Router>
  </Layout>
)

export default App
