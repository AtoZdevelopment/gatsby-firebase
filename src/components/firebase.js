import { navigate } from "gatsby"
import React, { Component } from "react"

import { getFirebase } from "../util/firebase"

const { Consumer, Provider } = React.createContext(`firebase`)

class Firebase extends Component {
  state = {}
  subscriber = undefined

  componentDidMount() {
    let firebase = getFirebase()
    this.subscriber = firebase.auth().onAuthStateChanged(this.setUser)

    this.setState({ firebase: firebase })
  }

  componentWillUnmount() {
    this.subscriber && this.subscriber()
  }

  setUser = user => {
    this.setState({ user: user })
  }

  register = (email, password) => {
    this.state.firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ user: user.user })
      })
      .catch(error => {
        //var errorCode = error.code
        //var errorMessage = error.message
        console.log(error)
        // ..
      })
  }

  login = (email, password) => {
    this.state.firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ user: user.user })
      })
      .catch(error => {
        //var errorCode = error.code
        //var errorMessage = error.message
        console.log(error)
        // ..
      })
  }

  logout = () => {
    this.state.firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/")
        console.log("logged out")
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          register: this.register,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

Firebase.Consumer = Consumer
Firebase.Provider = Firebase

export default Firebase
